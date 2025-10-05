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
  { path: '/', label: '仪表盘', description: '今日表现、趋势与薄弱词', element: <Dashboard /> },
  { path: '/learn', label: '学习', description: '识记 / 回忆 / 搭配 / 完形练习', element: <Learn /> },
  { path: '/import', label: '导入', description: 'CSV / TSV 批量导入词卡', element: <ImportPage /> },
  { path: '/cards', label: '卡片库', description: '筛选、编辑、标记全部卡片', element: <CardsPage /> },
  { path: '/settings', label: '设置', description: '调节算法与每日目标', element: <SettingsPage /> },
  { path: '/backup', label: '备份', description: '备份 / 恢复 / 导出复习记录', element: <BackupPage /> },
  { path: '/print', label: '打印', description: '打印错题清单（A4 纯文本）', element: <PrintPage /> }
];

export default function App() {
  const [path, setPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );
  const { ready, loading, init, storageMode, storageError, todayNew, todayReview, todayCorrect } =
    useDeck((state) => ({
      ready: state.ready,
      loading: state.loading,
      init: state.init,
      storageMode: state.storageMode,
      storageError: state.storageError,
      todayNew: state.todayNew,
      todayReview: state.todayReview,
      todayCorrect: state.todayCorrect
    }));
  const queueSummary = useDeck((state) => ({
    due: state.queue?.due.length ?? 0,
    fresh: state.queue?.fresh.length ?? 0,
    session: state.queue?.session.length ?? 0
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  useEffect(() => {
    if (!ready && !loading) {
      init().catch((err) => console.error('Failed to initialise deck', err));
    }
  }, [ready, loading, init]);

  const current = useMemo(() => {
    return routes.find((r) => r.path === path) ?? routes[0];
  }, [path]);

  const handleNavigate = (nextPath: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
    }
    setPath(nextPath);
  };

  const accuracy = todayReview > 0 ? Math.round((todayCorrect / todayReview) * 100) : null;
  const content = ready ? (
    current.element
  ) : (
    <div className="space-y-4 text-sm md:text-base">
      <h2 className="text-lg font-semibold">正在准备本地数据…</h2>
      <p className="text-slate-600">
        首次使用请前往「导入」页面加载词表；若已导入，请稍候，系统会在本地 IndexedDB 或
        localStorage 中恢复您的数据。
      </p>
      {loading && <p>正在加载词卡与记忆曲线…</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-3 py-2 rounded border border-accent">
        跳转到主要内容
      </a>
      <div className="mx-auto flex flex-col md:flex-row max-w-7xl">
        <aside className="md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-white">
          <div className="px-5 py-6 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Orpea Vocab Coach</h1>
              <p className="text-xs text-slate-500">完全本地 · 纯文本记忆助手</p>
            </div>
            <nav className="space-y-1 text-sm">
              {routes.map((route) => {
                const active = current.path === route.path;
                return (
                  <button
                    type="button"
                    key={route.path}
                    onClick={() => handleNavigate(route.path)}
                    className={`w-full text-left px-3 py-2 rounded border transition ${
                      active
                        ? 'border-accent bg-accent text-white'
                        : 'border-slate-200 hover:border-accent hover:text-accent'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="block font-semibold">{route.label}</span>
                    <span className="block text-xs opacity-80">{route.description}</span>
                  </button>
                );
              })}
            </nav>
            <div className="text-xs text-slate-600 space-y-1">
              <p>今日新卡：{todayNew}</p>
              <p>今日复习：{todayReview}</p>
              <p>正确率：{accuracy !== null ? `${accuracy}%` : '—'}</p>
            </div>
          </div>
        </aside>
        <div className="flex-1 min-h-screen flex flex-col">
          <header className="border-b border-slate-200 bg-white px-5 py-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">{current.label}</h2>
                <p className="text-xs text-slate-500">{current.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                <span>到期复习：{queueSummary.due}</span>
                <span>新词待学：{queueSummary.fresh}</span>
                <span>回炉队列：{queueSummary.session}</span>
                <span>存储模式：{storageMode === 'indexeddb' ? 'IndexedDB' : 'localStorage'}</span>
              </div>
            </div>
          </header>
          {storageMode === 'local' && (
            <div className="bg-warning/10 border border-warning text-warning px-5 py-3 text-sm">
              <p>
                浏览器禁用了 IndexedDB，已自动切换到 localStorage 运行。请避免清除浏览器缓存，或在支持
                IndexedDB 的环境下使用以获得更可靠的持久化。
              </p>
              {storageError && <p className="mt-1 text-xs">错误信息：{storageError}</p>}
            </div>
          )}
          <main id="main" className="flex-1 px-5 py-6 md:px-8 md:py-8 text-sm md:text-base">
            {content}
          </main>
          <footer className="bg-white border-t border-slate-200 px-5 py-3 text-xs text-slate-500 text-center">
            本项目仅在本地运行，不会上传任何数据。所有素材均为纯文本。
          </footer>
        </div>
      </div>
    </div>
  );
}
