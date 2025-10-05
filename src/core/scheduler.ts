import dayjs from 'dayjs';
import type { Card, Prefs, SRSState, StudyMode, WeakFacet } from '../types';
import { sm2Update } from '../algos/sm2';
import { leitnerUpdate } from '../algos/leitner';

const weakFacetToMode: Record<WeakFacet, StudyMode> = {
  meaning: 'recognition',
  collocation: 'collocation',
  spelling: 'recall',
  usage: 'recognition',
  example: 'cloze'
};

const modePriority: StudyMode[] = ['recognition', 'recall', 'collocation', 'cloze'];

export function getDue(states: SRSState[], today = dayjs()) {
  return states.filter((state) => today.isSame(dayjs(state.due), 'day') || today.isAfter(dayjs(state.due)));
}

export function facetFromMode(mode: StudyMode): WeakFacet {
  switch (mode) {
    case 'recognition':
      return 'meaning';
    case 'recall':
      return 'spelling';
    case 'collocation':
      return 'collocation';
    case 'cloze':
      return 'example';
    default:
      return 'meaning';
  }
}

export function pickMode(card: Card, srs: SRSState | undefined): StudyMode {
  if (srs?.weakFacet) {
    return weakFacetToMode[srs.weakFacet];
  }
  const idx = Math.abs(card.word.length + (srs?.reps ?? 0)) % modePriority.length;
  return modePriority[idx];
}

export interface UpdateResult {
  srs: SRSState;
  history: { ts: string; grade: number; mode: StudyMode; interval: number };
  rescheduleMinutes?: number;
}

export function updateAfterGrade(
  card: Card,
  srs: SRSState | undefined,
  prefs: Prefs,
  grade: 0 | 1 | 2 | 3 | 4 | 5,
  mode: StudyMode,
  today = dayjs()
): UpdateResult {
  const base: SRSState =
    srs ?? {
      cid: card.id,
      algo: prefs.algo,
      ef: 2.5,
      interval: 0,
      reps: 0,
      due: today.toISOString(),
      lapses: 0,
      history: []
    };

  const algo = base.algo ?? prefs.algo;
  const update =
    algo === 'LEITNER'
      ? leitnerUpdate({ leibox: base.leibox, lapses: base.lapses }, grade, today)
      : sm2Update(base, grade, today);

  const weakFacet = grade < 3 ? facetFromMode(mode) : undefined;
  const historyEntry = {
    ts: today.toISOString(),
    grade,
    mode,
    interval: update.interval ?? base.interval
  };

  const next: SRSState = {
    ...base,
    ...update,
    cid: card.id,
    algo,
    weakFacet,
    history: [...(base.history ?? []), historyEntry]
  };

  const rescheduleMinutes = grade >= 3 ? undefined : 10 + Math.floor(Math.random() * 11);

  return { srs: next, history: historyEntry, rescheduleMinutes };
}
