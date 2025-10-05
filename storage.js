const KEYS = {
  cards: 'ovc_cards',
  srs: 'ovc_srs',
  prefs: 'ovc_prefs',
  reviews: 'ovc_reviews'
};

export const defaultPrefs = {
  dailyNew: 20,
  dailyReviewCap: 120,
  algo: 'SM2',
  typingStrict: false,
  clozeDensity: 'mid'
};

let state = {
  cards: [],
  srs: {},
  prefs: { ...defaultPrefs },
  reviews: []
};

function safeParse(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (err) {
    console.warn('Failed to parse localStorage payload', err);
    return fallback;
  }
}

export function loadAll() {
  state.cards = safeParse(localStorage.getItem(KEYS.cards), []);
  state.srs = safeParse(localStorage.getItem(KEYS.srs), {});
  state.prefs = { ...defaultPrefs, ...safeParse(localStorage.getItem(KEYS.prefs), {}) };
  state.reviews = safeParse(localStorage.getItem(KEYS.reviews), []);
  if (!Array.isArray(state.cards)) state.cards = [];
  if (typeof state.srs !== 'object' || !state.srs) state.srs = {};
  if (!Array.isArray(state.reviews)) state.reviews = [];
  return state;
}

export function saveAll() {
  localStorage.setItem(KEYS.cards, JSON.stringify(state.cards));
  localStorage.setItem(KEYS.srs, JSON.stringify(state.srs));
  localStorage.setItem(KEYS.prefs, JSON.stringify(state.prefs));
  localStorage.setItem(KEYS.reviews, JSON.stringify(state.reviews));
}

export function getState() {
  return state;
}

export function setState(partial) {
  state = { ...state, ...partial };
  saveAll();
  return state;
}

export function getCards() {
  return state.cards;
}

export function getCardById(id) {
  return state.cards.find((card) => card.id === id);
}

export function upsertCards(cards) {
  const map = new Map(state.cards.map((card) => [`${card.word}@@${card.pos}`, card]));
  cards.forEach((incoming) => {
    const key = `${incoming.word}@@${incoming.pos}`;
    if (map.has(key)) {
      const existing = map.get(key);
      Object.assign(existing, { ...incoming, id: existing.id });
    } else {
      const newCard = { ...incoming, id: incoming.id || uniqueId() };
      state.cards.push(newCard);
      map.set(key, newCard);
    }
  });
  saveAll();
  return state.cards;
}

export function replaceCards(cards) {
  state.cards = cards;
  saveAll();
}

export function getSrs() {
  return state.srs;
}

export function upsertSrs(entries) {
  state.srs = { ...state.srs, ...entries };
  saveAll();
  return state.srs;
}

export function setSrsForCard(cardId, payload) {
  state.srs[cardId] = { ...(state.srs[cardId] || {}), ...payload };
  saveAll();
}

export function getPrefs() {
  return state.prefs;
}

export function setPrefs(prefs) {
  state.prefs = { ...state.prefs, ...prefs };
  saveAll();
  return state.prefs;
}

export function logReview(entry) {
  state.reviews.push(entry);
  if (state.reviews.length > 5000) {
    state.reviews = state.reviews.slice(-5000);
  }
  saveAll();
}

export function getReviews() {
  return state.reviews;
}

export function exportJSON() {
  return JSON.stringify({ ...state }, null, 2);
}

export function importJSON(jsonText, mode = 'merge') {
  try {
    const payload = typeof jsonText === 'string' ? JSON.parse(jsonText) : jsonText;
    if (!payload) return false;
    if (mode === 'replace') {
      state.cards = payload.cards || [];
      state.srs = payload.srs || {};
      state.prefs = { ...defaultPrefs, ...(payload.prefs || {}) };
      state.reviews = payload.reviews || [];
    } else {
      if (Array.isArray(payload.cards)) {
        upsertCards(payload.cards);
      }
      if (payload.srs && typeof payload.srs === 'object') {
        upsertSrs(payload.srs);
      }
      if (payload.prefs) {
        setPrefs(payload.prefs);
      }
      if (Array.isArray(payload.reviews)) {
        state.reviews = [...state.reviews, ...payload.reviews];
      }
    }
    saveAll();
    return true;
  } catch (err) {
    console.error('Failed to import JSON', err);
    return false;
  }
}

loadAll();

function uniqueId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `card-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}
