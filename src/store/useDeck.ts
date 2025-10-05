import create from 'zustand';
import dayjs from 'dayjs';
import type { Card, ReviewRecord, SRSState, StudyMode } from '../types';
import {
  appendReview,
  exportBackup,
  fetchReviews,
  getStorageStatus,
  loadSnapshot,
  removeCardAndState,
  saveSrsState,
  upsertCards
} from './db';
import { buildQueue, getNext, pushSession, StudyQueue } from '../core/queue';
import { facetFromMode, pickMode, updateAfterGrade } from '../core/scheduler';
import { usePrefs } from './usePrefs';
import { newId } from '../utils/id';
import { compareInsensitive } from '../utils/str';

interface CurrentItem {
  card: Card;
  srs?: SRSState;
  mode: StudyMode;
  source: 'due' | 'fresh' | 'session';
}

interface DeckState {
  ready: boolean;
  loading: boolean;
  cards: Card[];
  srs: SRSState[];
  reviews: ReviewRecord[];
  queue: StudyQueue | null;
  current?: CurrentItem | null;
  todayNew: number;
  todayReview: number;
  todayCorrect: number;
  storageMode: 'indexeddb' | 'local';
  storageError?: string;
  init: () => Promise<void>;
  refreshQueue: () => void;
  nextCard: () => void;
  grade: (grade: 0 | 1 | 2 | 3 | 4 | 5) => Promise<void>;
  importCards: (cards: Card[]) => Promise<{ added: number; updated: number }>;
  updateCard: (card: Card) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  exportReviewsCsv: () => Promise<string>;
  exportProgressJson: () => Promise<string>;
  markWeak: () => Promise<void>;
}

function formatCsv(reviews: ReviewRecord[]): string {
  const header = 'cid,grade,mode,ts,interval';
  const rows = reviews
    .map((r) => `${r.cid},${r.grade},${r.mode},${r.ts},${r.interval}`)
    .join('\n');
  return `${header}\n${rows}`;
}

export const useDeck = create<DeckState>((set, get) => ({
  ready: false,
  loading: false,
  cards: [],
  srs: [],
  reviews: [],
  queue: null,
  current: null,
  todayNew: 0,
  todayReview: 0,
  todayCorrect: 0,
  storageMode: 'indexeddb',
  storageError: undefined,
  init: async () => {
    set({ loading: true });
    const snapshot = await loadSnapshot();
    usePrefs.getState().hydrate(snapshot.prefs);
    const queue = buildQueue(snapshot.cards, snapshot.srs, snapshot.prefs);
    set({
      cards: snapshot.cards,
      srs: snapshot.srs,
      reviews: snapshot.reviews,
      queue,
      loading: false,
      ready: true,
      todayNew: 0,
      todayReview: 0,
      todayCorrect: 0,
      storageMode: snapshot.mode,
      storageError: snapshot.error
    });
    get().nextCard();
  },
  refreshQueue: () => {
    const { cards, srs } = get();
    const prefs = usePrefs.getState().prefs;
    const queue = buildQueue(cards, srs, prefs);
    set({ queue });
  },
  nextCard: () => {
    const state = get();
    const queue = state.queue;
    if (!queue) return;
    const next = getNext(queue);
    if (!next) {
      set({ current: null });
      return;
    }
    const mode = pickMode(next.card, next.srs);
    set({
      current: { card: next.card, srs: next.srs, mode, source: next.source },
      queue: {
        due: [...queue.due],
        fresh: [...queue.fresh],
        session: [...queue.session]
      }
    });
  },
  grade: async (grade) => {
    const state = get();
    const current = state.current;
    if (!current) return;
    const prefs = usePrefs.getState().prefs;
    const today = dayjs();
    const { srs: updated, history, rescheduleMinutes } = updateAfterGrade(
      current.card,
      current.srs,
      prefs,
      grade,
      current.mode,
      today
    );
    await saveSrsState(updated);
    await appendReview({
      cid: updated.cid,
      grade,
      mode: current.mode,
      ts: history.ts,
      interval: history.interval
    });

    set((prev) => {
      const other = prev.srs.filter((s) => s.cid !== updated.cid);
      const reviews = [
        ...prev.reviews,
        { cid: updated.cid, grade, mode: current.mode, ts: history.ts, interval: history.interval }
      ];
      const todayReview = prev.todayReview + 1;
      const todayCorrect = prev.todayCorrect + (grade >= 3 ? 1 : 0);
      const wasNew = !current.srs;
      const todayNew = prev.todayNew + (wasNew ? 1 : 0);
      const queue = prev.queue
        ? {
            due: [...prev.queue.due],
            fresh: [...prev.queue.fresh],
            session: [...prev.queue.session]
          }
        : { due: [], fresh: [], session: [] };
      if (grade < 3) {
        pushSession(queue, current.card, updated, rescheduleMinutes ?? 10);
      }
      const status = getStorageStatus();
      return {
        srs: [...other, updated],
        reviews,
        todayReview,
        todayCorrect,
        todayNew,
        queue,
        current: null,
        storageMode: status.mode,
        storageError: status.error
      };
    });

    get().nextCard();
  },
  importCards: async (incoming) => {
    if (!incoming.length) return { added: 0, updated: 0 };
    const existingCards = get().cards;
    const key = (card: Card) => `${card.word.toLowerCase()}|${card.pos.toLowerCase()}`;
    const cardIndex = new Map(existingCards.map((card) => [key(card), card]));
    let added = 0;
    let updatedCount = 0;
    const toPersist: Card[] = [];
    for (const card of incoming) {
      const existing = cardIndex.get(key(card));
      if (existing) {
        const updatedCard: Card = { ...card, id: existing.id };
        cardIndex.set(key(updatedCard), updatedCard);
        toPersist.push(updatedCard);
        updatedCount += 1;
      } else {
        const newCard: Card = { ...card, id: card.id || newId() };
        cardIndex.set(key(newCard), newCard);
        toPersist.push(newCard);
        added += 1;
      }
    }

    await upsertCards(toPersist);

    const cards = Array.from(cardIndex.values());
    const status = getStorageStatus();
    set({ cards, storageMode: status.mode, storageError: status.error });
    get().refreshQueue();
    return { added, updated: updatedCount };
  },
  updateCard: async (card: Card) => {
    await upsertCards([card]);
    const status = getStorageStatus();
    set((prev) => ({
      cards: prev.cards.map((existing) => (existing.id === card.id ? card : existing)),
      storageMode: status.mode,
      storageError: status.error
    }));
  },
  deleteCard: async (id: string) => {
    await removeCardAndState(id);
    const status = getStorageStatus();
    const cards = get().cards.filter((card) => card.id !== id);
    const srs = get().srs.filter((state) => state.cid !== id);
    set({ cards, srs, storageMode: status.mode, storageError: status.error });
    get().refreshQueue();
  },
  exportReviewsCsv: async () => {
    const reviews = await fetchReviews();
    const status = getStorageStatus();
    set((prev) => ({
      ...prev,
      storageMode: status.mode,
      storageError: status.error
    }));
    return formatCsv(reviews);
  },
  exportProgressJson: async () => {
    const payload = await exportBackup();
    const status = getStorageStatus();
    set((prev) => ({
      ...prev,
      storageMode: status.mode,
      storageError: status.error
    }));
    return JSON.stringify(payload, null, 2);
  },
  markWeak: async () => {
    const { current } = get();
    if (!current?.srs) return;
    const facet = facetFromMode(current.mode);
    const updated = { ...current.srs, weakFacet: facet };
    await saveSrsState(updated);
    const status = getStorageStatus();
    set((prev) => ({
      srs: prev.srs.map((state) => (state.cid === updated.cid ? updated : state)),
      current: current ? { ...current, srs: updated } : current,
      storageMode: status.mode,
      storageError: status.error
    }));
  }
}));

export function getCardById(id: string) {
  const { cards } = useDeck.getState();
  return cards.find((card) => card.id === id);
}

export function getCardsByTag(tag: string) {
  const { cards } = useDeck.getState();
  return cards.filter((card) => card.tags.some((t) => compareInsensitive(t, tag) === 0));
}
