import { useEffect, useMemo, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import ImportPage from './pages/Import';
import CardsPage from './pages/Cards';
import SettingsPage from './pages/Settings';
import BackupPage from './pages/Backup';
import PrintPage from './pages/Print';
import { useDeck } from './store/useDeck';

const routes = [
  { path: '/', label: 'Dashboard', element: <Dashboard /> },
  { path: '/learn', label: 'Learn', element: <Learn /> },
  { path: '/import', label: 'Import', element: <ImportPage /> },
  { path: '/cards', label: 'Cards', element: <CardsPage /> },
  { path: '/settings', label: 'Settings', element: <SettingsPage /> },
  { path: '/backup', label: 'Backup', element: <BackupPage /> },
  { path: '/print', label: 'Print', element: <PrintPage /> }
];

function navigate(path: string) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

export default function App() {
  const [path, setPath] = useState<string>(() => window.location.pathname || '/');
  const ready = useDeck((state) => state.ready);
  const init = useDeck((state) => state.init);

  useEffect(() => {
    const handler = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  useEffect(() => {
    if (!ready) {
      init().catch((err) => console.error(err));
    }
  }, [ready, init]);

  const current = useMemo(() => {
    return routes.find((r) => r.path === path) ?? routes[0];
  }, [path]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Orpea Vocab Coach</h1>
          <nav className="flex flex-wrap gap-2 text-sm">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => navigate(route.path)}
                className={`px-3 py-1 rounded border text-left ${
                  current.path === route.path
                    ? 'bg-accent text-white border-accent'
                    : 'border-slate-300 hover:border-accent'
                }`}
              >
                {route.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 text-sm md:text-base">
        {current.element}
      </main>
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        <p>All data is stored locally in your browser. No trackers, no external services.</p>
      </footer>
    </div>
  );
}
