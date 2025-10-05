import type { Card } from '../types';

interface CardFaceProps {
  card: Card;
  reveal: boolean;
  showPos: boolean;
  onTogglePos: () => void;
}

export default function CardFace({ card, reveal, showPos, onTogglePos }: CardFaceProps) {
  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{card.word}</h2>
          {showPos ? (
            <button
              className="text-xs text-accent underline"
              onClick={onTogglePos}
            >
              {card.pos}
            </button>
          ) : (
            <button className="text-xs text-accent underline" onClick={onTogglePos}>
              显示词性
            </button>
          )}
        </div>
        <div className="text-xs text-slate-500 flex flex-col items-end">
          <span>Tags: {card.tags.join(', ') || '无'}</span>
        </div>
      </div>
      {reveal ? (
        <div className="space-y-2 text-sm leading-relaxed">
          <section>
            <h3 className="font-semibold">中文释义</h3>
            <p>{card.def_zh || '—'}</p>
          </section>
          <section>
            <h3 className="font-semibold">English Definition</h3>
            <p>{card.def_en || '—'}</p>
          </section>
          {(card.coll_en.length > 0 || card.coll_zh.length > 0) && (
            <section>
              <h3 className="font-semibold">Collocations</h3>
              <p>EN: {card.coll_en.join('; ') || '—'}</p>
              <p>ZH: {card.coll_zh.join('; ') || '—'}</p>
            </section>
          )}
          {(card.ex_en || card.ex_zh) && (
            <section>
              <h3 className="font-semibold">Example</h3>
              <p>{card.ex_en || '—'}</p>
              <p className="text-slate-600">{card.ex_zh || '—'}</p>
            </section>
          )}
          {card.usage_notes && (
            <section>
              <h3 className="font-semibold">Usage Notes</h3>
              <p>{card.usage_notes}</p>
            </section>
          )}
          {card.mnemonic && (
            <section>
              <h3 className="font-semibold">Mnemonic</h3>
              <p>{card.mnemonic}</p>
            </section>
          )}
        </div>
      ) : (
        <div className="text-sm text-slate-500">
          <p>点击翻面或按空格查看释义。</p>
        </div>
      )}
    </div>
  );
}
