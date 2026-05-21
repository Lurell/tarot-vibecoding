import { useState, useEffect } from 'react';
import type { Card, Orientation } from '@/types';
import { CardBack } from './CardBack';
import { CardFace } from './CardFace';
import styles from './TarotCard.module.css';

interface TarotCardProps {
  card: Card;
  orientation?: Orientation;
  isRevealed?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export function TarotCard({
  card,
  orientation = 'upright',
  isRevealed = true,
  isSelected = false,
  onClick,
}: TarotCardProps) {
  const [flipped, setFlipped] = useState(isRevealed);

  useEffect(() => {
    if (isRevealed) {
      setFlipped(true);
    }
  }, [isRevealed]);

  const handleClick = () => {
    if (!isRevealed) {
      setFlipped(true);
    }
    onClick?.();
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
      onClick={handleClick}
    >
      <div className={`${styles.cardInner} ${flipped ? styles.flipped : ''}`}>
        <div className={styles.cardBack}>
          <CardBack />
        </div>
        <CardFace card={card} orientation={orientation} />
      </div>
    </div>
  );
}
