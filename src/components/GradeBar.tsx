interface GradeBarProps {
  onGrade: (grade: 0 | 1 | 2 | 3 | 4 | 5) => void;
  disabled?: boolean;
}

const labels = {
  1: '完全不会',
  2: '勉强',
  3: '想一想',
  4: '熟悉',
  5: '非常熟'
};

export default function GradeBar({ onGrade, disabled }: GradeBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((grade) => (
        <button
          key={grade}
          disabled={disabled}
          onClick={() => onGrade(grade as 1 | 2 | 3 | 4 | 5)}
          className="px-3 py-1 border border-slate-400 rounded bg-white hover:border-accent disabled:opacity-50"
        >
          {grade} - {(labels as any)[grade]}
        </button>
      ))}
    </div>
  );
}
