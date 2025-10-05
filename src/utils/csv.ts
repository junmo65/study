import Papa, { ParseResult } from 'papaparse';
import { splitMulti } from './str';

export interface RawCardRow {
  Word?: string;
  POS?: string;
  'English Definition'?: string;
  '中文释义'?: string;
  'Collocations (EN)'?: string;
  '常用搭配(中文)'?: string;
  'Usage Notes'?: string;
  '记忆法/词根'?: string;
  'Example (EN)'?: string;
  '例句译文(中文)'?: string;
  Tags?: string;
  [key: string]: unknown;
}

const headerAliases: Record<string, keyof RawCardRow> = {
  word: 'Word',
  词汇: 'Word',
  pos: 'POS',
  词性: 'POS',
  englishdefinition: 'English Definition',
  english_definition: 'English Definition',
  英文释义: 'English Definition',
  中文释义: '中文释义',
  chinese_definition: '中文释义',
  collocationsen: 'Collocations (EN)',
  collocations: 'Collocations (EN)',
  'collocations (en)': 'Collocations (EN)',
  常用搭配: '常用搭配(中文)',
  usage: 'Usage Notes',
  'usage notes': 'Usage Notes',
  记忆法: '记忆法/词根',
  mnemonic: '记忆法/词根',
  example: 'Example (EN)',
  exampleen: 'Example (EN)',
  中文例句: '例句译文(中文)',
  tags: 'Tags'
};

const normalizeHeader = (header: string) => header.replace(/\s+/g, ' ').trim();

export const parseCSV = async (file: File): Promise<ParseResult<RawCardRow>> =>
  new Promise((resolve, reject) => {
    Papa.parse<RawCardRow>(file, {
      header: true,
      skipEmptyLines: 'greedy',
      dynamicTyping: false,
      transformHeader: (header) => {
        const normalized = normalizeHeader(header);
        const compact = normalized.toLowerCase().replace(/\s+/g, '');
        return headerAliases[compact] ?? (normalized as keyof RawCardRow);
      },
      complete: (result) => {
        resolve(result);
      },
      error: (err) => reject(err)
    });
  });

export interface ParsedCardRow {
  word: string;
  pos: string;
  def_en: string;
  def_zh: string;
  coll_en: string[];
  coll_zh: string[];
  usage_notes: string;
  mnemonic: string;
  ex_en: string;
  ex_zh: string;
  tags: string[];
  missing: string[];
}

const requiredFields: (keyof ParsedCardRow)[] = ['word', 'pos', 'def_en', 'def_zh'];

export const transformRow = (row: RawCardRow): ParsedCardRow => {
  const word = String(row['Word'] ?? '').trim();
  const pos = String(row['POS'] ?? '').trim();
  const def_en = String(row['English Definition'] ?? '').trim();
  const def_zh = String(row['中文释义'] ?? '').trim();
  const coll_en = splitMulti(String(row['Collocations (EN)'] ?? ''));
  const coll_zh = splitMulti(String(row['常用搭配(中文)'] ?? ''));
  const usage_notes = String(row['Usage Notes'] ?? '').trim();
  const mnemonic = String(row['记忆法/词根'] ?? '').trim();
  const ex_en = String(row['Example (EN)'] ?? '').trim();
  const ex_zh = String(row['例句译文(中文)'] ?? '').trim();
  const tags = splitMulti(String(row['Tags'] ?? ''));

  const parsed: ParsedCardRow = {
    word,
    pos,
    def_en,
    def_zh,
    coll_en,
    coll_zh,
    usage_notes,
    mnemonic,
    ex_en,
    ex_zh,
    tags,
    missing: []
  };

  parsed.missing = requiredFields.filter((key) => {
    const value = parsed[key];
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return !value;
  });

  return parsed;
};
