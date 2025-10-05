import dayjs from 'dayjs';
import { defaultLeitnerState, updateLeitner } from '../algos/leitner';
import { defaultSM2State, updateSM2 } from '../algos/sm2';
import { Card, Prefs, SRSState, db } from '../store/db';
import { scheduleRequeue, SessionItem, StudyMode } from './queue';

const MODE_WEIGHTS: Record<StudyMode, number> = {
  recall: 0.4,
  collocation: 0.3,
  cloze: 0.2,
  recognition: 0.1
};

const modes: StudyMode[] = ['recall', 'collocation', 'cloze', 'recognition'];

export const chooseMode = (weakFacet?: string): StudyMode => {
  if (weakFacet && modes.includes(weakFacet as StudyMode)) {
    return weakFacet as StudyMode;
  }
  const rand = Math.random();
  let sum = 0;
  for (const mode of modes) {
    sum += MODE_WEIGHTS[mode];
    if (rand <= sum) {
      return mode;
    }
  }
  return 'recall';
};

export interface GradePayload {
  card: Card;
  srs: SRSState;
  prefs: Prefs;
  sessionItem: SessionItem;
  grade: number;
}

export interface GradeResult {
  updated: SRSState;
  log: { ts: string; grade: number; mode: string; interval: number };
  requeue?: SessionItem;
}

export const applyGrade = async ({ card, srs, prefs, sessionItem, grade }: GradePayload): Promise<GradeResult> => {
  const now = dayjs();
  let updated: SRSState = srs;

  if (srs.algo === 'SM2') {
    const overdueDays = dayjs().diff(dayjs(srs.due), 'day');
    const sm2 = updateSM2(
      {
        ...defaultSM2State(card.id),
        ...srs,
        history: srs.history ?? [],
        weakFacet: srs.weakFacet
      },
      {
        grade,
        now,
        overdueDays
      }
    );
    updated = sm2;
  } else {
    const leitner = updateLeitner(
      {
        ...defaultLeitnerState(card.id),
        ...srs,
        history: srs.history ?? [],
        weakFacet: srs.weakFacet
      },
      grade,
      now
    );
    updated = leitner;
  }

  if (grade < 3) {
    updated = { ...updated, weakFacet: sessionItem.mode };
  } else if (updated.weakFacet === sessionItem.mode) {
    updated = { ...updated, weakFacet: undefined };
  }

  const log = {
    ts: now.toISOString(),
    grade,
    mode: sessionItem.mode,
    interval: updated.interval ?? 0
  };

  await db.srs.put(updated);
  await db.reviews.add({ cid: card.id, ...log });

  let requeue: SessionItem | undefined;
  if (grade < 3) {
    const minutes = 10 + Math.floor(Math.random() * 10);
    requeue = scheduleRequeue({ ...sessionItem, isReview: true }, minutes);
  }

  return { updated, log, requeue };
};

export const ensureSrs = async (card: Card, prefs: Prefs, srs?: SRSState): Promise<SRSState> => {
  if (srs) return srs;
  const base = prefs.algo === 'SM2' ? defaultSM2State(card.id) : defaultLeitnerState(card.id);
  const enriched: SRSState = { ...base };
  await db.srs.put(enriched);
  return enriched;
};
