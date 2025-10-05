import dayjs from 'dayjs';
import type { Card, Prefs, SRSState } from '../types';

export interface SessionItem {
  card: Card;
  srs?: SRSState;
  availableAt: number;
}

export interface StudyQueue {
  due: Array<{ card: Card; srs: SRSState }>;
  fresh: Card[];
  session: SessionItem[];
}

export function buildQueue(
  cards: Card[],
  srsStates: SRSState[],
  prefs: Prefs,
  today = dayjs()
): StudyQueue {
  const due: Array<{ card: Card; srs: SRSState }> = [];
  const fresh: Card[] = [];
  const cardMap = new Map(cards.map((card) => [card.id, card]));

  const sortedSRS = [...srsStates].sort((a, b) => dayjs(a.due).valueOf() - dayjs(b.due).valueOf());

  for (const state of sortedSRS) {
    const card = cardMap.get(state.cid);
    if (!card) continue;
    const isDue = today.isAfter(dayjs(state.due)) || today.isSame(dayjs(state.due), 'day');
    if (isDue && due.length < prefs.dailyReviewCap) {
      due.push({ card, srs: state });
    }
  }

  const learnedIds = new Set(srsStates.map((s) => s.cid));
  for (const card of cards) {
    if (!learnedIds.has(card.id) && fresh.length < prefs.dailyNew) {
      fresh.push(card);
    }
  }

  return { due, fresh, session: [] };
}

export function getNext(queue: StudyQueue, now = Date.now()) {
  const readySessionIdx = queue.session.findIndex((item) => item.availableAt <= now);
  if (readySessionIdx >= 0) {
    const [item] = queue.session.splice(readySessionIdx, 1);
    return { card: item.card, srs: item.srs, source: 'session' as const };
  }
  if (queue.due.length > 0) {
    const next = queue.due.shift()!;
    return { ...next, source: 'due' as const };
  }
  if (queue.fresh.length > 0) {
    const card = queue.fresh.shift()!;
    return { card, srs: undefined, source: 'fresh' as const };
  }
  return null;
}

export function pushSession(queue: StudyQueue, card: Card, srs: SRSState | undefined, delayMinutes = 10) {
  const availableAt = dayjs().add(delayMinutes, 'minute').valueOf();
  queue.session.push({ card, srs, availableAt });
}
