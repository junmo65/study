import { FormEvent, RefObject, useEffect, useState } from 'react';
import type { Card } from '../types';
import { levenshtein } from '../utils/levenshtein';

interface RecallFormProps {
  card: Card;
  typingStrict: boolean;
  onResult: (result: { correct: boolean; answer: string; distance: number }) => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export default function RecallForm({ card, typingStrict, onResult, inputRef }: RecallFormProps) {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setInput('');
    setFeedback(null);
  }, [card.id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const answer = input.trim();
    const distance = levenshtein(answer, card.word);
    const correct = typingStrict ? answer.toLowerCase() === card.word.toLowerCase() : distance <= 1;
    setFeedback(correct ? '✓ 正确' : `✗ 正确答案：${card.word}`);
    onResult({ correct, answer, distance });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="recall-input">
          输入英文单词
        </label>
        <input
          id="recall-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-slate-300 rounded px-3 py-2"
          placeholder="Type the word"
          ref={inputRef}
        />
      </div>
      <button type="submit" className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent">
        提交
      </button>
      {feedback && <div className="text-sm text-slate-600">{feedback}</div>}
    </form>
  );
}
