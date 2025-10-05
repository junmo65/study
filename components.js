import { levenshtein } from './levenshtein.js';
import { ensureFocusWithin, el } from './util.js';
import { getCards } from './storage.js';

const PREPOSITIONS = ['of', 'to', 'for', 'with', 'in', 'on', 'at', 'by', 'from', 'about', 'into', 'over'];

function formatBack(card) {
  const blocks = [];
  if (card.def_zh) blocks.push(`中文：${card.def_zh}`);
  if (card.def_en) blocks.push(`English: ${card.def_en}`);
  if (card.coll_en?.length || card.coll_zh?.length) {
    blocks.push(`Collocations: ${(card.coll_en || []).concat(card.coll_zh || []).join('; ')}`);
  }
  if (card.ex_en || card.ex_zh) {
    blocks.push(`Example: ${card.ex_en || ''}\n${card.ex_zh || ''}`.trim());
  }
  if (card.usage_notes) blocks.push(`Usage: ${card.usage_notes}`);
  if (card.mnemonic) blocks.push(`Mnemonic: ${card.mnemonic}`);
  return blocks.join('\n\n');
}

function recognition(card) {
  const node = el('div', { className: 'learn-card recognition' }, [
    el('div', { className: 'prompt' }, `${card.word}${card.pos ? ` · ${card.pos}` : ''}`),
    el('div', { className: 'meta' }, [
      card.tags?.map((tag) => el('span', { className: 'badge' }, tag)) || null,
    ]),
    el('div', { className: 'flip' }, [
      el('pre', {}, formatBack(card))
    ])
  ]);
  return {
    element: node,
    reveal: () => node.classList.add('show-answer'),
    focus: () => {}
  };
}

function recall(card, prefs) {
  const input = el('input', { type: 'text', placeholder: 'Type the word…' });
  const hint = card.coll_zh?.slice(0, 2).join('; ');
  const node = el('div', { className: 'learn-card recall' }, [
    el('div', { className: 'prompt' }, card.def_zh || card.def_en || 'Recall the word'),
    hint ? el('div', { className: 'meta' }, `提示：${hint}`) : null,
    input,
    el('div', { className: 'flip' }, [
      el('pre', {}, formatBack(card))
    ])
  ]);
  return {
    element: node,
    reveal: () => node.classList.add('show-answer'),
    focus: () => input.focus(),
    evaluate: () => {
      const typed = input.value.trim();
      const expected = card.word.trim();
      if (!typed) return { correct: false, typed, expected };
      if (!prefs.typingStrict) {
        const distance = levenshtein(typed.toLowerCase(), expected.toLowerCase());
        return { correct: distance <= 1, typed, expected };
      }
      return { correct: typed.toLowerCase() === expected.toLowerCase(), typed, expected };
    }
  };
}

function collocation(card) {
  const pool = getCards();
  const choices = new Set();
  const available = (card.coll_en && card.coll_en.length ? card.coll_en : card.coll_zh) || [];
  const target = available[Math.floor(Math.random() * available.length)] || card.def_en || card.word;
  choices.add(target);
  const distractors = pool
    .filter((c) => c.id !== card.id)
    .flatMap((c) => c.coll_en || c.coll_zh || [])
    .filter(Boolean);
  while (choices.size < 4 && distractors.length) {
    const pick = distractors.splice(Math.floor(Math.random() * distractors.length), 1)[0];
    if (pick) choices.add(pick);
  }
  const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);
  const list = el('div', { className: 'options' },
    shuffled.map((item) => el('label', {}, [
      el('input', { type: 'radio', name: 'coll-option', value: item }),
      ' ', item
    ]))
  );
  const blanked = blankCollocation(target);
  const node = el('div', { className: 'learn-card collocation' }, [
    el('div', { className: 'prompt' }, blanked.prompt),
    list,
    el('div', { className: 'flip' }, [
      el('pre', {}, formatBack(card))
    ])
  ]);
  return {
    element: node,
    reveal: () => node.classList.add('show-answer'),
    focus: () => ensureFocusWithin(node),
    evaluate: () => {
      const selected = node.querySelector('input[name="coll-option"]:checked');
      const value = selected ? selected.value : '';
      return { correct: value === blanked.answer, typed: value, expected: blanked.answer };
    }
  };
}

function blankCollocation(text) {
  const words = text.split(/\s+/);
  let replacedIndex = words.length - 1;
  for (let i = 0; i < words.length; i++) {
    if (PREPOSITIONS.includes(words[i].toLowerCase())) {
      replacedIndex = i;
      break;
    }
  }
  const original = words[replacedIndex];
  words[replacedIndex] = '___';
  return { prompt: words.join(' '), answer: text, missing: original };
}

function cloze(card) {
  const sentence = card.ex_en || card.def_en || `${card.word} ...`;
  const tokens = sentence.split(/(\W+)/);
  const blanks = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (/^[a-zA-Z]{4,}$/.test(token)) {
      blanks.push({ index: i, word: token });
      tokens[i] = '____';
      if (blanks.length >= 2) break;
    }
  }
  if (!blanks.length) {
    blanks.push({ index: 0, word: card.word });
    tokens[0] = '____';
  }
  const inputs = blanks.map((blank, idx) => el('input', { type: 'text', 'data-index': idx }));
  const node = el('div', { className: 'learn-card cloze' }, [
    el('div', { className: 'prompt' }, tokens.join('')),
    el('div', { className: 'meta' }, inputs),
    el('div', { className: 'flip' }, [
      el('pre', {}, formatBack(card))
    ])
  ]);
  return {
    element: node,
    reveal: () => node.classList.add('show-answer'),
    focus: () => ensureFocusWithin(node),
    evaluate: () => {
      const typed = inputs.map((input) => input.value.trim());
      const expected = blanks.map((blank) => blank.word);
      const correct = typed.every((value, idx) => value && value.toLowerCase() === expected[idx].toLowerCase());
      return { correct, typed: typed.join(', '), expected: expected.join(', ') };
    }
  };
}

export function createQuestion({ mode, card, prefs }) {
  if (mode === 'recall') return recall(card, prefs);
  if (mode === 'collocation') return collocation(card, prefs);
  if (mode === 'cloze') return cloze(card, prefs);
  return recognition(card, prefs);
}
