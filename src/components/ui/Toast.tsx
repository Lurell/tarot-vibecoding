import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'info' | 'error';
  onDismiss: () => void;
}

export function Toast({ message, type = 'info', onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${
        type === 'error'
          ? 'bg-red-900/80 border-red-500/50 text-red-200'
          : 'bg-mystic-surface border-mystic-primary/30 text-mystic-text'
      }`}>
        <span className="text-sm">{message}</span>
        <button onClick={onDismiss} className="opacity-60 hover:opacity-100">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
