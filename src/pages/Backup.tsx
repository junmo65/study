import { useState } from 'react';
import { exportBackup, importBackup } from '../store/db';
import { useDeck } from '../store/useDeck';
import { usePrefs } from '../store/usePrefs';

export default function BackupPage() {
  const exportReviewsCsv = useDeck((state) => state.exportReviewsCsv);
  const exportProgressJson = useDeck((state) => state.exportProgressJson);
  const refreshQueue = useDeck((state) => state.refreshQueue);
  const init = useDeck((state) => state.init);
  const setPrefs = usePrefs((state) => state.setPrefs);
  const [message, setMessage] = useState<string | null>(null);

  const handleExportBackup = async () => {
    const data = await exportBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orpea-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = async (file: File) => {
    const text = await file.text();
    const json = JSON.parse(text);
    await importBackup(json);
    setMessage('备份已恢复');
    await init();
    refreshQueue();
    if (json.prefs) {
      setPrefs(json.prefs);
    }
  };

  const handleExportReviews = async () => {
    const csv = await exportReviewsCsv();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reviews.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportProgress = async () => {
    const json = await exportProgressJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <section className="bg-white border border-slate-300 rounded p-4 space-y-3">
        <h2 className="text-lg font-semibold">备份</h2>
        <button onClick={handleExportBackup} className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent">
          导出备份 JSON
        </button>
        <button onClick={handleExportProgress} className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent">
          导出学习进度 JSON
        </button>
        <button onClick={handleExportReviews} className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent">
          导出复习记录 CSV
        </button>
      </section>

      <section className="bg-white border border-slate-300 rounded p-4 space-y-3">
        <h2 className="text-lg font-semibold">恢复</h2>
        <input
          type="file"
          accept="application/json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImportBackup(file);
          }}
          className="border border-slate-300 rounded px-3 py-2"
        />
        {message && <p className="text-sm text-success">{message}</p>}
      </section>
    </div>
  );
}
