import dayjs from 'dayjs';

const BOX_INTERVALS = [0, 1, 2, 4, 7, 15, 30];

export interface LeitnerState {
  leibox?: number;
  lapses: number;
}

export function leitnerUpdate(
  state: LeitnerState,
  grade: 0 | 1 | 2 | 3 | 4 | 5,
  today = dayjs()
) {
  let box = state.leibox ?? 1;
  let lapses = state.lapses ?? 0;
  const correct = grade >= 3;
  if (correct) {
    box = Math.min(7, box + 1);
  } else {
    box = Math.max(1, box - 1);
    lapses += 1;
  }
  const interval = BOX_INTERVALS[box - 1] ?? 1;
  const due = today.add(interval, 'day').toISOString();

  return {
    leibox: box,
    lapses,
    interval,
    due,
    lastGrade: grade as const
  };
}

export function boxIntervals() {
  return BOX_INTERVALS.slice();
}
