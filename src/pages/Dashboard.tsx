import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useDeck } from '../store/useDeck';
import { usePrefs } from '../store/usePrefs';

function Bar({ value, max }: { value: number; max: number }) {
  const width = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="w-full bg-slate-200 h-2 rounded">
      <div className="h-2 bg-accent rounded" style={{ width: `${width}%` }} />
    </div>
  );
}

export default function Dashboard() {
  const { cards, srs, reviews, todayNew, todayReview, todayCorrect } = useDeck((state) => state);
  const { prefs } = usePrefs();

  const correctRate = todayReview === 0 ? 0 : Math.round((todayCorrect / todayReview) * 100);

  const trend = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, idx) => ({ day: idx, count: 0 }));
    srs.forEach((state) => {
      const due = dayjs(state.due);
      const diff = due.diff(dayjs().startOf('day'), 'day');
      if (diff >= 0 && diff < 7) {
        days[diff].count += 1;
      }
    });
    return days;
  }, [srs]);

  const topTags = useMemo(() => {
    const mistakes = reviews.filter((r) => r.grade < 3).slice(-200);
    const tagCounts = new Map<string, number>();
    mistakes.forEach((review) => {
      const card = cards.find((c) => c.id === review.cid);
      if (!card) return;
      card.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      });
    });
    return [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [reviews, cards]);

  const forgettingRate = useMemo(() => {
    const dueSoon = srs.filter((state) => dayjs(state.due).isBefore(dayjs().add(3, 'day')));
    if (dueSoon.length === 0) return 0;
    const highRisk = dueSoon.filter((state) => (state.lastGrade ?? 5) < 3 || (state.lapses ?? 0) > 2);
    return Math.round((highRisk.length / dueSoon.length) * 100);
  }, [srs]);

  const maxTrend = trend.reduce((acc, cur) => Math.max(acc, cur.count), 0);

  return (
    <div className="space-y-6">
      <section className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-300 rounded p-4">
          <h2 className="text-lg font-semibold">今日新卡</h2>
          <p className="text-3xl font-bold">{todayNew} / {prefs.dailyNew}</p>
        </div>
        <div className="bg-white border border-slate-300 rounded p-4">
          <h2 className="text-lg font-semibold">今日复习</h2>
          <p className="text-3xl font-bold">{todayReview} / {prefs.dailyReviewCap}</p>
          <p className="text-sm text-slate-600">正确率 {correctRate}%</p>
        </div>
        <div className="bg-white border border-slate-300 rounded p-4">
          <h2 className="text-lg font-semibold">预估遗忘率</h2>
          <p className="text-3xl font-bold">{forgettingRate}%</p>
          <p className="text-xs text-slate-500">基于未来 3 天到期卡片与历史错误</p>
        </div>
      </section>

      <section className="bg-white border border-slate-300 rounded p-4">
        <h2 className="text-lg font-semibold mb-3">未来 7 天到期趋势</h2>
        <div className="space-y-3">
          {trend.map((entry) => (
            <div key={entry.day}>
              <div className="flex justify-between text-sm">
                <span>{entry.day === 0 ? '今天' : `${entry.day} 天后`}</span>
                <span>{entry.count} 张</span>
              </div>
              <Bar value={entry.count} max={maxTrend} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-slate-300 rounded p-4">
        <h2 className="text-lg font-semibold mb-3">易错标签 Top 5</h2>
        {topTags.length === 0 ? (
          <p className="text-sm text-slate-600">暂无数据。</p>
        ) : (
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {topTags.map(([tag, count]) => (
              <li key={tag}>
                {tag}: {count} 次错误
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
