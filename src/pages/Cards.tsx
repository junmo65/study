import { useState } from 'react';
import { Card, db } from '../store/db';
import { useDeck } from '../store/useDeck';
import { usePrefs } from '../store/usePrefs';
import { splitMulti } from '../utils/str';

const CardsPage = () => {
  const cards = useDeck((state) => state.cards);
  const refresh = useDeck((state) => state.refresh);
  const prefs = usePrefs((state) => state.prefs);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [selected, setSelected] = useState<Card | null>(null);
  const [message, setMessage] = useState('');

  const filtered = cards.filter((card) => {
    const keyword = search.trim().toLowerCase();
    const matchesSearch = keyword
      ? card.word.toLowerCase().includes(keyword) || card.def_zh.toLowerCase().includes(keyword)
      : true;
    const matchesTag = tagFilter ? card.tags.includes(tagFilter) : true;
    return matchesSearch && matchesTag;
  });

  const uniqueTags = Array.from(new Set(cards.flatMap((card) => card.tags))).filter(Boolean);

  const startEdit = (card: Card) => {
    setSelected({ ...card });
    setMessage('');
  };

  const updateField = (key: keyof Card, value: string) => {
    if (!selected) return;
    setSelected({ ...selected, [key]: value } as Card);
  };

  const updateArrayField = (key: keyof Card, value: string) => {
    if (!selected) return;
    setSelected({ ...selected, [key]: splitMulti(value) } as Card);
  };

  const save = async () => {
    if (!selected) return;
    const card = selected;
    await db.cards.put(card);
    await refresh(prefs);
    setMessage(`已保存更新：${card.word}`);
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">卡片总览</h2>
        <p className="text-sm text-slate-600">筛选、查看并编辑词卡内容。</p>
      </div>
      {message && <div className="bg-green-100 border border-green-300 text-green-800 px-3 py-2 rounded">{message}</div>}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs text-slate-500">搜索</label>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="border rounded px-3 py-2"
            placeholder="输入英文或中文"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500">按标签筛选</label>
          <select
            value={tagFilter}
            onChange={(event) => setTagFilter(event.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">全部</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-2 py-1 text-left">Word</th>
              <th className="px-2 py-1 text-left">POS</th>
              <th className="px-2 py-1 text-left">中文释义</th>
              <th className="px-2 py-1 text-left">Tags</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 100).map((card) => (
              <tr
                key={card.id}
                className="border-t hover:bg-neutral cursor-pointer"
                onClick={() => startEdit(card)}
              >
                <td className="px-2 py-1">{card.word}</td>
                <td className="px-2 py-1">{card.pos}</td>
                <td className="px-2 py-1">{card.def_zh}</td>
                <td className="px-2 py-1">{card.tags.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 100 && (
          <div className="text-xs text-slate-500 px-3 py-2">仅显示前 100 条，建议缩小筛选范围。</div>
        )}
      </div>
      {selected && (
        <div className="bg-white border rounded-lg p-6 space-y-3">
          <h3 className="text-lg font-semibold">编辑 {selected.word}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500">英文释义</label>
              <textarea
                value={selected.def_en}
                onChange={(event) => updateField('def_en', event.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500">中文释义</label>
              <textarea
                value={selected.def_zh}
                onChange={(event) => updateField('def_zh', event.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={4}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500">英文搭配（; 分隔）</label>
              <textarea
                value={selected.coll_en.join('; ')}
                onChange={(event) => updateArrayField('coll_en', event.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500">中文搭配（; 分隔）</label>
              <textarea
                value={selected.coll_zh.join('; ')}
                onChange={(event) => updateArrayField('coll_zh', event.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500">记忆法 / 例句 / 标签</label>
            <div className="grid md:grid-cols-3 gap-4">
              <textarea
                value={selected.mnemonic}
                onChange={(event) => updateField('mnemonic', event.target.value)}
                className="border rounded px-3 py-2"
                rows={2}
              />
              <textarea
                value={selected.ex_en}
                onChange={(event) => updateField('ex_en', event.target.value)}
                className="border rounded px-3 py-2"
                rows={2}
              />
              <input
                value={selected.tags.join('; ')}
                onChange={(event) => updateArrayField('tags', event.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={save} className="px-4 py-2 bg-primary text-white rounded">
              保存
            </button>
            <button type="button" onClick={() => setSelected(null)} className="px-4 py-2 border rounded">
              取消
            </button>
          </div>
          {message && <p className="text-sm text-green-600">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default CardsPage;
