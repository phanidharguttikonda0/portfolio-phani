'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BOOT_LINES } from '@/lib/constants';

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, idx) =>
      setTimeout(() => setVisibleLines(idx + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const getPrefix = (prefix: string) => {
    const colors: Record<string, string> = {
      SYSTEM_INIT: 'text-accent-text',
      VPC_CONFIG: 'text-blue-text',
      RDS_PROXY: 'text-purple',
      CONTAINER: 'text-accent-text',
      ASYNC_PIPE: 'text-amber',
      RETAINER_STATUS: 'text-accent',
    };
    return colors[prefix] || 'text-muted';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="terminal-bg rounded-xl overflow-hidden shadow-2xl shadow-black/40"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-300 border-b border-border-subtle">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red" />
          <div className="w-3 h-3 rounded-full bg-amber" />
          <div className="w-3 h-3 rounded-full bg-accent" />
        </div>
        <span className="text-[10px] font-mono text-muted-dark ml-2">
          phani@cloud-ops:~$ ./boot-portfolio.sh
        </span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-1.5 min-h-[200px]">
        {BOOT_LINES.slice(0, visibleLines).map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-1"
          >
            <span className="text-muted-dark select-none">[</span>
            <span className={`${getPrefix(line.prefix)} font-semibold`}>
              {line.prefix}
            </span>
            <span className="text-muted-dark select-none">]</span>
            <span className="text-muted-light break-all">{line.text}</span>
          </motion.div>
        ))}

        {/* Cursor */}
        {visibleLines >= BOOT_LINES.length && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-accent-text">❯</span>
            <span
              className={`w-2 h-4 bg-accent-text ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-100`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
