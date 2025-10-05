import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';
import { buildQueue, getNext, pushSession } from '../src/core/queue';
import type { Card, Prefs, SRSState } from '../src/types';

const prefs: Prefs = {
  dailyNew: 2,
  dailyReviewCap: 5,
  algo: 'SM2',
  typingStrict: false,
  clozeDensity: 'mid'
};

const cards: Card[] = [
  {
    id: '1',
    word: 'abate',
    pos: 'verb',
    def_en: 'to reduce',
    def_zh: '减少',
    coll_en: [],
    coll_zh: [],
    usage_notes: '',
    mnemonic: '',
    ex_en: '',
    ex_zh: '',
    tags: []
  },
  {
    id: '2',
    word: 'brisk',
    pos: 'adj',
    def_en: 'quick',
    def_zh: '轻快的',
    coll_en: [],
    coll_zh: [],
    usage_notes: '',
    mnemonic: '',
    ex_en: '',
    ex_zh: '',
    tags: []
  }
];

const srs: SRSState[] = [
  {
    cid: '1',
    algo: 'SM2',
    ef: 2.5,
    interval: 1,
    reps: 1,
    due: dayjs().subtract(1, 'day').toISOString(),
    lapses: 0,
    history: []
  }
];

describe('queue', () => {
  it('builds due and fresh queues', () => {
    const queue = buildQueue(cards, srs, prefs, dayjs());
    expect(queue.due.length).toBe(1);
    expect(queue.fresh.length).toBe(1);
  });

  it('serves session items first', () => {
    const queue = buildQueue(cards, srs, prefs, dayjs());
    pushSession(queue, cards[0], srs[0], -1);
    const next = getNext(queue, Date.now());
    expect(next?.source).toBe('session');
  });
});
