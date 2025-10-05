import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { Card } from '../types';

interface ClozeQuizProps {
  card: Card;
  density: 'low' | 'mid' | 'high';
  onResult: (result: { correct: boolean; answers: string[] }) => void;
}

interface Blank {
  index: number;
  word: string;
}

function selectBlanks(card: Card, density: 'low' | 'mid' | 'high'): Blank[] {
  const words = card.ex_en.split(/\s+/);
  const targetCount = density === 'low' ? 1 : density === 'mid' ? 2 : 3;
  const focus = card.coll_en.map((c) => c.split(' ')[0].toLowerCase());
  const blanks: Blank[] = [];
  words.forEach((word, index) => {
    const normalized = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (!normalized) return;
    if (focus.includes(normalized) && blanks.length < targetCount) {
      blanks.push({ index, word });
    }
  });
  let i = 0;
  while (blanks.length < targetCount && i < words.length) {
    const normalized = words[i].replace(/[^a-zA-Z]/g, '');
    if (normalized.length > 3) {
      blanks.push({ index: i, word: words[i] });
    }
    i += 1;
  }
  return blanks.slice(0, targetCount);
}

export default function ClozeQuiz({ card, density, onResult }: ClozeQuizProps) {
  const blanks = useMemo(() => selectBlanks(card, density), [card, density]);
  const [answers, setAnswers] = useState<string[]>(Array(blanks.length).fill(''));

  useEffect(() => {
    setAnswers(Array(blanks.length).fill(''));
  }, [card.id, blanks.length]);

  if (!card.ex_en) {
    return <p className="text-sm text-slate-600">该卡片暂无例句。</p>;
  }

  const masked = card.ex_en.split(/\s+/).map((word, idx) => {
    const blankIdx = blanks.findIndex((b) => b.index === idx);
    if (blankIdx === -1) return word;
    return `_____${blankIdx + 1}`;
  });

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const correct = answers.every((answer, index) => {
      const expected = blanks[index].word.replace(/[^a-zA-Z]/g, '').toLowerCase();
      return answer.trim().toLowerCase() === expected;
    });
    onResult({ correct, answers });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm">填空例句：</p>
      <p className="p-3 border border-slate-300 rounded bg-white">{masked.join(' ')}</p>
      {blanks.map((blank, index) => (
        <div key={blank.index} className="flex items-center gap-2">
          <label className="text-sm">空 {index + 1}</label>
          <input
            value={answers[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            className="flex-1 border border-slate-300 rounded px-3 py-2"
            placeholder={blank.word}
          />
        </div>
      ))}
      <button type="submit" className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent">
        提交
      </button>
    </form>
  );
}
