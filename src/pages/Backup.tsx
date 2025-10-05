import { useState } from 'react';
import { db } from '../store/db';
import { usePrefs } from '../store/usePrefs';
import { useDeck } from '../store/useDeck';

const download = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const exportCSV = (rows: { [key: string]: unknown }[]) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  rows.forEach((row) => {
    lines.push(headers.map((header) => JSON.stringify(row[header] ?? '')).join(','));
  });
  return lines.join('\n');
};

const BackupPage = () => {
  const prefs = usePrefs((state) => state.prefs);
  const updatePrefs = usePrefs((state) => state.update);
  const refreshDeck = useDeck((state) => state.refresh);
  const [mode, setMode] = useState<'merge' | 'replace'>('merge');
  const [message, setMessage] = useState('');

  const exportProgress = async () => {
    const [cards, srs, storedPrefs] = await Promise.all([
      db.cards.toArray(),
      db.srs.toArray(),
      db.prefs.get('app')
    ]);
    download(
      'progress.json',
      JSON.stringify({ cards, srs, prefs: storedPrefs?.value ?? prefs }, null, 2)
    );
  };

  const exportReviews = async () => {
    const reviews = await db.reviews.toArray();
    const csv = exportCSV(reviews.map(({ id, ...rest }) => rest));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reviews.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    const text = await file.text();
    const payload = JSON.parse(text) as {
      cards?: unknown[];
      srs?: unknown[];
      prefs?: unknown;
    };
    if (mode === 'replace') {
      await db.transaction('rw', db.cards, db.srs, db.reviews, db.prefs, async () => {
        await Promise.all([db.cards.clear(), db.srs.clear(), db.reviews.clear()]);
        if (Array.isArray(payload.cards)) {
          await db.cards.bulkAdd(payload.cards as any[]);
        }
        if (Array.isArray(payload.srs)) {
          await db.srs.bulkAdd(payload.srs as any[]);
        }
        if (payload.prefs) {
          await db.prefs.put({ key: 'app', value: payload.prefs as any });
        }
      });
      if (payload.prefs) {
        await updatePrefs(payload.prefs as any);
      }
    } else {
      if (Array.isArray(payload.cards)) {
        for (const raw of payload.cards as any[]) {
          if (!raw.id) continue;
          await db.cards.put(raw);
        }
      }
      if (Array.isArray(payload.srs)) {
        for (const raw of payload.srs as any[]) {
          if (!raw.cid) continue;
          await db.srs.put(raw);
        }
      }
      if (payload.prefs) {
        await updatePrefs(payload.prefs as any);
      }
    }
    await refreshDeck(usePrefs.getState().prefs);
    setMessage('数据已恢复');
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      void importJson(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">备份与恢复</h2>
        <p className="text-sm text-slate-600">导出 JSON/CSV 备份，或从本地文件恢复。</p>
      </div>
      <div className="bg-white border rounded-lg p-6 space-y-4">
        <button type="button" onClick={exportProgress} className="px-4 py-2 bg-primary text-white rounded">
          导出 progress.json
        </button>
        <button type="button" onClick={exportReviews} className="px-4 py-2 bg-primary text-white rounded">
          导出 reviews.csv
        </button>
        <div className="space-y-2">
          <div className="text-sm font-semibold">恢复策略</div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="mode"
              value="merge"
              checked={mode === 'merge'}
              onChange={() => setMode('merge')}
            />
            合并：覆盖同 ID 的卡片，其余追加。
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="mode"
              value="replace"
              checked={mode === 'replace'}
              onChange={() => setMode('replace')}
            />
            覆盖：清空现有数据后完整写入备份。
          </label>
        </div>
        <input type="file" accept="application/json" onChange={onFileChange} />
        {message && <p className="text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default BackupPage;
