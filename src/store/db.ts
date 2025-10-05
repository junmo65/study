import Dexie, { Table } from 'dexie';

export interface Card {
  id: string;
  word: string;
  pos: string;
  def_en: string;
  def_zh: string;
  coll_en: string[];
  coll_zh: string[];
  usage_notes: string;
  mnemonic: string;
  ex_en: string;
  ex_zh: string;
  tags: string[];
}

export type AlgoType = 'SM2' | 'LEITNER';

export interface SRSState {
  cid: string;
  algo: AlgoType;
  ef?: number;
  interval?: number;
  reps?: number;
  box?: number;
  due: string;
  lapses: number;
  weakFacet?: string;
  lastGrade?: number;
  history: { ts: string; grade: number; mode: string; interval: number }[];
}

export interface Prefs {
  dailyNew: number;
  dailyReviewCap: number;
  algo: AlgoType;
  typingStrict: boolean;
  clozeDensity: 'low' | 'mid' | 'high';
}

export interface ReviewLog {
  id?: number;
  cid: string;
  ts: string;
  grade: number;
  mode: string;
  interval: number;
}

export class CoachDB extends Dexie {
  cards!: Table<Card, string>;
  srs!: Table<SRSState, string>;
  prefs!: Table<{ key: string; value: Prefs }, string>;
  reviews!: Table<ReviewLog, number>;

  constructor() {
    super('orpea-vocab-coach');
    this.version(1).stores({
      cards: 'id, word, pos, tags',
      srs: 'cid, due, algo',
      prefs: 'key',
      reviews: '++id, cid, ts'
    });
  }
}

export const db = new CoachDB();

export const defaultPrefs: Prefs = {
  dailyNew: 20,
  dailyReviewCap: 120,
  algo: 'SM2',
  typingStrict: false,
  clozeDensity: 'mid'
};
