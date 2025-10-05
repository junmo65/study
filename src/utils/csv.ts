import Papa from 'papaparse';
import type { Card } from '../types';
import { normalizeHeader, splitMulti } from './str';
import { newId } from './id';

const aliases: Record<string, keyof Card> = {
  word: 'word',
  'pos': 'pos',
  'part of speech': 'pos',
  'english definition': 'def_en',
  'definition en': 'def_en',
  '中文释义': 'def_zh',
  '中文 释义': 'def_zh',
  'chinese definition': 'def_zh',
  'collocations (en)': 'coll_en',
  'collocations': 'coll_en',
  '常用搭配(中文)': 'coll_zh',
  '常用搭配': 'coll_zh',
  'collocations (zh)': 'coll_zh',
  'usage notes': 'usage_notes',
  '记忆法/词根': 'mnemonic',
  'mnemonic': 'mnemonic',
  'example (en)': 'ex_en',
  'example en': 'ex_en',
  '例句译文(中文)': 'ex_zh',
  '例句译文': 'ex_zh',
  'tags': 'tags'
};

export interface ParsedCardResult {
  preview: Card[];
  all: Card[];
  warnings: string[];
}

function mapRow(row: Record<string, string>): Card {
  const card: Card = {
    id: newId(),
    word: '',
    pos: '',
    def_en: '',
    def_zh: '',
    coll_en: [],
    coll_zh: [],
    usage_notes: '',
    mnemonic: '',
    ex_en: '',
    ex_zh: '',
    tags: []
  };

  Object.entries(row).forEach(([rawKey, value]) => {
    const key = normalizeHeader(rawKey);
    const mapped = aliases[key];
    if (!mapped) return;
    const val = (value ?? '').trim();
    if (mapped === 'coll_en' || mapped === 'coll_zh' || mapped === 'tags') {
      (card[mapped] as string[]) = splitMulti(val);
    } else {
      (card as any)[mapped] = val;
    }
  });
  return card;
}

export function parseCsv(text: string): ParsedCardResult {
  const warnings: string[] = [];
  const { data } = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: normalizeHeader,
    delimiter: ''
  });
  const cards = data
    .filter((row) => Object.values(row).some((value) => value && value.trim().length > 0))
    .map((row) => mapRow(row));

  cards.forEach((card) => {
    if (!card.word || !card.pos) {
      warnings.push(`Card ${card.word || card.id} is missing Word or POS.`);
    }
    if (!card.def_en || !card.def_zh) {
      warnings.push(`Card ${card.word || card.id} missing definition.`);
    }
  });

  return {
    preview: cards.slice(0, 20),
    all: cards,
    warnings
  };
}
