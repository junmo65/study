import { useState } from 'react';
import { usePrefs } from '../store/usePrefs';

export default function SettingsPage() {
  const { prefs, setPrefs, reset } = usePrefs();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setPrefs({ ...prefs });
    setMessage('设置已保存');
  };

  return (
    <div className="bg-white border border-slate-300 rounded p-4 space-y-4 max-w-2xl">
      <h2 className="text-lg font-semibold">学习设置</h2>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <label className="space-y-1">
          <span>每日新词目标</span>
          <input
            type="number"
            value={prefs.dailyNew}
            onChange={(e) => setPrefs({ dailyNew: Number(e.target.value) })}
            className="border border-slate-300 rounded px-3 py-2"
          />
        </label>
        <label className="space-y-1">
          <span>每日复习上限</span>
          <input
            type="number"
            value={prefs.dailyReviewCap}
            onChange={(e) => setPrefs({ dailyReviewCap: Number(e.target.value) })}
            className="border border-slate-300 rounded px-3 py-2"
          />
        </label>
        <label className="space-y-1">
          <span>默认算法</span>
          <select
            value={prefs.algo}
            onChange={(e) => setPrefs({ algo: e.target.value as 'SM2' | 'LEITNER' })}
            className="border border-slate-300 rounded px-3 py-2"
          >
            <option value="SM2">SM-2</option>
            <option value="LEITNER">Leitner</option>
          </select>
        </label>
        <label className="space-y-1">
          <span>拼写严格模式</span>
          <select
            value={prefs.typingStrict ? 'strict' : 'lenient'}
            onChange={(e) => setPrefs({ typingStrict: e.target.value === 'strict' })}
            className="border border-slate-300 rounded px-3 py-2"
          >
            <option value="lenient">宽松（允许编辑距离 ≤ 1）</option>
            <option value="strict">严格（必须完全匹配）</option>
          </select>
        </label>
        <label className="space-y-1">
          <span>完形填空密度</span>
          <select
            value={prefs.clozeDensity}
            onChange={(e) => setPrefs({ clozeDensity: e.target.value as 'low' | 'mid' | 'high' })}
            className="border border-slate-300 rounded px-3 py-2"
          >
            <option value="low">低</option>
            <option value="mid">中</option>
            <option value="high">高</option>
          </select>
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={handleSave} className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent">
          保存
        </button>
        <button onClick={reset} className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-warning text-warning">
          重置默认值
        </button>
      </div>
      {message && <p className="text-sm text-success">{message}</p>}
    </div>
  );
}
