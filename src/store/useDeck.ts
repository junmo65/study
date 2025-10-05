import create from 'zustand';
import dayjs from 'dayjs';
import { buildDailyQueue, QueueResult, SessionItem, StudyMode, selectNext } from '../core/queue';
import { applyGrade, ensureSrs } from '../core/scheduler';
import { ParsedCardRow } from '../utils/csv';
import { normalizeWord } from '../utils/str';
import { Card, Prefs, SRSState, db } from './db';
import { createId } from '../utils/id';

interface SessionStats {
  correct: number;
  total: number;
  history: { cid: string; grade: number; mode: StudyMode; ts: string }[];
}

interface DeckState {
  loading: boolean;
  cards: Card[];
  srsMap: Record<string, SRSState>;
  queue: SessionItem[];
  current?: SessionItem;
  currentCard?: Card;
  currentSrs?: SRSState;
  sessionStats: SessionStats;
  queueMeta?: QueueResult;
  load: (prefs: Prefs) => Promise<void>;
  importRows: (rows: ParsedCardRow[], prefs: Prefs) => Promise<{ added: number; updated: number; warnings: string[] }>;
  startSession: (prefs: Prefs) => Promise<void>;
  submitGrade: (grade: number, prefs: Prefs) => Promise<void>;
  switchMode: (mode: StudyMode) => void;
  markWeak: (mode?: StudyMode) => Promise<void>;
  refresh: (prefs: Prefs) => Promise<void>;
}

const initialStats: SessionStats = { correct: 0, total: 0, history: [] };

export const useDeck = create<DeckState>((set, get) => ({
  loading: true,
  cards: [],
  srsMap: {},
  queue: [],
  sessionStats: initialStats,
  queueMeta: undefined,
  load: async (prefs) => {
    const [cards, srsItems] = await Promise.all([db.cards.toArray(), db.srs.toArray()]);
    const srsMap: Record<string, SRSState> = {};
    srsItems.forEach((item) => {
      srsMap[item.cid] = item;
    });
    set({ cards, srsMap, loading: false });
    await get().startSession(prefs);
  },
  refresh: async (prefs) => {
    set({ loading: true });
    await get().load(prefs);
    set({ loading: false });
  },
  importRows: async (rows, prefs) => {
    const warnings: string[] = [];
    const state = get();
    const lowerIndex = new Map<string, Card>();
    state.cards.forEach((card) => {
      lowerIndex.set(`${normalizeWord(card.word)}|${normalizeWord(card.pos)}`, card);
    });

    let added = 0;
    let updated = 0;

    for (const row of rows) {
      if (row.missing.length) {
        warnings.push(`${row.word || 'Untitled'} missing: ${row.missing.join(', ')}`);
      }
      if (!row.word || !row.pos) {
        continue;
      }
      const key = `${normalizeWord(row.word)}|${normalizeWord(row.pos)}`;
      const existing = lowerIndex.get(key);
      if (existing) {
        const next: Card = {
          ...existing,
          word: row.word || existing.word,
          pos: row.pos || existing.pos,
          def_en: row.def_en || existing.def_en,
          def_zh: row.def_zh || existing.def_zh,
          coll_en: row.coll_en.length ? row.coll_en : existing.coll_en,
          coll_zh: row.coll_zh.length ? row.coll_zh : existing.coll_zh,
          usage_notes: row.usage_notes || existing.usage_notes,
          mnemonic: row.mnemonic || existing.mnemonic,
          ex_en: row.ex_en || existing.ex_en,
          ex_zh: row.ex_zh || existing.ex_zh,
          tags: row.tags.length ? row.tags : existing.tags
        };
        await db.cards.put(next);
        lowerIndex.set(key, next);
        updated += 1;
      } else {
        const id = createId();
        const card: Card = {
          id,
          word: row.word,
          pos: row.pos,
          def_en: row.def_en,
          def_zh: row.def_zh,
          coll_en: row.coll_en,
          coll_zh: row.coll_zh,
          usage_notes: row.usage_notes,
          mnemonic: row.mnemonic,
          ex_en: row.ex_en,
          ex_zh: row.ex_zh,
          tags: row.tags
        };
        await db.cards.put(card);
        lowerIndex.set(key, card);
        added += 1;
        await ensureSrs(card, prefs);
      }
    }

    await get().refresh(prefs);

    return { added, updated, warnings };
  },
  startSession: async (prefs) => {
    const state = get();
    const queueMeta = buildDailyQueue({
      cards: state.cards,
      srsMap: state.srsMap,
      prefs,
      today: dayjs()
    });
    const [current, rest] = selectNext(queueMeta.queue);
    let currentCard: Card | undefined;
    let currentSrs: SRSState | undefined;
    if (current) {
      currentCard = state.cards.find((card) => card.id === current.cid);
      if (currentCard) {
        currentSrs = state.srsMap[current.cid];
        if (!currentSrs) {
          currentSrs = await ensureSrs(currentCard, prefs);
        }
      }
    }
    set({ queue: rest, current, currentCard, currentSrs, queueMeta, sessionStats: initialStats });
  },
  submitGrade: async (grade, prefs) => {
    const state = get();
    if (!state.current || !state.currentCard || !state.currentSrs) return;

    const ensured = await ensureSrs(state.currentCard, prefs, state.currentSrs);
    const { updated, requeue } = await applyGrade({
      card: state.currentCard,
      srs: ensured,
      prefs,
      sessionItem: state.current,
      grade
    });

    const nextQueue = [...state.queue];
    if (requeue) {
      nextQueue.push(requeue);
    }

    const newStats: SessionStats = {
      correct: state.sessionStats.correct + (grade >= 3 ? 1 : 0),
      total: state.sessionStats.total + 1,
      history: [
        ...state.sessionStats.history,
        { cid: state.current.cid, grade, mode: state.current.mode, ts: dayjs().toISOString() }
      ]
    };

    const nextSrsMap = { ...state.srsMap, [updated.cid]: updated };

    const [nextItem, rest] = selectNext(nextQueue);
    let nextCard: Card | undefined;
    let nextSrs: SRSState | undefined;
    if (nextItem) {
      nextCard = state.cards.find((card) => card.id === nextItem.cid);
      if (nextCard) {
        nextSrs = nextSrsMap[nextItem.cid];
        if (!nextSrs) {
          nextSrs = await ensureSrs(nextCard, prefs);
        }
      }
    }

    set({
      srsMap: nextSrsMap,
      queue: rest,
      current: nextItem,
      currentCard: nextCard,
      currentSrs: nextSrs,
      sessionStats: newStats
    });
  },
  switchMode: (mode) => {
    const state = get();
    if (!state.current) return;
    set({ current: { ...state.current, mode } });
  },
  markWeak: async (mode) => {
    const state = get();
    if (!state.currentSrs || !state.currentCard) return;
    const updated: SRSState = { ...state.currentSrs, weakFacet: mode };
    await db.srs.put(updated);
    set({
      currentSrs: updated,
      srsMap: { ...state.srsMap, [updated.cid]: updated }
    });
  }
}));
