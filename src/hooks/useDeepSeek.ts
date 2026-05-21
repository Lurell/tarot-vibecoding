import { useCallback } from 'react';
import { useAppStore } from '@/store/app-store';
import { useSettingsStore } from '@/store/settings-store';
import { streamTarotReading } from '@/services/deepseek-api';
import { SYSTEM_PROMPT, buildReadingPrompt } from '@/services/prompt-builder';
import type { DrawnCard } from '@/types';

export function useDeepSeek() {
  const apiKey = useSettingsStore((s) => s.deepseekApiKey);
  const model = useSettingsStore((s) => s.deepseekModel);
  const { setAiReading, setAiStreaming, setPhase } = useAppStore();

  const generateReading = useCallback(
    async (drawnCards: DrawnCard[], userQuestion: string) => {
      if (!apiKey) return;

      setAiStreaming(true);

      const prompt = buildReadingPrompt(drawnCards, userQuestion);
      const abortController = new AbortController();

      try {
        const fullText = await streamTarotReading(
          apiKey,
          model,
          SYSTEM_PROMPT,
          prompt,
          (_chunk) => {
            // Streaming progress - we'll parse at the end
          },
          abortController.signal
        );

        // Try to extract sections from the AI response
        const overviewMatch = fullText.match(/整体概述[：:]*\s*([\s\S]*?)(?=逐牌解读|综合建议|$)/);
        const adviceMatch = fullText.match(/综合建议[：:]*\s*([\s\S]*)/);
        const overview = overviewMatch?.[1]?.trim() || fullText;
        const advice = adviceMatch?.[1]?.trim() || '';

        // Extract per-card interpretations section
        const positionsSection = fullText.match(/逐牌解读[：:]*\s*([\s\S]*?)(?=综合建议|$)/);
        const cardInterpretations = positionsSection?.[1]?.trim() || '';

        setAiReading({
          overview,
          cardInterpretations,
          advice,
        });

        setPhase('complete');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'AI 请求失败';
        setAiReading({
          overview: `AI 解读暂时不可用：${message}`,
          cardInterpretations: '',
          advice: '请检查 API 密钥是否正确，或稍后重试。您仍然可以查看上方每张牌的预设含义。',
        });
        setPhase('complete');
      } finally {
        setAiStreaming(false);
      }
    },
    [apiKey, model, setAiReading, setAiStreaming, setPhase]
  );

  return { generateReading };
}
