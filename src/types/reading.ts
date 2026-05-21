import type { Card, Orientation } from './card';
import type { SpreadPosition, SpreadConfig } from './spread';

export interface DrawnCard {
  card: Card;
  orientation: Orientation;
  position: SpreadPosition;
  drawOrder: number;
}

export interface AIReading {
  overview: string;
  cardInterpretations: string;
  advice: string;
}

export type ReadingPhase =
  | 'idle'
  | 'selecting-spread'
  | 'shuffling'
  | 'drawing'
  | 'revealing'
  | 'generating'
  | 'complete';

export interface ReadingState {
  phase: ReadingPhase;
  spreadConfig: SpreadConfig | null;
  userQuestion: string;
  drawnCards: DrawnCard[];
  aiReading: AIReading | null;
  aiStreaming: boolean;
}
