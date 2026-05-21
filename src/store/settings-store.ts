import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  deepseekApiKey: string;
  deepseekModel: string;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;
  clearApiKey: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      deepseekApiKey: '',
      deepseekModel: 'deepseek-chat',
      setApiKey: (key) => set({ deepseekApiKey: key }),
      setModel: (model) => set({ deepseekModel: model }),
      clearApiKey: () => set({ deepseekApiKey: '' }),
    }),
    {
      name: 'tarot-settings',
    }
  )
);
