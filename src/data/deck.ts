import type { Card } from '@/types';
import { majorArcana } from './major-arcana';
import { minorArcana } from './minor-arcana';
import { fisherYatesShuffle } from '@/utils/random';

export const fullDeck: Card[] = [...majorArcana, ...minorArcana];

export function shuffledDeck(): Card[] {
  return fisherYatesShuffle([...fullDeck]);
}

export function getCardById(id: string): Card | undefined {
  return fullDeck.find((c) => c.id === id);
}
