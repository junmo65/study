import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';
import { leitnerUpdate } from '../src/algos/leitner';

describe('leitnerUpdate', () => {
  it('advances box on success', () => {
    const result = leitnerUpdate({ leibox: 1, lapses: 0 }, 4, dayjs('2023-01-01'));
    expect(result.leibox).toBe(2);
    expect(result.interval).toBe(1);
  });

  it('regresses on failure', () => {
    const result = leitnerUpdate({ leibox: 3, lapses: 1 }, 1, dayjs('2023-01-01'));
    expect(result.leibox).toBe(2);
    expect(result.lapses).toBe(2);
  });

  it('caps at box seven', () => {
    const result = leitnerUpdate({ leibox: 7, lapses: 0 }, 5, dayjs('2023-01-01'));
    expect(result.leibox).toBe(7);
    expect(dayjs(result.due).diff(dayjs('2023-01-01'), 'day')).toBe(30);
  });
});
