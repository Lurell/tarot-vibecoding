import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { SpreadPosition } from '@/types';

interface SpreadBuilderProps {
  positions: SpreadPosition[];
  onChange: (positions: SpreadPosition[]) => void;
}

export function SpreadBuilder({ positions, onChange }: SpreadBuilderProps) {
  const addPosition = () => {
    if (positions.length >= 15) return;
    const newId = `custom-${Date.now()}`;
    onChange([
      ...positions,
      { id: newId, name: '', meaning: '', order: positions.length + 1 },
    ]);
  };

  const removePosition = (id: string) => {
    const filtered = positions.filter((p) => p.id !== id);
    onChange(filtered.map((p, i) => ({ ...p, order: i + 1 })));
  };

  const updatePosition = (id: string, field: 'name' | 'meaning', value: string) => {
    onChange(positions.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="space-y-4">
      {positions.length === 0 && (
        <p className="text-mystic-muted text-center py-8">
          添加牌阵位置来创建你的自定义牌阵
        </p>
      )}

      {positions.map((pos) => (
        <div
          key={pos.id}
          className="flex items-start gap-3 bg-mystic-surface rounded-xl p-4 border border-mystic-primary/10"
        >
          <div className="w-8 h-8 rounded-full bg-mystic-primary/20 text-mystic-primary-light flex items-center justify-center text-sm font-bold shrink-0">
            {pos.order}
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="text"
              placeholder="位置名称（例：过去）"
              value={pos.name}
              onChange={(e) => updatePosition(pos.id, 'name', e.target.value)}
              className="w-full rounded-lg bg-mystic-bg border border-mystic-primary/10 px-3 py-2 text-sm text-mystic-text placeholder:text-mystic-muted/50 focus:outline-none focus:border-mystic-primary focus:ring-1 focus:ring-mystic-primary transition-colors"
            />
            <input
              type="text"
              placeholder="位置含义（例：代表过去的影响因素）"
              value={pos.meaning}
              onChange={(e) => updatePosition(pos.id, 'meaning', e.target.value)}
              className="w-full rounded-lg bg-mystic-bg border border-mystic-primary/10 px-3 py-2 text-sm text-mystic-text placeholder:text-mystic-muted/50 focus:outline-none focus:border-mystic-primary focus:ring-1 focus:ring-mystic-primary transition-colors"
            />
          </div>
          <button
            onClick={() => removePosition(pos.id)}
            className="text-mystic-muted hover:text-red-400 transition-colors p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={addPosition}
          disabled={positions.length >= 15}
        >
          <Plus size={16} className="mr-1" />
          添加位置
        </Button>
      </div>

      {positions.length > 0 && (
        <p className="text-xs text-mystic-muted text-center">
          {positions.length}/15 个位置
        </p>
      )}
    </div>
  );
}
