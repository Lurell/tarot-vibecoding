import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/Button';
import { TarotCard } from '@/components/card/TarotCard';

export function ShufflePage() {
  const navigate = useNavigate();
  const { spreadConfig, phase, drawnCards, drawCards, setPhase } = useAppStore();
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!spreadConfig) {
      navigate('/spread-setup', { replace: true });
    }
  }, [spreadConfig, navigate]);

  const handleDraw = () => {
    setRevealedCards(new Set());
    drawCards();
  };

  const handleRevealCard = (positionId: string) => {
    setRevealedCards((prev) => {
      const next = new Set(prev);
      next.add(positionId);
      return next;
    });
  };

  const handleRevealAll = () => {
    setRevealedCards(new Set(drawnCards.map((dc) => dc.position.id)));
  };

  const handleRevealComplete = () => {
    setPhase('generating');
    navigate('/reading');
  };

  const positions =
    spreadConfig?.mode === 'template'
      ? spreadConfig.template.positions
      : spreadConfig?.mode === 'custom'
        ? spreadConfig.positions
        : [];

  const allRevealed = drawnCards.length > 0 && revealedCards.size === drawnCards.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 text-center">
      <h1 className="text-2xl font-display font-bold text-mystic-text">洗牌与抽牌</h1>

      {phase === 'shuffling' && (
        <div className="space-y-6">
          <p className="text-mystic-muted max-w-md">
            深呼吸，专注于你的问题。
            <br />
            准备好了就点击下方按钮抽取{positions.length}张牌。
          </p>
          <Button size="lg" onClick={handleDraw}>
            抽取{positions.length}张牌
          </Button>
        </div>
      )}

      {phase === 'revealing' && drawnCards.length > 0 && (
        <div className="space-y-8 w-full max-w-4xl">
          <p className="text-mystic-muted">点击每张牌翻开它</p>

          <div
            className="grid gap-6 justify-center"
            style={{
              gridTemplateColumns: `repeat(${Math.min(drawnCards.length, 5)}, minmax(0, 160px))`,
            }}
          >
            {drawnCards.map((dc) => {
              const isRevealed = revealedCards.has(dc.position.id);
              return (
                <div key={dc.position.id} className="space-y-2">
                  <TarotCard
                    card={dc.card}
                    orientation={dc.orientation}
                    isRevealed={isRevealed}
                    onClick={() => handleRevealCard(dc.position.id)}
                  />
                  <div className="text-xs text-mystic-primary-light font-medium">
                    {dc.position.name}
                  </div>
                  {isRevealed && (
                    <div
                      className={`text-xs ${
                        dc.orientation === 'upright' ? 'text-mystic-accent' : 'text-mystic-muted'
                      }`}
                    >
                      {dc.card.nameZh} · {dc.orientation === 'upright' ? '正位' : '逆位'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            {!allRevealed && drawnCards.some((dc) => !revealedCards.has(dc.position.id)) && (
              <Button variant="secondary" onClick={handleRevealAll}>
                全部翻开
              </Button>
            )}
            {allRevealed && (
              <Button size="lg" onClick={handleRevealComplete}>
                查看解读
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
