import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

  const variants = {
    primary:
      'bg-accent text-background font-bold hover:bg-accent-text shadow-lg shadow-accent/20 hover:shadow-accent/30',
    secondary:
      'bg-surface-100 text-foreground border border-border-base hover:border-border-highlight hover:bg-surface-50',
    outline:
      'bg-surface-50 text-accent-text border border-border-base hover:border-accent hover:bg-accent-dim',
    ghost:
      'text-muted hover:text-white hover:bg-surface-100',
    danger:
      'bg-red text-white hover:bg-red/90 shadow-lg shadow-red/20',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
