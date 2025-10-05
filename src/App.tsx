import { useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import ImportPage from './pages/Import';
import CardsPage from './pages/Cards';
import SettingsPage from './pages/Settings';
import BackupPage from './pages/Backup';
import PrintPage from './pages/Print';
import { usePrefs } from './store/usePrefs';
import { useDeck } from './store/useDeck';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/learn', label: 'Learn' },
  { to: '/import', label: 'Import' },
  { to: '/cards', label: 'Cards' },
  { to: '/settings', label: 'Settings' },
  { to: '/backup', label: 'Backup' },
  { to: '/print', label: 'Print' }
];

const App = () => {
  const prefs = usePrefs((state) => state.prefs);
  const ready = usePrefs((state) => state.ready);
  const loadPrefs = usePrefs((state) => state.load);
  const loadDeck = useDeck((state) => state.load);

  useEffect(() => {
    void loadPrefs();
  }, [loadPrefs]);

  useEffect(() => {
    if (ready) {
      void loadDeck(prefs);
    }
  }, [ready, prefs, loadDeck]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Orpea Vocab Coach</h1>
          <nav className="flex flex-wrap gap-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md border border-primary ${
                    isActive ? 'bg-primary text-white' : 'text-primary bg-white'
                  }`
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/backup" element={<BackupPage />} />
            <Route path="/print" element={<PrintPage />} />
          </Routes>
        </div>
      </main>
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-slate-500">
          Fully local spaced repetition practice. Keyboard friendly (Space to flip/submit, 1-5 grading).
        </div>
      </footer>
    </div>
  );
};

export default App;
