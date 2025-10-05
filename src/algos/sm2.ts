import dayjs from 'dayjs';
import { toISODate } from '../utils/date';

export interface SM2State {
  cid: string;
  algo: 'SM2';
  ef: number;
  interval: number;
  reps: number;
  due: string;
  lapses: number;
  lastGrade?: number;
  weakFacet?: string;
  history: { ts: string; grade: number; mode: string; interval: number }[];
}

export const defaultSM2State = (cid: string): SM2State => ({
  cid,
  algo: 'SM2',
  ef: 2.5,
  interval: 0,
  reps: 0,
  due: toISODate(dayjs()),
  lapses: 0,
  history: []
});

export interface SM2UpdateOptions {
  grade: number;
  now?: dayjs.Dayjs;
  lastReview?: string;
  streak5?: boolean;
  overdueDays?: number;
}

export const updateSM2 = (
  prev: SM2State,
  { grade, now = dayjs(), overdueDays = 0 }: SM2UpdateOptions
): SM2State => {
  let ef = prev.ef;
  let reps = prev.reps;
  let interval = prev.interval;
  let lapses = prev.lapses;

  let effectiveGrade = grade;
  if (overdueDays > prev.interval * 2 && prev.interval > 0) {
    effectiveGrade = Math.min(effectiveGrade, 2);
  }

  if (effectiveGrade < 3) {
    reps = 0;
    interval = 1;
    lapses += 1;
  } else {
    reps += 1;
    if (reps === 1) {
      interval = 1;
    } else if (reps === 2) {
      interval = 6;
    } else {
      interval = Math.round(prev.interval * ef) || 1;
    }
    ef = ef + (0.1 - (5 - effectiveGrade) * (0.08 + (5 - effectiveGrade) * 0.02));
    if (ef < 1.3) ef = 1.3;
    if (effectiveGrade === 5 && prev.lastGrade === 5) {
      ef = Math.min(3.0, ef + 0.05);
    }
  }

  const due = now.add(interval, 'day');

  return {
    ...prev,
    reps,
    interval,
    ef,
    due: toISODate(due),
    lapses,
    lastGrade: grade,
    history: [
      ...prev.history,
      {
        ts: toISODate(now),
        grade,
        mode: prev.weakFacet ?? 'mixed',
        interval
      }
    ]
  };
};
