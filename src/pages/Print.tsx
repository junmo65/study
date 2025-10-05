import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useDeck } from '../store/useDeck';

export default function PrintPage() {
  const { reviews, cards, srs } = useDeck((state) => ({
    reviews: state.reviews,
    cards: state.cards,
    srs: state.srs
  }));

  const recentMistakes = useMemo(() => {
    const oneWeekAgo = dayjs().subtract(7, 'day');
    return reviews
      .filter((review) => review.grade < 3 && dayjs(review.ts).isAfter(oneWeekAgo))
      .map((review) => ({
        review,
        card: cards.find((card) => card.id === review.cid)
      }))
      .filter((entry) => entry.card);
  }, [reviews, cards]);

  const facetCounts = useMemo(() => {
    const counts = new Map<string, number>();
    srs.forEach((state) => {
      if (state.weakFacet) {
        counts.set(state.weakFacet, (counts.get(state.weakFacet) ?? 0) + 1);
      }
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [srs]);

  return (
    <div className="space-y-4 text-sm">
      <style>{`@media print { body { background: #fff; color: #000; } table { page-break-inside: avoid; } }`}</style>
      <section>
        <h2 className="text-xl font-semibold mb-2">本周错题</h2>
        <table className="w-full border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-2 py-1">单词</th>
              <th className="border border-slate-300 px-2 py-1">中文释义</th>
              <th className="border border-slate-300 px-2 py-1">错误时间</th>
              <th className="border border-slate-300 px-2 py-1">例句</th>
            </tr>
          </thead>
          <tbody>
            {recentMistakes.length === 0 ? (
              <tr>
                <td className="px-2 py-2" colSpan={4}>
                  最近一周没有错题。
                </td>
              </tr>
            ) : (
              recentMistakes.map(({ review, card }) => (
                <tr key={review.ts + review.cid}>
                  <td className="border border-slate-200 px-2 py-1">{card!.word}</td>
                  <td className="border border-slate-200 px-2 py-1">{card!.def_zh}</td>
                  <td className="border border-slate-200 px-2 py-1">{dayjs(review.ts).format('YYYY-MM-DD HH:mm')}</td>
                  <td className="border border-slate-200 px-2 py-1">{card!.ex_en}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">薄弱面分布</h2>
        {facetCounts.length === 0 ? (
          <p>暂无弱项数据。</p>
        ) : (
          <table className="w-full border border-slate-300">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-2 py-1">薄弱面</th>
                <th className="border border-slate-300 px-2 py-1">数量</th>
              </tr>
            </thead>
            <tbody>
              {facetCounts.map(([facet, count]) => (
                <tr key={facet}>
                  <td className="border border-slate-200 px-2 py-1">{facet}</td>
                  <td className="border border-slate-200 px-2 py-1">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
