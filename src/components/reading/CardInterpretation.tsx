import { useState } from 'react';
import { SUIT_INFO } from '@/constants/theme';
import { getCardImageUrl } from '@/utils/image-url';
import type { DrawnCard } from '@/types';

interface CardInterpretationProps {
  drawnCard: DrawnCard;
}

export function CardInterpretation({ drawnCard }: CardInterpretationProps) {
  const { card, orientation, position } = drawnCard;
  const isReversed = orientation === 'reversed';
  const keywords = isReversed ? card.keywordsReversed : card.keywordsUpright;
  const suitInfo = card.suit ? SUIT_INFO[card.suit] : null;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-mystic-surface rounded-xl p-5 border border-mystic-primary/10 space-y-3">
      {/* Position label */}
      <div className="text-xs text-mystic-primary-light font-medium">{position.name}</div>

      {/* Card image */}
      {!imgError && (
        <div className={`w-full rounded-lg overflow-hidden ${isReversed ? 'rotate-180' : ''}`}>
          <img
            src={getCardImageUrl(card.imageFile)}
            alt={card.nameZh}
            className="w-full h-auto"
            style={{ aspectRatio: '5/7' }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      )}

      {/* Card name */}
      <div>
        <h3 className="text-lg font-display font-bold text-mystic-text">{card.nameZh}</h3>
        <p className="text-xs text-mystic-muted">{card.nameEn}</p>
      </div>

      {/* Orientation badge */}
      <div className={`inline-block text-xs px-2 py-0.5 rounded-full ${
        isReversed ? 'bg-mystic-muted/20 text-mystic-muted' : 'bg-mystic-accent/20 text-mystic-accent'
      }`}>
        {isReversed ? '逆位 ↓' : '正位 ↑'}
      </div>

      {/* Suit/element info */}
      {suitInfo && (
        <div className="text-xs text-mystic-muted">
          {suitInfo.nameZh} · {suitInfo.element}
        </div>
      )}

      {/* Keywords */}
      <div className="flex flex-wrap gap-1">
        {keywords.map((kw) => (
          <span
            key={kw}
            className="text-xs px-2 py-0.5 rounded-full bg-mystic-bg text-mystic-text/80"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-mystic-muted leading-relaxed">{card.descriptionZh}</p>
    </div>
  );
}
