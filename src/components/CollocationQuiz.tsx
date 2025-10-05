import { useMemo, useState } from 'react';
import { Card } from '../store/db';

interface Props {
  card: Card;
  peers: Card[];
  onResult: (correct: boolean) => void;
}

const CollocationQuiz = ({ card, peers, onResult }: Props) => {
  const [selection, setSelection] = useState<string[]>([]);

  const { options, answer } = useMemo(() => {
    const base = new Set(card.coll_en);
    const distractors: string[] = [];
    const related = peers.filter((peer) => peer.tags.some((tag) => card.tags.includes(tag)));
    for (const peer of related) {
      for (const coll of peer.coll_en) {
        if (!base.has(coll)) {
          distractors.push(coll);
        }
      }
    }
    while (distractors.length < Math.max(3, card.coll_en.length)) {
      const peer = peers[Math.floor(Math.random() * peers.length)];
      if (!peer) break;
      const coll = peer.coll_en[Math.floor(Math.random() * peer.coll_en.length)];
      if (coll && !base.has(coll)) distractors.push(coll);
    }
    const combined = [...card.coll_en, ...distractors.slice(0, 4)];
    const shuffled = combined
      .filter((item) => !!item)
      .sort(() => Math.random() - 0.5);
    return { options: shuffled, answer: new Set(card.coll_en) };
  }, [card, peers]);

  if (!card.coll_en.length) {
    return <p className="text-sm text-slate-600">该词暂无搭配记录，按 Space 翻面继续。</p>;
  }

  const toggle = (value: string) => {
    setSelection((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const check = () => {
    const chosen = new Set(selection);
    const correct = answer.size === selection.length && [...answer].every((item) => chosen.has(item));
    onResult(correct);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">选择该词的英文搭配（可多选）。</p>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`text-left border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              selection.includes(option) ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={check}
        className="px-4 py-2 rounded bg-primary text-white font-semibold"
      >
        提交选择
      </button>
    </div>
  );
};

export default CollocationQuiz;
