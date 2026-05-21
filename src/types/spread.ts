export interface SpreadPosition {
  id: string;
  name: string;
  meaning: string;
  order: number;
}

export interface SpreadTemplate {
  id: string;
  nameZh: string;
  descriptionZh: string;
  positions: SpreadPosition[];
}

export type SpreadConfig =
  | { mode: 'template'; template: SpreadTemplate }
  | { mode: 'custom'; positions: SpreadPosition[] };
