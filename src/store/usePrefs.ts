import create from 'zustand';
import { persist } from 'zustand/middleware';
import type { Prefs } from '../types';
import { savePrefs } from './db';

const defaults: Prefs = {
  dailyNew: 20,
  dailyReviewCap: 120,
  algo: 'SM2',
  typingStrict: false,
  clozeDensity: 'mid'
};

interface PrefsState {
  prefs: Prefs;
  setPrefs: (prefs: Partial<Prefs>) => void;
  reset: () => void;
}

export const usePrefs = create<PrefsState>()(
  persist(
    (set) => ({
      prefs: defaults,
      setPrefs: (prefs) =>
        set((state) => {
          const next = { ...state.prefs, ...prefs };
          savePrefs(next);
          return { prefs: next };
        }),
      reset: () => {
        savePrefs(defaults);
        set({ prefs: defaults });
      }
    }),
    {
      name: 'orpea-prefs'
    }
  )
);
