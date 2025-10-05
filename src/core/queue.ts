import dayjs from 'dayjs';
import { Card, Prefs, SRSState } from '../store/db';
import { chooseMode } from './scheduler';

export type StudyMode = 'recognition' | 'recall' | 'collocation' | 'cloze';

export interface SessionItem {
  cid: string;
  mode: StudyMode;
  isReview: boolean;
  availableAt: string;
}

interface BuildQueueParams {
  cards: Card[];
  srsMap: Record<string, SRSState | undefined>;
  prefs: Prefs;
  today: dayjs.Dayjs;
}

export interface QueueResult {
  queue: SessionItem[];
  newCount: number;
  reviewCount: number;
}

export const buildDailyQueue = ({ cards, srsMap, prefs, today }: BuildQueueParams): QueueResult => {
  const nowIso = dayjs().toISOString();
  const dueReviews = cards
    .map((card) => srsMap[card.id])
    .filter((srs): srs is SRSState => Boolean(srs))
    .filter((srs) => dayjs(srs.due).isBefore(today.endOf('day')))
    .sort((a, b) => dayjs(a.due).valueOf() - dayjs(b.due).valueOf())
    .slice(0, prefs.dailyReviewCap);

  const existingIds = new Set(dueReviews.map((srs) => srs.cid));
  const newCards = cards
    .filter((card) => !srsMap[card.id] || (srsMap[card.id]?.history.length ?? 0) === 0)
    .filter((card) => !existingIds.has(card.id))
    .slice(0, prefs.dailyNew);

  const queue: SessionItem[] = [
    ...dueReviews.map((srs) => ({
      cid: srs.cid,
      mode: chooseMode(srs.weakFacet),
      isReview: true,
      availableAt: nowIso
    })),
    ...newCards.map((card) => ({
      cid: card.id,
      mode: chooseMode(undefined),
      isReview: false,
      availableAt: nowIso
    }))
  ];

  return {
    queue,
    newCount: newCards.length,
    reviewCount: dueReviews.length
  };
};

export const selectNext = (queue: SessionItem[], now: dayjs.Dayjs = dayjs()): [SessionItem | undefined, SessionItem[]] => {
  const sorted = [...queue].sort((a, b) => dayjs(a.availableAt).valueOf() - dayjs(b.availableAt).valueOf());
  const nextIndex = sorted.findIndex((item) => dayjs(item.availableAt).isBefore(now.add(1, 'minute')));
  if (nextIndex === -1) {
    return [undefined, sorted];
  }
  const [next] = sorted.splice(nextIndex, 1);
  return [next, sorted];
};

export const scheduleRequeue = (item: SessionItem, minutes: number): SessionItem => ({
  ...item,
  availableAt: dayjs().add(minutes, 'minute').toISOString()
});
