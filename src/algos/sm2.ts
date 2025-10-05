import dayjs from 'dayjs';

export interface SM2State {
  ef: number;
  reps: number;
  interval: number;
  lapses: number;
  due?: string;
  lastGrade?: 0 | 1 | 2 | 3 | 4 | 5;
}

export function sm2Update(
  state: SM2State,
  grade: 0 | 1 | 2 | 3 | 4 | 5,
  today = dayjs()
) {
  let { ef = 2.5, reps = 0, interval = 0, lapses = 0, due, lastGrade } = state;

  if (due && interval > 0) {
    const overdueDays = today.diff(dayjs(due), 'day');
    if (overdueDays > interval * 2) {
      grade = Math.min(grade, 2);
    }
  }

  if (grade < 3) {
    reps = 0;
    interval = 1;
    lapses += 1;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.round(interval * ef);

    ef = ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (grade === 5 && lastGrade === 5) {
      ef = Math.min(3.0, ef + 0.05);
    }
    ef = Math.max(1.3, Math.min(3.0, ef));
  }

  const nextDue = today.add(interval, 'day').toISOString();

  return {
    ef,
    reps,
    interval,
    lapses,
    due: nextDue,
    lastGrade: grade as const
  };
}
