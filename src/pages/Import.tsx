import { useState } from 'react';
import { parseCSV, transformRow, ParsedCardRow } from '../utils/csv';
import { useDeck } from '../store/useDeck';
import { usePrefs } from '../store/usePrefs';

const ImportPage = () => {
  const prefs = usePrefs((state) => state.prefs);
  const importRows = useDeck((state) => state.importRows);
  const [preview, setPreview] = useState<ParsedCardRow[]>([]);
  const [parsedRows, setParsedRows] = useState<ParsedCardRow[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('尚未导入');
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);
    setWarnings([]);
    try {
      const result = await parseCSV(file);
      const parsed = result.data.map((row) => transformRow(row));
      setParsedRows(parsed);
      setPreview(parsed.slice(0, 20));
      setStatus(`预览 ${parsed.length} 条记录中的前 20 条。缺列项目会标记为黄色。`);
      const warnings = parsed
        .filter((row) => row.missing.length)
        .map((row) => `${row.word || 'Untitled'} 缺少: ${row.missing.join(', ')}`);
      setWarnings(warnings);
    } catch (error) {
      setStatus(`导入失败：${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const beginImport = async () => {
    if (!parsedRows.length) return;
    setLoading(true);
    try {
      const outcome = await importRows(parsedRows, prefs);
      setStatus(`导入完成：新增 ${outcome.added}，更新 ${outcome.updated}。可开始今日学习。`);
      setWarnings(outcome.warnings);
      setParsedRows([]);
    } finally {
      setLoading(false);
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      void handleFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">导入词卡</h2>
        <p className="text-sm text-slate-600">
          支持 CSV/TSV，列名可为中文或英文。搭配与标签可使用 ;；、| 任意分隔。
        </p>
      </div>
      <div className="bg-white border rounded-lg p-6 space-y-4">
        <input type="file" accept=".csv,.tsv,.txt" onChange={onChange} />
        <button
          type="button"
          onClick={beginImport}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-60"
          disabled={!parsedRows.length || loading}
        >
          {loading ? '处理中…' : '导入全部记录'}
        </button>
        <p className="text-sm text-slate-600">{status}</p>
        {warnings.length > 0 && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded">
            <p className="font-semibold">字段缺失警告（允许导入）：</p>
            <ul className="list-disc list-inside text-sm">
              {warnings.slice(0, 10).map((warn) => (
                <li key={warn}>{warn}</li>
              ))}
              {warnings.length > 10 && <li>其余 {warnings.length - 10} 条省略。</li>}
            </ul>
          </div>
        )}
        {preview.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border px-2 py-1">Word</th>
                  <th className="border px-2 py-1">POS</th>
                  <th className="border px-2 py-1">English Definition</th>
                  <th className="border px-2 py-1">中文释义</th>
                  <th className="border px-2 py-1">Collocations</th>
                  <th className="border px-2 py-1">常用搭配</th>
                  <th className="border px-2 py-1">Example</th>
                  <th className="border px-2 py-1">Tags</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row, index) => (
                  <tr key={index} className={row.missing.length ? 'bg-yellow-50' : ''}>
                    <td className="border px-2 py-1">{row.word}</td>
                    <td className="border px-2 py-1">{row.pos}</td>
                    <td className="border px-2 py-1">{row.def_en}</td>
                    <td className="border px-2 py-1">{row.def_zh}</td>
                    <td className="border px-2 py-1">{row.coll_en.join(', ')}</td>
                    <td className="border px-2 py-1">{row.coll_zh.join(', ')}</td>
                    <td className="border px-2 py-1">{row.ex_en}</td>
                    <td className="border px-2 py-1">{row.tags.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportPage;
