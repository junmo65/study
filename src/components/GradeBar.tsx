interface Props {
  onGrade: (grade: number) => void;
}

const labels: Record<number, string> = {
  1: '1 再记忆',
  2: '2 困难',
  3: '3 勉强',
  4: '4 良好',
  5: '5 完美'
};

const GradeBar = ({ onGrade }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {([1, 2, 3, 4, 5] as const).map((grade) => (
        <button
          key={grade}
          type="button"
          onClick={() => onGrade(grade)}
          className="flex-1 min-w-[80px] border rounded px-3 py-2 bg-white hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {labels[grade]}
        </button>
      ))}
    </div>
  );
};

export default GradeBar;
