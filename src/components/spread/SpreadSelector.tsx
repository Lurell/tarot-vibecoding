import { spreadTemplates } from '@/data/spread-templates';
import type { SpreadConfig } from '@/types';

interface SpreadSelectorProps {
  onSelect: (config: SpreadConfig) => void;
  selected: string | null;
}

export function SpreadSelector({ onSelect, selected }: SpreadSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {spreadTemplates.map((tpl) => (
        <button
          key={tpl.id}
          onClick={() => onSelect({ mode: 'template', template: tpl })}
          className={`text-left p-4 rounded-xl border transition-all ${
            selected === tpl.id
              ? 'border-mystic-primary bg-mystic-primary/10 shadow-lg shadow-mystic-primary/10'
              : 'border-mystic-surface bg-mystic-surface hover:border-mystic-primary/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-mystic-text">{tpl.nameZh}</h3>
            <span className="text-xs text-mystic-muted bg-mystic-bg px-2 py-0.5 rounded-full">
              {tpl.positions.length}张牌
            </span>
          </div>
          <p className="text-sm text-mystic-muted">{tpl.descriptionZh}</p>
        </button>
      ))}
    </div>
  );
}
