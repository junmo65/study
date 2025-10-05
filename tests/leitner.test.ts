import { describe, expect, it } from 'vitest';
import dayjs from 'dayjs';
import { defaultLeitnerState, getIntervalForBox, updateLeitner } from '../src/algos/leitner';

describe('Leitner algorithm', () => {
  it('promotes card on success', () => {
    let state = defaultLeitnerState('c1');
    state = updateLeitner(state, 4, dayjs('2024-01-01'));
    expect(state.box).toBe(2);
    expect(getIntervalForBox(state.box)).toBe(2);
  });

  it('demotes card on failure', () => {
    let state = defaultLeitnerState('c2');
    state = { ...state, box: 4 };
    state = updateLeitner(state, 1, dayjs('2024-01-01'));
    expect(state.box).toBe(3);
    expect(state.lapses).toBe(1);
  });

  it('caps box levels', () => {
    let state = defaultLeitnerState('c3');
    state = { ...state, box: 7 };
    state = updateLeitner(state, 5, dayjs('2024-01-01'));
    expect(state.box).toBe(7);
  });
});
