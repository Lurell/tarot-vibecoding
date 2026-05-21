import { clsx } from 'clsx';
import type { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className, ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-mystic-muted mb-1.5">{label}</label>
      )}
      <textarea
        className={clsx(
          'w-full rounded-lg bg-mystic-surface border border-mystic-primary/20 px-4 py-3',
          'text-mystic-text placeholder:text-mystic-muted/50',
          'focus:outline-none focus:border-mystic-primary focus:ring-1 focus:ring-mystic-primary',
          'resize-none transition-colors',
          className
        )}
        {...props}
      />
    </div>
  );
}
