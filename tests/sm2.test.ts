import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';
import { sm2Update } from '../src/algos/sm2';

describe('sm2Update', () => {
  it('handles initial correct answers', () => {
    const result = sm2Update({ ef: 2.5, reps: 0, interval: 0, lapses: 0 }, 5, dayjs('2023-01-01'));
    expect(result.reps).toBe(1);
    expect(result.interval).toBe(1);
    expect(result.due).toBe(dayjs('2023-01-02').toISOString());
  });

  it('resets on failure', () => {
    const result = sm2Update({ ef: 2.5, reps: 3, interval: 6, lapses: 0 }, 1, dayjs('2023-01-01'));
    expect(result.reps).toBe(0);
    expect(result.interval).toBe(1);
    expect(result.lapses).toBe(1);
  });

  it('applies overdue penalty', () => {
    const result = sm2Update(
      { ef: 2.5, reps: 4, interval: 10, lapses: 0, due: dayjs('2022-12-20').toISOString() },
      5,
      dayjs('2023-01-05')
    );
    expect(result.lastGrade).toBeLessThan(5);
  });

  it('boosts ef on consecutive perfect', () => {
    const first = sm2Update({ ef: 2.5, reps: 2, interval: 6, lapses: 0, lastGrade: 5 }, 5, dayjs('2023-01-01'));
    expect(first.ef).toBeGreaterThan(2.5);
  });
});
