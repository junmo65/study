import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CardFace from '../components/CardFace';
import RecallForm from '../components/RecallForm';
import CollocationQuiz from '../components/CollocationQuiz';
import ClozeQuiz from '../components/ClozeQuiz';
import GradeBar from '../components/GradeBar';
import { useDeck } from '../store/useDeck';
import { usePrefs } from '../store/usePrefs';
import type { StudyMode } from '../types';

const modes: StudyMode[] = ['recognition', 'recall', 'collocation', 'cloze'];

export default function Learn() {
  const { current, queue, cards, grade, markWeak } = useDeck((state) => ({
    current: state.current,
    queue: state.queue,
    cards: state.cards,
    grade: state.grade,
    markWeak: state.markWeak
  }));
  const { prefs } = usePrefs();
  const [revealed, setRevealed] = useState(false);
  const [showPos, setShowPos] = useState(false);
  const [activeMode, setActiveMode] = useState<StudyMode>('recognition');
  const [interactionLocked, setInteractionLocked] = useState(false);
  const recallInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (current) {
      setActiveMode(current.mode);
      setRevealed(false);
      setShowPos(false);
      setInteractionLocked(false);
      if (current.mode === 'recall') {
        setTimeout(() => recallInputRef.current?.focus(), 50);
      }
    }
  }, [current]);

  const handleGrade = async (value: 0 | 1 | 2 | 3 | 4 | 5) => {
    setInteractionLocked(true);
    await grade(value);
  };

  const handleToggleMode = useCallback(() => {
    setActiveMode((prev) => {
      const idx = modes.indexOf(prev);
      const next = modes[(idx + 1) % modes.length];
      return next;
    });
    setRevealed(false);
    setShowPos(false);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!current) return;
      if (event.key === ' ') {
        event.preventDefault();
        setRevealed((prev) => !prev);
      }
      if (/^[1-5]$/.test(event.key)) {
        event.preventDefault();
        handleGrade(parseInt(event.key, 10) as 1 | 2 | 3 | 4 | 5);
      }
      if (event.key.toLowerCase() === 'c') {
        event.preventDefault();
        handleToggleMode();
      }
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        markWeak();
      }
      if (event.key === '/') {
        event.preventDefault();
        recallInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, handleToggleMode, markWeak]);

  const queueInfo = useMemo(() => {
    if (!queue) return { due: 0, fresh: 0, session: 0 };
    return {
      due: queue.due.length,
      fresh: queue.fresh.length,
      session: queue.session.length
    };
  }, [queue]);

  if (!current) {
    return (
      <div className="space-y-4">
        <p>今日任务完成！如果刚导入，请前往 Import 页面加载卡片。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap gap-4 text-xs text-slate-600">
        <span>今日队列：到期 {queueInfo.due} | 新卡 {queueInfo.fresh} | 回炉 {queueInfo.session}</span>
        <span>当前题型：{activeMode}</span>
        <span>快捷键：Space 翻面 / 1-5 评分 / C 切题型 / F 标记 / / 聚焦输入</span>
      </section>

      {activeMode === 'recognition' && (
        <CardFace
          card={current.card}
          reveal={revealed}
          showPos={showPos}
          onTogglePos={() => setShowPos((prev) => !prev)}
        />
      )}

      {activeMode === 'recall' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-300 rounded p-4 space-y-2">
            <h2 className="font-semibold">中文释义</h2>
            <p>{current.card.def_zh || '—'}</p>
            {current.card.coll_zh.length > 0 && (
              <p className="text-sm text-slate-600">常用搭配：{current.card.coll_zh.slice(0, 2).join('；')}</p>
            )}
          </div>
          <RecallForm
            card={current.card}
            typingStrict={prefs.typingStrict}
            onResult={() => {
              setRevealed(true);
              setInteractionLocked(false);
            }}
            inputRef={recallInputRef}
          />
        </div>
      )}

      {activeMode === 'collocation' && (
        <CollocationQuiz
          card={current.card}
          pool={cards}
          onResult={(result) => {
            setInteractionLocked(false);
            setRevealed(true);
            if (!result.correct) {
              markWeak();
            }
          }}
        />
      )}

      {activeMode === 'cloze' && (
        <ClozeQuiz
          card={current.card}
          density={prefs.clozeDensity}
          onResult={(result) => {
            setInteractionLocked(false);
            setRevealed(true);
            if (!result.correct) {
              markWeak();
            }
          }}
        />
      )}

      {revealed && (
        <div className="space-y-3">
          <h3 className="font-semibold">评分</h3>
          <GradeBar onGrade={handleGrade} disabled={interactionLocked} />
        </div>
      )}

      {revealed && activeMode !== 'recognition' && (
        <CardFace
          card={current.card}
          reveal={true}
          showPos={showPos}
          onTogglePos={() => setShowPos((prev) => !prev)}
        />
      )}
    </div>
  );
}
