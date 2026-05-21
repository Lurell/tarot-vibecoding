export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';

export type Rank =
  | 'ace' | 'two' | 'three' | 'four' | 'five'
  | 'six' | 'seven' | 'eight' | 'nine' | 'ten'
  | 'page' | 'knight' | 'queen' | 'king';

export type ArcanaType = 'major' | 'minor';

export type Orientation = 'upright' | 'reversed';

export interface Card {
  id: string;
  arcana: ArcanaType;
  suit: Suit | null;
  rank: Rank | null;
  number: number;
  nameZh: string;
  nameEn: string;
  keywordsUpright: string[];
  keywordsReversed: string[];
  descriptionZh: string;
  imageFile: string;
}
