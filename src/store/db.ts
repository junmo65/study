import Dexie, { Table } from 'dexie';
import type { Card, Prefs, ReviewRecord, SRSState } from '../types';

export type StorageMode = 'indexeddb' | 'local';

export class OrpeaDB extends Dexie {
  cards!: Table<Card, string>;
  srs!: Table<SRSState, string>;
  prefs!: Table<Prefs, string>;
  reviews!: Table<ReviewRecord, number>;

  constructor() {
    super('orpea_vocab');
    this.version(1).stores({
      cards: 'id, word, pos, *tags',
      srs: 'cid, algo, due, weakFacet',
      prefs: '++id',
      reviews: '++id, cid, ts'
    });
  }
}

export const DEFAULT_PREFS: Prefs = {
  dailyNew: 20,
  dailyReviewCap: 120,
  algo: 'SM2',
  typingStrict: false,
  clozeDensity: 'mid'
};

type LocalSnapshot = {
  cards: Card[];
  srs: SRSState[];
  prefs: Prefs;
  reviews: ReviewRecord[];
};

type StorageSnapshot = LocalSnapshot & {
  mode: StorageMode;
  error?: string;
};

const localKey = 'orpea_vocab_snapshot';
const dexie = new OrpeaDB();
let mode: StorageMode = 'indexeddb';
let lastError: string | undefined;
let memorySnapshot: LocalSnapshot | null = null;
let triedOpen = false;

function setLocalMode(err: unknown) {
  mode = 'local';
  lastError = err instanceof Error ? err.message : String(err);
}

function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function baseSnapshot(): LocalSnapshot {
  return {
    cards: [],
    srs: [],
    prefs: { ...DEFAULT_PREFS },
    reviews: []
  };
}

function readLocal(): LocalSnapshot {
  const storage = getLocalStorage();
  if (!storage) {
    if (!memorySnapshot) memorySnapshot = baseSnapshot();
    return deepCopy(memorySnapshot);
  }
  const raw = storage.getItem(localKey);
  if (!raw) {
    return baseSnapshot();
  }
  try {
    const parsed = JSON.parse(raw) as Partial<LocalSnapshot>;
    return {
      cards: Array.isArray(parsed.cards) ? parsed.cards : [],
      srs: Array.isArray(parsed.srs) ? parsed.srs : [],
      prefs: { ...DEFAULT_PREFS, ...(parsed.prefs ?? {}) },
      reviews: Array.isArray(parsed.reviews) ? parsed.reviews : []
    };
  } catch {
    return baseSnapshot();
  }
}

function writeLocal(next: LocalSnapshot) {
  const copy = deepCopy(next);
  const storage = getLocalStorage();
  if (storage) {
    storage.setItem(localKey, JSON.stringify(copy));
  }
  memorySnapshot = copy;
}

function updateLocal(mutator: (snapshot: LocalSnapshot) => void) {
  const snapshot = readLocal();
  mutator(snapshot);
  writeLocal(snapshot);
}

async function ensureDexieOpen() {
  if (mode === 'local') return;
  if (dexie.isOpen()) return;
  if (triedOpen) return;
  triedOpen = true;
  try {
    await dexie.open();
  } catch (err) {
    setLocalMode(err);
  }
}

async function withDexie<T>(task: (db: OrpeaDB) => Promise<T>): Promise<T | undefined> {
  if (mode === 'local') return undefined;
  await ensureDexieOpen();
  if (mode === 'local') return undefined;
  try {
    const result = await task(dexie);
    lastError = undefined;
    return result;
  } catch (err) {
    setLocalMode(err);
    return undefined;
  }
}

export function getStorageStatus(): { mode: StorageMode; error?: string } {
  return { mode, error: lastError };
}

function normaliseSnapshot(snapshot: LocalSnapshot): LocalSnapshot {
  return {
    cards: snapshot.cards ?? [],
    srs: snapshot.srs ?? [],
    prefs: { ...DEFAULT_PREFS, ...(snapshot.prefs ?? DEFAULT_PREFS) },
    reviews: snapshot.reviews ?? []
  };
}

export async function loadSnapshot(): Promise<StorageSnapshot> {
  const dexieSnapshot = await withDexie(async (db) => {
    const [cards, srs, prefsList, reviews] = await Promise.all([
      db.cards.toArray(),
      db.srs.toArray(),
      db.prefs.toArray(),
      db.reviews.toArray()
    ]);
    const prefs = prefsList[0] ?? { ...DEFAULT_PREFS };
    const snapshot: LocalSnapshot = normaliseSnapshot({ cards, srs, prefs, reviews });
    writeLocal(snapshot);
    return snapshot;
  });

  if (dexieSnapshot) {
    return { ...dexieSnapshot, mode: 'indexeddb' };
  }

  const local = normaliseSnapshot(readLocal());
  return { ...local, mode, error: lastError };
}

export async function savePrefs(prefs: Prefs) {
  const merged = { ...DEFAULT_PREFS, ...prefs };
  updateLocal((snapshot) => {
    snapshot.prefs = merged;
  });
  await withDexie(async (db) => {
    await db.prefs.clear();
    await db.prefs.add(merged);
  });
}

export async function upsertCards(cards: Card[]) {
  if (!cards.length) return;
  updateLocal((snapshot) => {
    const map = new Map(snapshot.cards.map((card) => [card.id, card]));
    for (const card of cards) {
      map.set(card.id, card);
    }
    snapshot.cards = Array.from(map.values());
  });
  await withDexie(async (db) => {
    await db.cards.bulkPut(cards);
  });
}

export async function removeCardAndState(id: string) {
  updateLocal((snapshot) => {
    snapshot.cards = snapshot.cards.filter((card) => card.id !== id);
    snapshot.srs = snapshot.srs.filter((state) => state.cid !== id);
  });
  await withDexie(async (db) => {
    await db.transaction('rw', db.cards, db.srs, async () => {
      await db.cards.delete(id);
      await db.srs.delete(id);
    });
  });
}

export async function saveSrsState(state: SRSState) {
  updateLocal((snapshot) => {
    const index = snapshot.srs.findIndex((item) => item.cid === state.cid);
    if (index >= 0) {
      snapshot.srs[index] = state;
    } else {
      snapshot.srs.push(state);
    }
  });
  await withDexie(async (db) => {
    await db.srs.put(state);
  });
}

export async function removeSrsState(id: string) {
  updateLocal((snapshot) => {
    snapshot.srs = snapshot.srs.filter((state) => state.cid !== id);
  });
  await withDexie(async (db) => {
    await db.srs.delete(id);
  });
}

export async function appendReview(record: ReviewRecord) {
  updateLocal((snapshot) => {
    snapshot.reviews.push(record);
  });
  await withDexie(async (db) => {
    await db.reviews.add(record);
  });
}

export async function replaceAll(payload: LocalSnapshot) {
  const normalized = normaliseSnapshot(payload);
  writeLocal(normalized);
  await withDexie(async (db) => {
    await db.transaction('rw', db.cards, db.srs, db.prefs, db.reviews, async () => {
      await db.cards.clear();
      await db.srs.clear();
      await db.prefs.clear();
      await db.reviews.clear();
      if (normalized.cards.length) await db.cards.bulkAdd(normalized.cards);
      if (normalized.srs.length) await db.srs.bulkAdd(normalized.srs);
      await db.prefs.add(normalized.prefs);
      if (normalized.reviews.length) await db.reviews.bulkAdd(normalized.reviews);
    });
  });
}

export async function fetchReviews(): Promise<ReviewRecord[]> {
  const dexieReviews = await withDexie(async (db) => {
    const reviews = await db.reviews.toArray();
    updateLocal((snapshot) => {
      snapshot.reviews = reviews;
    });
    return reviews;
  });
  if (dexieReviews) return dexieReviews;
  return readLocal().reviews;
}

export async function fetchCards(): Promise<Card[]> {
  const dexieCards = await withDexie(async (db) => {
    const cards = await db.cards.toArray();
    updateLocal((snapshot) => {
      snapshot.cards = cards;
    });
    return cards;
  });
  if (dexieCards) return dexieCards;
  return readLocal().cards;
}

export async function fetchSrs(): Promise<SRSState[]> {
  const dexieSrs = await withDexie(async (db) => {
    const srs = await db.srs.toArray();
    updateLocal((snapshot) => {
      snapshot.srs = srs;
    });
    return srs;
  });
  if (dexieSrs) return dexieSrs;
  return readLocal().srs;
}

export async function exportBackup(): Promise<LocalSnapshot> {
  const snapshot = await loadSnapshot();
  return {
    cards: snapshot.cards,
    srs: snapshot.srs,
    prefs: snapshot.prefs,
    reviews: snapshot.reviews
  };
}

export async function importBackup(payload: LocalSnapshot) {
  await replaceAll(payload);
}
