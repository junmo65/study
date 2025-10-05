import { useEffect, useState } from 'react';
import CardFace from '../components/CardFace';
import ClozeQuiz from '../components/ClozeQuiz';
import CollocationQuiz from '../components/CollocationQuiz';
import GradeBar from '../components/GradeBar';
import RecallForm from '../components/RecallForm';
import { useDeck } from '../store/useDeck';
import { usePrefs } from '../store/usePrefs';
import { StudyMode } from '../core/queue';

const modeLabel: Record<StudyMode, string> = {
  recognition: 'Recognition 识记',
  recall: 'Recall 回忆',
  collocation: 'Collocation 搭配',
  cloze: 'Cloze 完形'
};

const modeCycle: StudyMode[] = ['recall', 'collocation', 'cloze', 'recognition'];

const Learn = () => {
  const prefs = usePrefs((state) => state.prefs);
  const startSession = useDeck((state) => state.startSession);
  const submitGrade = useDeck((state) => state.submitGrade);
  const switchMode = useDeck((state) => state.switchMode);
  const markWeak = useDeck((state) => state.markWeak);
  const current = useDeck((state) => state.current);
  const currentCard = useDeck((state) => state.currentCard);
  const queue = useDeck((state) => state.queue);
  const cards = useDeck((state) => state.cards);
  const sessionStats = useDeck((state) => state.sessionStats);

  const [flipped, setFlipped] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [answerAttempt, setAnswerAttempt] = useState<string>('');

  useEffect(() => {
    if (!current && cards.length) {
      startSession(prefs);
    }
  }, [current, cards.length, startSession, prefs]);

  useEffect(() => {
    setFlipped(false);
    setFeedback(null);
    setAnswerAttempt('');
  }, [current?.cid]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (event.key === ' ') {
        event.preventDefault();
        setFlipped((value) => !value);
      }
      if (['1', '2', '3', '4', '5'].includes(event.key) && flipped) {
        event.preventDefault();
        void submitGrade(Number(event.key), prefs);
      }
      if (event.key.toLowerCase() === 'c') {
        event.preventDefault();
        if (current) {
          const index = modeCycle.indexOf(current.mode);
          const nextMode = modeCycle[(index + 1) % modeCycle.length];
          switchMode(nextMode);
        }
      }
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        void markWeak(current?.mode);
      }
      if (event.key === '/') {
        event.preventDefault();
        const activeId =
          current?.mode === 'recall'
            ? 'recall-input'
            : current?.mode === 'cloze'
            ? 'cloze-input'
            : undefined;
        if (activeId) {
          const input = document.getElementById(activeId) as HTMLInputElement | null;
          input?.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [flipped, submitGrade, prefs, current, switchMode, markWeak]);

  const handleGrade = (grade: number) => {
    void submitGrade(grade, prefs);
  };

  const handleResult = (correct: boolean, attempt?: string) => {
    setFeedback(correct ? '回答正确！' : '回答不正确，再巩固一次。');
    setFlipped(true);
    setAnswerAttempt(attempt ?? '');
  };

  if (!current || !currentCard) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">今日任务完成 🎉</h2>
        <button
          type="button"
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => startSession(prefs)}
        >
          重新生成今日队列
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">学习工作台</h2>
          <p className="text-sm text-slate-600">模式：{modeLabel[current.mode]}</p>
          <p className="text-xs text-slate-500">剩余队列：{queue.length}</p>
        </div>
        <div className="text-sm text-slate-600">
          今日正确率：
          {sessionStats.total ? ((sessionStats.correct / sessionStats.total) * 100).toFixed(0) : '—'}%
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-2 border rounded"
            onClick={() => setFlipped((value) => !value)}
          >
            翻面 (Space)
          </button>
          <button
            type="button"
            className="px-3 py-2 border rounded"
            onClick={() => {
              const index = modeCycle.indexOf(current.mode);
              const nextMode = modeCycle[(index + 1) % modeCycle.length];
              switchMode(nextMode);
            }}
          >
            切换题型 (C)
          </button>
          <button
            type="button"
            className="px-3 py-2 border rounded"
            onClick={() => void markWeak(current.mode)}
          >
            标记易混 (F)
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          {current.mode === 'recognition' && <CardFace card={currentCard} showBack={flipped} />}
          {current.mode === 'recall' && (
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-6">
                <div className="text-lg font-semibold text-slate-700">{currentCard.def_zh}</div>
                {currentCard.coll_zh.length > 0 && (
                  <div className="mt-2 text-sm text-slate-600">搭配提示：{currentCard.coll_zh.join(', ')}</div>
                )}
              </div>
              <RecallForm
                card={currentCard}
                typingStrict={prefs.typingStrict}
                onResult={(correct, attempt) => handleResult(correct, attempt)}
              />
            </div>
          )}
          {current.mode === 'collocation' && (
            <CollocationQuiz
              card={currentCard}
              peers={cards.filter((item) => item.id !== currentCard.id)}
              onResult={(correct) => handleResult(correct)}
            />
          )}
          {current.mode === 'cloze' && (
            <ClozeQuiz
              card={currentCard}
              density={prefs.clozeDensity}
              onResult={(correct, attempt) => handleResult(correct, attempt)}
            />
          )}
        </div>
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">卡片详情</h3>
            <CardFace card={currentCard} showBack={flipped} />
          </div>
          <div className="bg-white border rounded-lg p-4 text-sm text-slate-600">
            <p>快捷键：Space 翻面/提交；数字 1-5 评分；C 切换题型；F 标记易混；/ 聚焦输入。</p>
            {feedback && <p className="mt-2 font-semibold">{feedback}</p>}
            {answerAttempt && <p className="mt-1">你的输入：{answerAttempt}</p>}
          </div>
          {flipped && <GradeBar onGrade={handleGrade} />}
        </div>
      </div>
    </div>
  );
};

export default Learn;
