const HEADER_ALIASES = {
  word: ['word', '单词', '词汇'],
  pos: ['pos', 'part of speech', '词性'],
  def_en: ['english definition', 'definition', '释义(en)'],
  def_zh: ['中文释义', '释义', '释义(zh)'],
  coll_en: ['collocations (en)', 'collocation en', '搭配', '搭配(en)'],
  coll_zh: ['常用搭配(中文)', 'collocations zh', '搭配(中文)'],
  usage_notes: ['usage notes', 'usage', '用法'],
  mnemonic: ['mnemonic', '记忆法/词根', '记忆法'],
  ex_en: ['example (en)', 'example', '例句', '例句(en)'],
  ex_zh: ['例句译文(中文)', 'example zh', '例句(中文)'],
  tags: ['tags', '标签']
};

const REQUIRED_HEADERS = ['word', 'def_en', 'def_zh'];

function normalizeHeader(name = '') {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+|_|\-|（|）|\(|\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectHeaderKey(header) {
  const normalized = normalizeHeader(header);
  for (const [key, aliases] of Object.entries(HEADER_ALIASES)) {
    if (aliases.some((alias) => normalizeHeader(alias) === normalized)) {
      return key;
    }
  }
  return normalized;
}

function detectDelimiter(lines) {
  let commaCount = 0;
  let tabCount = 0;
  for (const line of lines) {
    commaCount += (line.match(/,/g) || []).length;
    tabCount += (line.match(/\t/g) || []).length;
  }
  return tabCount > commaCount ? '\t' : ',';
}

function stripBOM(text = '') {
  if (text.charCodeAt(0) === 0xfeff) {
    return text.slice(1);
  }
  return text;
}

function parseLine(line, delimiter) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function parseCSV(text) {
  const clean = stripBOM(text);
  const lines = clean.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (!lines.length) return { headers: [], rows: [] };
  const delimiter = detectDelimiter(lines.slice(0, 5));
  const headerCells = parseLine(lines[0], delimiter).map((cell) => detectHeaderKey(cell));
  const rows = lines.slice(1).map((line) => parseLine(line, delimiter));
  return { headers: headerCells, rows, delimiter };
}

export function rowsToCards(parsed) {
  const { headers, rows } = parsed;
  const cards = [];
  for (const cells of rows) {
    const record = {};
    headers.forEach((header, idx) => {
      record[header] = cells[idx] ? cells[idx].trim() : '';
    });
    const word = record.word || record[''] || '';
    if (!word) continue;
    cards.push({
      id: uniqueId(),
      word,
      pos: record.pos || '',
      def_en: record.def_en || '',
      def_zh: record.def_zh || '',
      coll_en: splitList(record.coll_en),
      coll_zh: splitList(record.coll_zh),
      usage_notes: record.usage_notes || '',
      mnemonic: record.mnemonic || '',
      ex_en: record.ex_en || '',
      ex_zh: record.ex_zh || '',
      tags: splitList(record.tags),
    });
  }
  return cards;
}

function splitList(raw = '') {
  if (!raw) return [];
  return raw
    .split(/[;；|]/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function uniqueId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `card-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function missingHeaders(headers) {
  return REQUIRED_HEADERS.filter((key) => !headers.includes(key));
}

export function previewRows(parsed, limit = 20) {
  const { headers, rows } = parsed;
  return rows.slice(0, limit).map((cells) => {
    const entry = {};
    headers.forEach((header, idx) => {
      entry[header] = cells[idx];
    });
    return entry;
  });
}
