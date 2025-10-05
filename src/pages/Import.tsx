import { useState } from 'react';
import { parseCsv, ParsedCardResult } from '../utils/csv';
import { useDeck } from '../store/useDeck';

export default function ImportPage() {
  const importCards = useDeck((state) => state.importCards);
  const [result, setResult] = useState<ParsedCardResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setMessage(null);
    const text = await file.text();
    const parsed = parseCsv(text);
    setResult(parsed);
  };

  const handleImport = async () => {
    if (!result) return;
    setLoading(true);
    try {
      const { added, updated } = await importCards(result.all);
      setMessage(`导入成功：新增 ${added} 张，更新 ${updated} 张。`);
      setResult(null);
    } catch (error) {
      setMessage(`导入失败：${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white border border-slate-300 rounded p-4 space-y-3">
        <h2 className="text-lg font-semibold">导入 CSV/TSV</h2>
        <p className="text-sm text-slate-600">
          兼容列名：Word, POS, English Definition, 中文释义, Collocations (EN), 常用搭配(中文), Usage Notes, 记忆法/词根, Example (EN), 例句译文(中文), Tags。
        </p>
        <input
          type="file"
          accept=".csv,.tsv,.txt"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="border border-slate-300 px-3 py-2 rounded"
        />
        {message && <p className="text-sm text-accent">{message}</p>}
      </section>

      {result && (
        <section className="bg-white border border-slate-300 rounded p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold">预览（前 20 行）</h3>
            <button
              onClick={handleImport}
              className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent"
              disabled={loading}
            >
              {loading ? '导入中...' : '导入全部'}
            </button>
          </div>
          {result.warnings.length > 0 && (
            <ul className="text-sm text-warning list-disc list-inside">
              {result.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          )}
          <table className="w-full text-xs border border-slate-300">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-2 py-1">Word</th>
                <th className="border border-slate-300 px-2 py-1">POS</th>
                <th className="border border-slate-300 px-2 py-1">English Definition</th>
                <th className="border border-slate-300 px-2 py-1">中文释义</th>
                <th className="border border-slate-300 px-2 py-1">Tags</th>
              </tr>
            </thead>
            <tbody>
              {result.preview.map((card) => (
                <tr key={card.id}>
                  <td className="border border-slate-200 px-2 py-1">{card.word}</td>
                  <td className="border border-slate-200 px-2 py-1">{card.pos}</td>
                  <td className="border border-slate-200 px-2 py-1">{card.def_en}</td>
                  <td className="border border-slate-200 px-2 py-1">{card.def_zh}</td>
                  <td className="border border-slate-200 px-2 py-1">{card.tags.join('; ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
