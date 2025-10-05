import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { Card } from '../types';

interface Option {
  value: string;
  correct: boolean;
}

interface CollocationQuizProps {
  card: Card;
  pool: Card[];
  onResult: (result: { correct: boolean; selected: string[] }) => void;
}

function pickDistractors(card: Card, pool: Card[], count: number): string[] {
  const candidates = pool
    .filter((c) => c.id !== card.id && c.tags.some((tag) => card.tags.includes(tag)))
    .flatMap((c) => c.coll_en);
  const shuffled = [...new Set(candidates)].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function CollocationQuiz({ card, pool, onResult }: CollocationQuizProps) {
  const options = useMemo<Option[]>(() => {
    const distractors = pickDistractors(card, pool, Math.max(2, card.coll_en.length));
    const combined = [...card.coll_en.map((c) => ({ value: c, correct: true })), ...distractors.map((d) => ({ value: d, correct: false }))];
    return combined
      .filter((opt) => opt.value)
      .sort((a, b) => a.value.localeCompare(b.value));
  }, [card, pool]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [card.id]);
  const handleToggle = (value: string) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const correctValues = options.filter((opt) => opt.correct).map((opt) => opt.value);
    const correct =
      selected.length === correctValues.length &&
      selected.every((value) => correctValues.some((cv) => cv === value));
    onResult({ correct, selected });
  };

  if (options.length === 0) {
    return <p className="text-sm text-slate-600">暂无搭配，跳过此题型。</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm">选择该词的常见英文搭配：</p>
      <div className="grid gap-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 border border-slate-300 rounded px-3 py-2">
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => handleToggle(option.value)}
            />
            <span>{option.value}</span>
          </label>
        ))}
      </div>
      <button type="submit" className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent">
        提交
      </button>
    </form>
  );
}
