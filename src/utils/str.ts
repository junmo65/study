const SPLIT_REGEX = /[;；、|]/;

export const splitMulti = (value: string | undefined | null): string[] => {
  if (!value) return [];
  return value
    .split(SPLIT_REGEX)
    .map((item) => item.trim())
    .filter(Boolean);
};

export const normalizeWord = (word: string) => word.trim().toLowerCase();
