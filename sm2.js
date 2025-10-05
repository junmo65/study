import { addDays, clamp, toISODate } from './util.js';

const BASE = {
  algo: 'SM2',
  ef: 2.5,
  interval: 0,
  reps: 0,
  lapses: 0,
  dueISO: null,
  lastGrade: null,
  history: []
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function applySm2(previous = {}, grade = 3, timestamp = new Date(), mode = 'review') {
  const state = { ...BASE, ...previous };
  const nowDate = new Date(timestamp);
  const nowISO = toISODate(nowDate);

  if (state.interval > 0 && state.dueISO) {
    const due = new Date(state.dueISO);
    const lateDays = (nowDate - due) / DAY_MS;
    if (lateDays > state.interval * 2) {
      // penalty as if graded 2 once
      state.reps = 0;
      state.interval = 1;
      state.lapses += 1;
      state.ef = nextEf(state.ef, 2);
      state.dueISO = toISODate(addDays(nowDate, 1));
      state.lastGrade = 2;
    }
  }

  if (grade < 3) {
    state.reps = 0;
    state.interval = 1;
    state.lapses += 1;
  } else {
    state.reps += 1;
    if (state.reps === 1) {
      state.interval = 1;
    } else if (state.reps === 2) {
      state.interval = 6;
    } else {
      state.interval = Math.round(state.interval * state.ef);
    }
  }

  state.ef = nextEf(state.ef, grade);
  if (grade === 5 && state.lastGrade === 5) {
    state.ef = Math.min(3, state.ef + 0.05);
  }

  state.dueISO = toISODate(addDays(nowDate, state.interval || 1));
  state.lastGrade = grade;
  const historyEntry = {
    tsISO: `${nowISO}T${nowDate.toTimeString().slice(0, 8)}`,
    grade,
    mode,
    interval: state.interval
  };
  state.history = [...state.history.slice(-30), historyEntry];
  return state;
}

function nextEf(current = 2.5, grade = 3) {
  const delta = 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02);
  const value = clamp((current || 2.5) + delta, 1.3, 3.5);
  return value;
}

export function initialSm2State(dueISO = null) {
  return { ...BASE, dueISO };
}
