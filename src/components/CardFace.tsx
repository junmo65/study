import { Card } from '../store/db';

interface Props {
  card: Card;
  showBack: boolean;
}

const Section = ({ title, content }: { title: string; content?: string | string[] }) => {
  if (!content || (Array.isArray(content) && content.length === 0)) return null;
  const text = Array.isArray(content) ? content.join(', ') : content;
  return (
    <div className="mt-2 text-sm">
      <div className="font-semibold text-slate-600">{title}</div>
      <div className="whitespace-pre-wrap leading-relaxed">{text}</div>
    </div>
  );
};

const CardFace = ({ card, showBack }: Props) => {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm min-h-[320px] flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-2xl font-bold">{card.word}</div>
          <div className="uppercase text-sm text-slate-500">{card.pos}</div>
        </div>
        <div className="text-xs text-slate-400">Tags: {card.tags.join(', ') || '—'}</div>
      </div>
      {!showBack ? (
        <div className="mt-6 text-lg leading-relaxed">
          {card.def_en || card.def_zh || 'Flip to review details.'}
        </div>
      ) : (
        <div className="mt-4 text-base">
          <Section title="中文释义" content={card.def_zh} />
          <Section title="English Definition" content={card.def_en} />
          <Section title="Collocations" content={card.coll_en} />
          <Section title="常用搭配" content={card.coll_zh} />
          <Section title="Usage Notes" content={card.usage_notes} />
          <Section title="Mnemonic" content={card.mnemonic} />
          <Section title="Example" content={card.ex_en} />
          <Section title="例句译文" content={card.ex_zh} />
        </div>
      )}
    </div>
  );
};

export default CardFace;
