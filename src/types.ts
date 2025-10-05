export type SRSAlgo = 'SM2' | 'LEITNER';
export type WeakFacet = 'meaning' | 'collocation' | 'spelling' | 'usage' | 'example';
export type StudyMode = 'recognition' | 'recall' | 'collocation' | 'cloze';

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

export interface SRSState {
  cid: string;
  algo: SRSAlgo;
  ef: number;
  interval: number;
  reps: number;
  due: string;
  leibox?: number;
  lapses: number;
  lastGrade?: 0 | 1 | 2 | 3 | 4 | 5;
  history: Array<{ ts: string; grade: number; mode: StudyMode; interval: number }>;
  weakFacet?: WeakFacet;
}

export interface Prefs {
  dailyNew: number;
  dailyReviewCap: number;
  algo: SRSAlgo;
  typingStrict: boolean;
  clozeDensity: 'low' | 'mid' | 'high';
}

export interface ReviewRecord {
  cid: string;
  grade: number;
  mode: StudyMode;
  ts: string;
  interval: number;
}
