import create from 'zustand';
import type { Prefs } from '../types';
import { DEFAULT_PREFS, savePrefs } from './db';

interface PrefsState {
  prefs: Prefs;
  hydrate: (prefs: Prefs) => void;
  setPrefs: (prefs: Partial<Prefs>) => void;
  reset: () => void;
}

export const usePrefs = create<PrefsState>((set) => ({
  prefs: DEFAULT_PREFS,
  hydrate: (prefs) => {
    const next = { ...DEFAULT_PREFS, ...prefs };
    set({ prefs: next });
  },
  setPrefs: (partial) => {
    set((state) => {
      const next = { ...state.prefs, ...partial };
      savePrefs(next);
      return { prefs: next };
    });
  },
  reset: () => {
    savePrefs(DEFAULT_PREFS);
    set({ prefs: DEFAULT_PREFS });
  }
}));
