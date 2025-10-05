import { useMemo } from 'react';
import { useDeck } from '../store/useDeck';

const PrintPage = () => {
  const cards = useDeck((state) => state.cards);
  const srsMap = useDeck((state) => state.srsMap);

  const difficultCards = useMemo(() => {
    return cards.filter((card) => {
      const history = srsMap[card.id]?.history ?? [];
      return history.slice(-10).some((entry) => entry.grade < 3);
    });
  }, [cards, srsMap]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">打印错题</h2>
        <p className="text-sm text-slate-600">为纸质复习导出最近易错的词汇。建议打印前使用浏览器打印功能。</p>
      </div>
      <div className="bg-white border rounded-lg p-6 space-y-4">
        {difficultCards.length ? (
          <div className="grid md:grid-cols-2 gap-4">
            {difficultCards.map((card) => (
              <div key={card.id} className="border rounded p-4">
                <div className="text-lg font-semibold">{card.word}</div>
                <div className="text-xs text-slate-500">{card.pos}</div>
                <div className="mt-2 text-sm">中文释义：{card.def_zh}</div>
                <div className="mt-1 text-sm">英文释义：{card.def_en}</div>
                <div className="mt-1 text-sm">搭配：{card.coll_en.join(', ') || '—'}</div>
                <div className="mt-1 text-sm">例句：{card.ex_en}</div>
                <div className="mt-1 text-sm text-slate-500">标签：{card.tags.join(', ') || '—'}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">暂无错题记录。</p>
        )}
      </div>
    </div>
  );
};

export default PrintPage;
