import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useDeck } from '../store/useDeck';

const Dashboard = () => {
  const cards = useDeck((state) => state.cards);
  const srsMap = useDeck((state) => state.srsMap);
  const queueMeta = useDeck((state) => state.queueMeta);
  const sessionStats = useDeck((state) => state.sessionStats);

  const today = dayjs().startOf('day');

  const reviewDue = useMemo(() => {
    return Object.values(srsMap).filter((srs) => dayjs(srs.due).isBefore(today.endOf('day'))).length;
  }, [srsMap, today]);

  const newCards = useMemo(() => {
    return cards.filter((card) => (srsMap[card.id]?.history.length ?? 0) === 0).length;
  }, [cards, srsMap]);

  const trend = useMemo(() => {
    const result: { date: string; count: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const target = today.add(i, 'day');
      const count = Object.values(srsMap).filter((srs) => dayjs(srs.due).isSame(target, 'day')).length;
      result.push({ date: target.format('MM-DD'), count });
    }
    return result;
  }, [srsMap, today]);

  const tagStats = useMemo(() => {
    const counter = new Map<string, number>();
    for (const card of cards) {
      const history = srsMap[card.id]?.history ?? [];
      history
        .filter((entry) => entry.grade < 3)
        .forEach(() => {
          card.tags.forEach((tag) => {
            counter.set(tag, (counter.get(tag) ?? 0) + 1);
          });
        });
    }
    return [...counter.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [cards, srsMap]);

  const forgettingRate = useMemo(() => {
    if (!cards.length) return 0;
    const risks = cards.map((card) => {
      const srs = srsMap[card.id];
      if (!srs) return 0.5;
      const ef = srs.ef ?? 2.5;
      const interval = srs.interval ?? 1;
      return Math.min(0.95, Math.max(0.05, interval / (ef * 10)));
    });
    return risks.reduce((sum, value) => sum + value, 0) / risks.length;
  }, [cards, srsMap]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">仪表盘</h2>
        <p className="text-sm text-slate-600">每日复习与新词指标一览。</p>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-xs text-slate-500">今日待复习</div>
          <div className="text-3xl font-semibold">{reviewDue}</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-xs text-slate-500">今日新词额度</div>
          <div className="text-3xl font-semibold">{queueMeta?.newCount ?? newCards}</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-xs text-slate-500">今日正确率</div>
          <div className="text-3xl font-semibold">
            {sessionStats.total ? ((sessionStats.correct / sessionStats.total) * 100).toFixed(0) : '—'}%
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-xs text-slate-500">预估遗忘率</div>
          <div className="text-3xl font-semibold">{Math.round(forgettingRate * 100)}%</div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">未来 7 天到期趋势</h3>
        <div className="space-y-2">
          {trend.map((item) => (
            <div key={item.date}>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{item.date}</span>
                <span>{item.count}</span>
              </div>
              <div className="h-2 bg-neutral rounded">
                <div
                  className="h-full bg-primary rounded"
                  style={{ width: `${Math.min(100, item.count * 10)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">易错标签 Top 5</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {tagStats.length ? (
              tagStats.map(([tag, count]) => (
                <li key={tag} className="flex justify-between">
                  <span>{tag || '未标记'}</span>
                  <span className="text-slate-500">{count} 次</span>
                </li>
              ))
            ) : (
              <li>暂无数据</li>
            )}
          </ul>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">学习会话记录</h3>
          <div className="text-sm text-slate-600 space-y-1 max-h-64 overflow-y-auto">
            {sessionStats.history.length ? (
              sessionStats.history
                .slice(-20)
                .reverse()
                .map((entry) => (
                  <div key={entry.ts} className="flex justify-between">
                    <span>{entry.mode}</span>
                    <span>评分 {entry.grade}</span>
                    <span className="text-slate-400">{dayjs(entry.ts).format('HH:mm:ss')}</span>
                  </div>
                ))
            ) : (
              <p>尚未开始当日会话。</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
