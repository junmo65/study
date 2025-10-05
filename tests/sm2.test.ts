import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';
import { defaultSM2State, updateSM2 } from '../src/algos/sm2';

describe('SM-2 algorithm', () => {
  it('increments repetitions and intervals for correct answers', () => {
    let state = defaultSM2State('card1');
    state = updateSM2(state, { grade: 5, now: dayjs('2024-01-01') });
    expect(state.reps).toBe(1);
    expect(state.interval).toBe(1);

    state = updateSM2(state, { grade: 5, now: dayjs('2024-01-02') });
    expect(state.reps).toBe(2);
    expect(state.interval).toBe(6);

    state = updateSM2(state, { grade: 5, now: dayjs('2024-01-08') });
    expect(state.reps).toBe(3);
    expect(state.interval).toBeGreaterThanOrEqual(6);
  });

  it('resets repetitions and increases lapses for failing grades', () => {
    let state = defaultSM2State('card2');
    state = updateSM2(state, { grade: 2, now: dayjs('2024-01-01') });
    expect(state.reps).toBe(0);
    expect(state.interval).toBe(1);
    expect(state.lapses).toBe(1);
  });

  it('reduces grade when overdue by more than twice interval', () => {
    let state = defaultSM2State('card3');
    state = updateSM2(state, { grade: 5, now: dayjs('2024-01-01') });
    state = updateSM2(state, { grade: 5, now: dayjs('2024-01-02') });
    const overdueState = updateSM2(state, {
      grade: 5,
      now: dayjs('2024-01-20'),
      overdueDays: 20
    });
    expect(overdueState.interval).toBe(1);
    expect(overdueState.reps).toBe(0);
  });
});
