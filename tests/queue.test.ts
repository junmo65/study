import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';
import { buildDailyQueue, scheduleRequeue, selectNext } from '../src/core/queue';
import { Card, Prefs, SRSState } from '../src/store/db';

const mockCard = (id: string): Card => ({
  id,
  word: `word-${id}`,
  pos: 'n.',
  def_en: 'definition',
  def_zh: '释义',
  coll_en: [],
  coll_zh: [],
  usage_notes: '',
  mnemonic: '',
  ex_en: '',
  ex_zh: '',
  tags: []
});

describe('queue helpers', () => {
  const prefs: Prefs = {
    dailyNew: 5,
    dailyReviewCap: 10,
    algo: 'SM2',
    typingStrict: false,
    clozeDensity: 'mid'
  };

  it('prioritises due reviews before new cards', () => {
    const cards = [mockCard('1'), mockCard('2')];
    const srsMap: Record<string, SRSState> = {
      '1': {
        cid: '1',
        algo: 'SM2',
        due: dayjs().subtract(1, 'day').toISOString(),
        lapses: 0,
        history: []
      }
    } as any;
    const { queue } = buildDailyQueue({ cards, srsMap, prefs, today: dayjs() });
    expect(queue[0].cid).toBe('1');
  });

  it('requeues incorrect cards with future availability', () => {
    const item = { cid: '1', mode: 'recall', isReview: true, availableAt: dayjs().toISOString() };
    const scheduled = scheduleRequeue(item, 15);
    expect(dayjs(scheduled.availableAt).diff(dayjs(), 'minute')).toBeGreaterThanOrEqual(10);
  });

  it('selects next available card', () => {
    const now = dayjs();
    const queue = [
      { cid: 'a', mode: 'recall', isReview: true, availableAt: now.add(20, 'minute').toISOString() },
      { cid: 'b', mode: 'recall', isReview: true, availableAt: now.toISOString() }
    ];
    const [next] = selectNext(queue, now);
    expect(next?.cid).toBe('b');
  });
});
