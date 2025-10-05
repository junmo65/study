import dayjs from 'dayjs';

export function todayISO() {
  return dayjs().startOf('day').toISOString();
}

export function isOverdue(due: string) {
  return dayjs().isAfter(dayjs(due));
}

export function diffInDays(from: string, to: string) {
  return dayjs(to).diff(dayjs(from), 'day');
}

export function addMinutes(date: string | number, mins: number) {
  return dayjs(date).add(mins, 'minute').valueOf();
}

export function addDaysISO(date: string, days: number) {
  return dayjs(date).add(days, 'day').toISOString();
}
