import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/app-store';
import { useSettingsStore } from '@/store/settings-store';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { CardInterpretation } from '@/components/reading/CardInterpretation';
import { AiReading } from '@/components/reading/AiReading';
import { useDeepSeek } from '@/hooks/useDeepSeek';

export function ReadingPage() {
  const navigate = useNavigate();
  const { drawnCards, phase, aiReading, aiStreaming, resetReading } = useAppStore();
  const apiKey = useSettingsStore((s) => s.deepseekApiKey);
  const { generateReading } = useDeepSeek();

  useEffect(() => {
    if (drawnCards.length === 0) {
      navigate('/shuffle', { replace: true });
    }
  }, [drawnCards, navigate]);

  useEffect(() => {
    if (phase === 'generating' && apiKey && !aiReading && !aiStreaming) {
      generateReading(drawnCards, useAppStore.getState().userQuestion);
    }
  }, [phase, apiKey]);

  const handleNewReading = () => {
    resetReading();
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <h1 className="text-2xl font-display font-bold text-mystic-text text-center">解读结果</h1>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {drawnCards.map((dc) => (
          <CardInterpretation key={dc.position.id} drawnCard={dc} />
        ))}
      </div>

      {/* AI Reading */}
      {!apiKey ? (
        <div className="text-center py-8 bg-mystic-surface rounded-xl border border-mystic-primary/10">
          <p className="text-mystic-muted mb-4">配置 DeepSeek API 密钥以获取 AI 深度解读</p>
          <Button variant="secondary" onClick={() => navigate('/settings')}>
            前往设置
          </Button>
        </div>
      ) : (
        <div className="bg-mystic-surface rounded-xl p-6 border border-mystic-primary/10">
          {aiStreaming && !aiReading && <Spinner />}
          {aiReading && <AiReading reading={aiReading} />}
          {!aiStreaming && !aiReading && (
            <p className="text-mystic-muted text-center">正在准备 AI 解读...</p>
          )}
        </div>
      )}

      <div className="flex justify-center gap-4 pt-4">
        <Button variant="secondary" onClick={handleNewReading}>
          重新占卜
        </Button>
      </div>
    </div>
  );
}
