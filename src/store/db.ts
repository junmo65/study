import Dexie, { Table } from 'dexie';
import type { Card, Prefs, SRSState, ReviewRecord } from '../types';

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

export const db = new OrpeaDB();

export async function loadPrefs(): Promise<Prefs> {
  const existing = await db.prefs.toArray();
  if (existing.length > 0) return existing[0];
  const defaults: Prefs = {
    dailyNew: 20,
    dailyReviewCap: 120,
    algo: 'SM2',
    typingStrict: false,
    clozeDensity: 'mid'
  };
  await db.prefs.clear();
  await db.prefs.add(defaults);
  return defaults;
}

export async function savePrefs(prefs: Prefs) {
  await db.prefs.clear();
  await db.prefs.add(prefs);
}

export interface BackupPayload {
  cards: Card[];
  srs: SRSState[];
  prefs: Prefs;
  reviews: ReviewRecord[];
}

export async function exportBackup(): Promise<BackupPayload> {
  const [cards, srs, prefsList, reviews] = await Promise.all([
    db.cards.toArray(),
    db.srs.toArray(),
    db.prefs.toArray(),
    db.reviews.toArray()
  ]);
  return {
    cards,
    srs,
    prefs: prefsList[0] ?? {
      dailyNew: 20,
      dailyReviewCap: 120,
      algo: 'SM2',
      typingStrict: false,
      clozeDensity: 'mid'
    },
    reviews
  };
}

export async function importBackup(payload: BackupPayload) {
  await db.transaction('rw', db.cards, db.srs, db.prefs, db.reviews, async () => {
    await db.cards.clear();
    await db.srs.clear();
    await db.prefs.clear();
    await db.reviews.clear();
    await db.cards.bulkAdd(payload.cards);
    await db.srs.bulkAdd(payload.srs);
    await db.prefs.add(payload.prefs);
    if (payload.reviews?.length) {
      await db.reviews.bulkAdd(payload.reviews);
    }
  });
}
