import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';

export function AppHeader() {
  const location = useLocation();

  return (
    <header className="border-b border-mystic-surface/50 bg-mystic-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-display font-bold text-mystic-primary-light hover:text-mystic-accent transition-colors">
          塔罗占卜
        </Link>
        <nav className="flex items-center gap-4 text-sm text-mystic-muted">
          {location.pathname !== '/' && (
            <Link to="/" className="hover:text-mystic-text transition-colors">
              首页
            </Link>
          )}
          <Link
            to="/settings"
            className="hover:text-mystic-text transition-colors flex items-center gap-1"
            title="设置"
          >
            <Settings size={16} />
            <span className="hidden sm:inline">设置</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
