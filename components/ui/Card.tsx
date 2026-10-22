import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'glass' | 'interactive';
  glow?: 'none' | 'emerald' | 'blue';
  children: React.ReactNode;
}

export function Card({
  className,
  variant = 'default',
  glow = 'none',
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-surface-100 border-border-base',
    surface: 'bg-surface-200 border-border-subtle',
    glass: 'glass-panel',
    interactive: 'bg-surface-100 border-border-base card-hover',
  };

  const glows = {
    none: '',
    emerald: 'glow-emerald',
    blue: 'shadow-[0_0_25px_rgba(59,130,246,0.15)]',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border p-6 text-foreground transition-all',
        variants[variant],
        glows[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
