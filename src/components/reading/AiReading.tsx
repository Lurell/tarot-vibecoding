import type { AIReading } from '@/types';

interface AiReadingProps {
  reading: AIReading;
}

export function AiReading({ reading }: AiReadingProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-display font-bold text-mystic-accent mb-3">整体概述</h3>
        <p className="text-mystic-text leading-relaxed whitespace-pre-wrap">{reading.overview}</p>
      </section>

      {reading.cardInterpretations && (
        <section>
          <h3 className="text-lg font-display font-bold text-mystic-accent mb-3">逐牌解读</h3>
          <p className="text-mystic-text leading-relaxed whitespace-pre-wrap">
            {reading.cardInterpretations}
          </p>
        </section>
      )}

      {reading.advice && (
        <section>
          <h3 className="text-lg font-display font-bold text-mystic-accent mb-3">综合建议</h3>
          <p className="text-mystic-text leading-relaxed whitespace-pre-wrap">{reading.advice}</p>
        </section>
      )}
    </div>
  );
}
