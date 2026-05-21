import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          primary: 'bg-gradient-to-r from-mystic-primary to-mystic-primary-light text-white hover:shadow-lg hover:shadow-mystic-primary/25 active:scale-95',
          secondary: 'border border-mystic-primary/50 text-mystic-primary-light hover:bg-mystic-surface active:scale-95',
          ghost: 'text-mystic-muted hover:text-mystic-text hover:bg-mystic-surface/50',
        }[variant],
        {
          sm: 'px-3 py-1.5 text-sm',
          md: 'px-5 py-2.5 text-base',
          lg: 'px-8 py-3.5 text-lg',
        }[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
