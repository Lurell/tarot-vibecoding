import { useState } from 'react';
import type { Card, Orientation } from '@/types';
import { getCardImageUrl } from '@/utils/image-url';
import styles from './TarotCard.module.css';

interface CardFaceProps {
  card: Card;
  orientation: Orientation;
}

export function CardFace({ card, orientation }: CardFaceProps) {
  const [imgError, setImgError] = useState(false);
  const isReversed = orientation === 'reversed';

  return (
    <div className={styles.cardFront}>
      {imgError ? (
        <div className={styles.cardFallback}>
          <div className="text-2xl opacity-60">
            {card.arcana === 'major' ? '✧' : card.suit === 'wands' ? '🪄' : card.suit === 'cups' ? '🏆' : card.suit === 'swords' ? '⚔' : '🪙'}
          </div>
          <div className={styles.cardName}>{card.nameZh}</div>
        </div>
      ) : (
        <>
          <img
            src={getCardImageUrl(card.imageFile)}
            alt={card.nameZh}
            className={styles.cardImage}
            onError={() => setImgError(true)}
            loading="lazy"
          />
          <div className={styles.cardOverlay}>
            <span className={styles.cardOverlayName}>{card.nameZh}</span>
          </div>
        </>
      )}
      <div className={isReversed ? styles.cardOrientationReversed : styles.cardOrientation}>
        {isReversed ? '逆位' : '正位'}
      </div>
    </div>
  );
}
