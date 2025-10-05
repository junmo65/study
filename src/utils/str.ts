export function normalizeHeader(header: string) {
  return header
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

export function splitMulti(input: string | string[] | undefined): string[] {
  if (!input) return [];
  const raw = Array.isArray(input) ? input.join(';') : input;
  return raw
    .split(/[;；、|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function smartIncludes(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function compareInsensitive(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
}
