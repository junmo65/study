import { addDays, toISODate } from './util.js';

const BOX_INTERVALS = [0, 1, 2, 4, 7, 15, 30];

const BASE = {
  algo: 'LEITNER',
  leibox: 1,
  lapses: 0,
  dueISO: null,
  history: [],
  lastGrade: null
};

export function applyLeitner(previous = {}, grade = 3, timestamp = new Date(), mode = 'review') {
  const state = { ...BASE, ...previous };
  const correct = grade >= 3;
  if (correct) {
    state.leibox = Math.min(7, (state.leibox || 1) + 1);
  } else {
    state.leibox = Math.max(1, (state.leibox || 1) - 1);
    state.lapses += 1;
  }
  state.lastGrade = grade;
  const interval = BOX_INTERVALS[state.leibox - 1] ?? 1;
  state.interval = interval;
  const due = addDays(timestamp, interval);
  state.dueISO = toISODate(due);
  state.history = [...state.history.slice(-30), {
    tsISO: `${toISODate(new Date(timestamp))}T${new Date(timestamp).toTimeString().slice(0, 8)}`,
    grade,
    mode,
    interval
  }];
  return state;
}

export function initialLeitnerState() {
  return { ...BASE };
}
