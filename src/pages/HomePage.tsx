import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/Button';

export function HomePage() {
  const navigate = useNavigate();
  const resetReading = useAppStore((s) => s.resetReading);

  const handleStart = () => {
    resetReading();
    navigate('/spread-setup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-display font-bold text-mystic-accent">
          塔罗占卜
        </h1>
        <p className="text-lg text-mystic-muted max-w-md">
          探索你的命运，倾听内心声音
        </p>
      </div>

      <Button size="lg" onClick={handleStart}>
        开始占卜
      </Button>

      <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg">
        {[
          { step: '1', title: '选择牌阵', desc: '经典模板或自由定制' },
          { step: '2', title: '洗牌抽牌', desc: '凭直觉选择你的牌' },
          { step: '3', title: '获取解读', desc: 'AI深度解读你的牌面' },
        ].map(({ step, title, desc }) => (
          <div key={step} className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-mystic-primary/20 text-mystic-primary-light flex items-center justify-center mx-auto text-sm font-bold">
              {step}
            </div>
            <h3 className="text-sm font-medium text-mystic-text">{title}</h3>
            <p className="text-xs text-mystic-muted">{desc}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-mystic-muted/60 mt-8">
        塔罗牌占卜仅供娱乐和反思参考，不构成专业建议
      </p>
    </div>
  );
}
