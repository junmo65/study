import { FormEvent, useEffect, useRef, useState } from 'react';
import { Card } from '../store/db';
import { levenshtein } from '../utils/levenshtein';
import { normalizeWord } from '../utils/str';

interface Props {
  card: Card;
  typingStrict: boolean;
  onResult: (correct: boolean, attempt: string) => void;
}

const RecallForm = ({ card, typingStrict, onResult }: Props) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue('');
    inputRef.current?.focus();
  }, [card.id]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const expected = normalizeWord(card.word);
    const answer = normalizeWord(value);
    let correct: boolean;
    if (typingStrict) {
      correct = expected === answer;
    } else {
      correct = expected === answer || levenshtein(expected, answer) <= 1;
    }
    onResult(correct, value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm text-slate-600" htmlFor="recall-input">
        输入英文单词 / Type the word
      </label>
      <input
        id="recall-input"
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        autoComplete="off"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-primary text-white font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
      >
        提交 / Submit
      </button>
    </form>
  );
};

export default RecallForm;
