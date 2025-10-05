import { FormEvent, useMemo, useState } from 'react';
import { Card } from '../store/db';

interface Props {
  card: Card;
  density: 'low' | 'mid' | 'high';
  onResult: (correct: boolean, attempt: string) => void;
}

const densityMap = {
  low: 1,
  mid: 2,
  high: 3
};

const ClozeQuiz = ({ card, density, onResult }: Props) => {
  const [answer, setAnswer] = useState('');

  const { masked, blanks } = useMemo(() => {
    const text = card.ex_en || `${card.word} ${card.def_en}`;
    const words = text.split(/(\s+)/);
    const keywords = card.coll_en.flatMap((coll) => coll.split(' '));
    const chosen: string[] = [];
    const limit = Math.min(densityMap[density], words.length);
    for (const keyword of keywords) {
      if (chosen.length >= limit) break;
      if (keyword.length > 2 && !chosen.includes(keyword)) {
        chosen.push(keyword);
      }
    }
    if (!chosen.length && card.word) {
      chosen.push(card.word);
    }
    const blanks = chosen.map((word) => word.toLowerCase());
    const masked = words
      .map((segment) => {
        const lower = segment.toLowerCase();
        if (blanks.some((blank) => lower.includes(blank))) {
          return segment.replace(/\w+/g, '____');
        }
        return segment;
      })
      .join('');
    return { masked, blanks };
  }, [card, density]);

  if (!blanks.length) {
    return <p className="text-sm text-slate-600">该词暂无法生成完形题目，请切换题型。</p>;
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const guess = answer.trim().toLowerCase();
    const correct = blanks.every((blank) => guess.includes(blank));
    onResult(correct, answer);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <p className="text-sm text-slate-600">补全英文例句中的缺失部分：</p>
      <div className="border rounded px-3 py-3 bg-white whitespace-pre-wrap leading-relaxed">{masked}</div>
      <label className="block text-sm text-slate-600" htmlFor="cloze-input">
        输入包含缺失单词的短语
      </label>
      <input
        id="cloze-input"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
        提交
      </button>
    </form>
  );
};

export default ClozeQuiz;
