'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'hcl',
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-border-base bg-[#070c0a] overflow-hidden font-mono text-xs shadow-2xl',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-200 border-b border-border-subtle">
        <div className="flex items-center gap-2 text-muted-dim">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span className="font-semibold text-muted-light">
            {filename || language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-100 hover:bg-surface-50 text-muted-dim hover:text-white border border-border-subtle transition-all cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] text-accent-text">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <pre className="p-4 overflow-x-auto text-[#d1dfd7] leading-relaxed select-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
