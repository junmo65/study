import dayjs from 'dayjs';

export const today = () => dayjs().startOf('day');
export const toISODate = (d: dayjs.Dayjs) => d.toISOString();
export const fromISO = (iso: string | undefined | null) => (iso ? dayjs(iso) : dayjs.invalid('missing'));
export const daysBetween = (from: string | undefined, to: dayjs.Dayjs = dayjs()) => {
  if (!from) return Infinity;
  const start = dayjs(from);
  if (!start.isValid()) return Infinity;
  return to.diff(start, 'day');
};
