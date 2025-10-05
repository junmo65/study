import { useMemo, useState } from 'react';
import { useDeck } from '../store/useDeck';
import type { Card } from '../types';

const fields: Array<{ key: keyof Card; label: string; type?: 'textarea' }> = [
  { key: 'word', label: 'Word' },
  { key: 'pos', label: '词性' },
  { key: 'def_en', label: 'English Definition', type: 'textarea' },
  { key: 'def_zh', label: '中文释义', type: 'textarea' },
  { key: 'coll_en', label: 'Collocations (EN)', type: 'textarea' },
  { key: 'coll_zh', label: '常用搭配 (中文)', type: 'textarea' },
  { key: 'usage_notes', label: 'Usage Notes', type: 'textarea' },
  { key: 'mnemonic', label: '记忆法', type: 'textarea' },
  { key: 'ex_en', label: '例句 (EN)', type: 'textarea' },
  { key: 'ex_zh', label: '例句 (中文)', type: 'textarea' },
  { key: 'tags', label: 'Tags', type: 'textarea' }
];

export default function CardsPage() {
  const { cards, updateCard, deleteCard } = useDeck((state) => ({
    cards: state.cards,
    updateCard: state.updateCard,
    deleteCard: state.deleteCard
  }));
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [selected, setSelected] = useState<Card | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((card) => card.tags.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [cards]);

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch = search
        ? card.word.toLowerCase().includes(search.toLowerCase()) ||
          card.def_en.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesTag = tag ? card.tags.includes(tag) : true;
      return matchesSearch && matchesTag;
    });
  }, [cards, search, tag]);

  const handleSelect = (card: Card) => {
    setSelected(card);
    setMessage(null);
  };

  const handleChange = (key: keyof Card, value: string) => {
    if (!selected) return;
    if (key === 'coll_en' || key === 'coll_zh' || key === 'tags') {
      setSelected({ ...selected, [key]: value.split(/[;；、|]/).map((v) => v.trim()).filter(Boolean) } as Card);
    } else {
      setSelected({ ...selected, [key]: value } as Card);
    }
  };

  const handleSave = async () => {
    if (!selected) return;
    await updateCard(selected);
    setMessage('保存成功');
  };

  const handleDelete = async () => {
    if (!selected) return;
    await deleteCard(selected.id);
    setSelected(null);
  };

  return (
    <div className="grid md:grid-cols-[2fr_3fr] gap-6">
      <section className="bg-white border border-slate-300 rounded p-4 space-y-3">
        <h2 className="text-lg font-semibold">卡片列表</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索单词或释义"
            className="border border-slate-300 rounded px-3 py-2 flex-1"
          />
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border border-slate-300 rounded px-3 py-2"
          >
            <option value="">全部标签</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="max-h-[60vh] overflow-auto border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2 border border-slate-200">Word</th>
                <th className="px-3 py-2 border border-slate-200">POS</th>
                <th className="px-3 py-2 border border-slate-200">中文释义</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((card) => (
                <tr
                  key={card.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSelect(card)}
                >
                  <td className="px-3 py-2 border border-slate-200">{card.word}</td>
                  <td className="px-3 py-2 border border-slate-200">{card.pos}</td>
                  <td className="px-3 py-2 border border-slate-200 truncate">{card.def_zh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white border border-slate-300 rounded p-4 space-y-3">
        <h2 className="text-lg font-semibold">编辑</h2>
        {!selected ? (
          <p className="text-sm text-slate-600">选择左侧的卡片以进行编辑。</p>
        ) : (
          <div className="space-y-3 text-sm">
            {fields.map((field) => (
              <div key={field.key as string}>
                <label className="block text-xs font-semibold mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={Array.isArray((selected as any)[field.key]) ? (selected as any)[field.key].join('; ') : (selected as any)[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 h-20"
                  />
                ) : (
                  <input
                    value={(selected as any)[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2"
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent">
                保存
              </button>
              <button onClick={handleDelete} className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-warning text-warning">
                删除
              </button>
            </div>
            {message && <p className="text-sm text-success">{message}</p>}
          </div>
        )}
      </section>
    </div>
  );
}
