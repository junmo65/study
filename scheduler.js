import { getCards, getPrefs, getSrs, logReview, setSrsForCard } from './storage.js';
import { applySm2, initialSm2State } from './sm2.js';
import { applyLeitner, initialLeitnerState } from './leitner.js';
import { todayISO, weightedRandom } from './util.js';

const MODE_WEIGHTS = {
  recognition: 0.1,
  recall: 0.4,
  collocation: 0.3,
  cloze: 0.2
};

const MIN_COOLDOWN_MIN = 10;
const MAX_COOLDOWN_MIN = 20;

const session = {
  today: todayISO(),
  reviewQueue: [],
  newQueue: [],
  cooldowns: [],
  counts: { reviewTotal: 0, newTotal: 0, completed: 0, correct: 0 },
  last: null
};

export function rebuildSession() {
  const cards = getCards();
  const srs = getSrs();
  const prefs = getPrefs();
  session.today = todayISO();
  const reviewQueue = [];
  const newQueue = [];
  const today = session.today;
  cards.forEach((card) => {
    const entry = srs[card.id];
    if (entry && entry.dueISO && entry.dueISO > today) {
      return;
    }
    if (entry) {
      reviewQueue.push(card.id);
    } else {
      newQueue.push(card.id);
    }
  });
  reviewQueue.sort((a, b) => {
    const dueA = srs[a]?.dueISO || '1970-01-01';
    const dueB = srs[b]?.dueISO || '1970-01-01';
    return dueA.localeCompare(dueB);
  });
  session.reviewQueue = reviewQueue.slice(0, prefs.dailyReviewCap || reviewQueue.length);
  session.newQueue = newQueue.slice(0, prefs.dailyNew || newQueue.length);
  session.cooldowns = [];
  session.counts = {
    reviewTotal: session.reviewQueue.length,
    newTotal: session.newQueue.length,
    completed: 0,
    correct: 0
  };
  session.last = null;
  return getNext();
}

export function getSession() {
  return session;
}

function flushCooldowns() {
  const now = Date.now();
  const ready = session.cooldowns.filter((item) => item.availableAt <= now);
  session.cooldowns = session.cooldowns.filter((item) => item.availableAt > now);
  ready.forEach((item) => {
    if (!session.reviewQueue.includes(item.cid) && !session.newQueue.includes(item.cid)) {
      session.reviewQueue.unshift(item.cid);
    }
  });
}

function chooseMode(card, srsState) {
  const available = [];
  const fallback = 'recognition';
  Object.entries(MODE_WEIGHTS).forEach(([mode, weight]) => {
    if (mode === 'recognition') {
      available.push({ value: mode, weight });
    } else if (mode === 'recall' && (card.def_zh || card.def_en)) {
      available.push({ value: mode, weight });
    } else if (mode === 'collocation' && (card.coll_en?.length || card.coll_zh?.length)) {
      available.push({ value: mode, weight });
    } else if (mode === 'cloze' && card.ex_en) {
      available.push({ value: mode, weight });
    }
  });
  if (srsState?.weakFacet) {
    const target = available.find((entry) => entry.value === srsState.weakFacet);
    if (target) return target.value;
  }
  if (!available.length) return fallback;
  return weightedRandom(available) || fallback;
}

export function getNext() {
  flushCooldowns();
  if (!session.reviewQueue.length && !session.newQueue.length) {
    return null;
  }
  const cards = getCards();
  const srs = getSrs();
  const nextId = session.reviewQueue.length ? session.reviewQueue.shift() : session.newQueue.shift();
  const card = cards.find((c) => c.id === nextId);
  if (!card) return getNext();
  const srsState = srs[nextId];
  const mode = chooseMode(card, srsState);
  const kind = srsState ? 'review' : 'new';
  session.last = { card, srs: srsState, mode, kind };
  return session.last;
}

function nextCooldownTime() {
  const minutes = MIN_COOLDOWN_MIN + Math.random() * (MAX_COOLDOWN_MIN - MIN_COOLDOWN_MIN);
  return Date.now() + minutes * 60 * 1000;
}

export function gradeCurrent(grade, modeOverride) {
  if (!session.last) return null;
  const { card, srs: previousState, kind } = session.last;
  const prefs = getPrefs();
  const mode = modeOverride || session.last.mode;
  const now = new Date();
  const apply = (prefs.algo === 'LEITNER' || previousState?.algo === 'LEITNER') ? applyLeitner : applySm2;
  const initial = prefs.algo === 'LEITNER' ? initialLeitnerState() : initialSm2State();
  const baseState = previousState || initial;
  const updated = apply(baseState, grade, now, mode);
  updated.algo = apply === applyLeitner ? 'LEITNER' : 'SM2';
  updated.weakFacet = grade < 3 ? mode : null;
  setSrsForCard(card.id, updated);
  logReview({
    cid: card.id,
    tsISO: now.toISOString(),
    grade,
    mode,
    algo: updated.algo,
    interval: updated.interval,
    dueISO: updated.dueISO
  });
  session.counts.completed += 1;
  if (grade >= 3) session.counts.correct += 1;
  if (grade < 3) {
    session.cooldowns.push({ cid: card.id, availableAt: nextCooldownTime() });
  }
  session.last = null;
  return getNext();
}

export function peekCounts() {
  return session.counts;
}
