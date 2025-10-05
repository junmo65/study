import dayjs from 'dayjs';
import { toISODate } from '../utils/date';

const INTERVALS = [0, 1, 2, 4, 7, 15, 30];

export interface LeitnerState {
  cid: string;
  algo: 'LEITNER';
  box: number;
  due: string;
  lapses: number;
  weakFacet?: string;
  history: { ts: string; grade: number; mode: string; interval: number }[];
}

export const defaultLeitnerState = (cid: string): LeitnerState => ({
  cid,
  algo: 'LEITNER',
  box: 1,
  due: toISODate(dayjs()),
  lapses: 0,
  history: []
});

export const updateLeitner = (
  prev: LeitnerState,
  grade: number,
  now: dayjs.Dayjs = dayjs()
): LeitnerState => {
  let box = prev.box;
  let lapses = prev.lapses;
  if (grade >= 3) {
    box = Math.min(7, box + 1);
  } else {
    box = Math.max(1, box - 1);
    lapses += 1;
  }
  const interval = INTERVALS[box - 1] ?? 1;
  const due = now.add(interval, 'day');
  return {
    ...prev,
    box,
    lapses,
    interval,
    due: toISODate(due),
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

export const getIntervalForBox = (box: number) => INTERVALS[box - 1] ?? 1;
