import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'blue' | 'purple' | 'amber' | 'red' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = 'emerald',
  size = 'md',
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    emerald: 'bg-accent-dim text-accent-text border-accent/20',
    blue: 'bg-blue-dim text-blue-text border-blue/20',
    purple: 'bg-purple-dim text-purple border-purple/20',
    amber: 'bg-amber-dim text-amber border-amber/20',
    red: 'bg-red-dim text-red border-red/20',
    neutral: 'bg-surface-50 text-muted-light border-border-base',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-mono gap-1',
    md: 'text-xs px-2.5 py-1 font-mono gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-semibold tracking-wide',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
