import create from 'zustand';
import { db, defaultPrefs, Prefs } from './db';

interface PrefsState {
  prefs: Prefs;
  ready: boolean;
  load: () => Promise<void>;
  update: (changes: Partial<Prefs>) => Promise<void>;
}

export const usePrefs = create<PrefsState>((set, get) => ({
  prefs: defaultPrefs,
  ready: false,
  load: async () => {
    const stored = await db.prefs.get('app');
    set({ prefs: stored?.value ?? defaultPrefs, ready: true });
  },
  update: async (changes) => {
    const prefs = { ...get().prefs, ...changes };
    await db.prefs.put({ key: 'app', value: prefs });
    set({ prefs });
  }
}));
