import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { SpreadSelector } from '@/components/spread/SpreadSelector';
import { SpreadBuilder } from '@/components/spread/SpreadBuilder';
import type { SpreadConfig, SpreadPosition } from '@/types';

type SetupMode = 'template' | 'custom';

export function SpreadSetupPage() {
  const navigate = useNavigate();
  const { spreadConfig, userQuestion, setSpreadConfig, setUserQuestion, setPhase } = useAppStore();
  const [mode, setMode] = useState<SetupMode>('template');
  const [customPositions, setCustomPositions] = useState<SpreadPosition[]>([]);

  const handleSelectTemplate = (config: SpreadConfig) => {
    setSpreadConfig(config);
  };

  const handleCustomChange = (positions: SpreadPosition[]) => {
    setCustomPositions(positions);
    if (positions.length > 0) {
      setSpreadConfig({ mode: 'custom', positions });
    }
  };

  const handleStartDraw = () => {
    if (!spreadConfig) return;
    setPhase('shuffling');
    navigate('/shuffle');
  };

  const canStart = spreadConfig !== null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <h1 className="text-2xl font-display font-bold text-mystic-text">选择牌阵</h1>

      {/* Mode tabs */}
      <div className="flex gap-2 bg-mystic-surface rounded-lg p-1">
        {[
          ['template', '经典牌阵'],
          ['custom', '自定义牌阵'],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setMode(value as SetupMode)}
            className={`flex-1 py-2 text-sm rounded-md transition-colors ${
              mode === value
                ? 'bg-mystic-primary text-white'
                : 'text-mystic-muted hover:text-mystic-text'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'template' ? (
        <SpreadSelector onSelect={handleSelectTemplate} selected={spreadConfig?.mode === 'template' ? spreadConfig.template.id : null} />
      ) : (
        <SpreadBuilder positions={customPositions} onChange={handleCustomChange} />
      )}

      <hr className="border-mystic-surface" />

      <div className="space-y-4">
        <TextArea
          label="你有什么想问的？（选填）"
          placeholder="例：我最近的事业发展如何？"
          maxLength={200}
          rows={3}
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
        />
        <p className="text-xs text-mystic-muted text-right">{userQuestion.length}/200</p>
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" onClick={handleStartDraw} disabled={!canStart}>
          开始抽牌
        </Button>
      </div>
    </div>
  );
}
