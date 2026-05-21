import { create } from 'zustand';
import type { SpreadConfig, DrawnCard, AIReading, ReadingPhase } from '@/types';
import { shuffledDeck } from '@/data/deck';
import { randomOrientation } from '@/utils/random';

interface AppState {
  spreadConfig: SpreadConfig | null;
  userQuestion: string;
  phase: ReadingPhase;
  drawnCards: DrawnCard[];
  aiReading: AIReading | null;
  aiStreaming: boolean;

  setSpreadConfig: (config: SpreadConfig) => void;
  setUserQuestion: (q: string) => void;
  setPhase: (phase: ReadingPhase) => void;
  drawCards: () => void;
  setAiReading: (reading: AIReading | null) => void;
  setAiStreaming: (s: boolean) => void;
  resetReading: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  spreadConfig: null,
  userQuestion: '',
  phase: 'idle',
  drawnCards: [],
  aiReading: null,
  aiStreaming: false,

  setSpreadConfig: (config) => set({ spreadConfig: config, phase: 'selecting-spread' }),
  setUserQuestion: (q) => set({ userQuestion: q }),
  setPhase: (phase) => set({ phase }),

  drawCards: () => {
    const { spreadConfig } = get();
    if (!spreadConfig) return;

    const positions =
      spreadConfig.mode === 'template'
        ? spreadConfig.template.positions
        : spreadConfig.positions;

    const deck = shuffledDeck();
    const drawnCards: DrawnCard[] = positions.map((pos, i) => ({
      card: deck[i],
      orientation: randomOrientation(),
      position: pos,
      drawOrder: i + 1,
    }));

    set({ drawnCards, phase: 'revealing' });
  },

  setAiReading: (reading) => set({ aiReading: reading }),
  setAiStreaming: (s) => set({ aiStreaming: s }),

  resetReading: () =>
    set({
      spreadConfig: null,
      userQuestion: '',
      phase: 'idle',
      drawnCards: [],
      aiReading: null,
      aiStreaming: false,
    }),
}));
