export const COLORS = {
  background: '#0f0a1a',
  surface: '#1a1128',
  primary: '#8b5cf6',
  primaryLight: '#a78bfa',
  accent: '#f59e0b',
  textPrimary: '#f0e6ff',
  textSecondary: '#9ca3af',
  reversed: '#6b7280',
  cardBack: '#2d1b4e',
} as const;

export const SUIT_INFO = {
  wands: { nameZh: '权杖', element: '火', color: '#ef4444' },
  cups: { nameZh: '圣杯', element: '水', color: '#3b82f6' },
  swords: { nameZh: '宝剑', element: '风', color: '#fbbf24' },
  pentacles: { nameZh: '星币', element: '土', color: '#22c55e' },
} as const;
