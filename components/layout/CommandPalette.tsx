'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Server,
  BarChart3,
  BookOpen,
  Briefcase,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { NAV_LINKS, IDENTITY } from '@/lib/constants';

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const iconMap: Record<string, React.ReactNode> = {
    '01': <Server className="w-4 h-4" />,
    '02': <BarChart3 className="w-4 h-4" />,
    '03': <BookOpen className="w-4 h-4" />,
    '04': <Briefcase className="w-4 h-4" />,
    '05': <Mail className="w-4 h-4" />,
  };

  const commands: CommandItem[] = [
    ...NAV_LINKS.map((link) => ({
      id: link.id,
      label: link.label,
      description: `Navigate to ${link.label} section`,
      icon: iconMap[link.id] || <ArrowRight className="w-4 h-4" />,
      action: () => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      category: 'Navigation',
    })),
    {
      id: 'github',
      label: 'Open GitHub',
      description: 'View source code and repositories',
      icon: <GithubIcon className="w-4 h-4" />,
      action: () => {
        window.open(IDENTITY.github, '_blank');
        onClose();
      },
      category: 'Links',
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      description: 'View professional profile',
      icon: <LinkedinIcon className="w-4 h-4" />,
      action: () => {
        window.open(IDENTITY.linkedin, '_blank');
        onClose();
      },
      category: 'Links',
    },
    {
      id: 'demo',
      label: 'Live Auction Demo',
      description: 'Visit the live IPL Auction Engine',
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => {
        window.open(IDENTITY.liveDemo, '_blank');
        onClose();
      },
      category: 'Links',
    },
    {
      id: 'email',
      label: 'Send Email',
      description: 'guttikondaphanidharreddy@gmail.com',
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        window.open(`mailto:${IDENTITY.email}`, '_blank');
        onClose();
      },
      category: 'Contact',
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    (acc[cmd.category] = acc[cmd.category] || []).push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50 rounded-xl border border-border-base bg-surface-200 shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
              <Search className="w-4 h-4 text-muted-dim flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-white placeholder-muted-dim outline-none font-mono"
              />
              <kbd className="text-[10px] font-mono text-muted-dark bg-surface-300 px-1.5 py-0.5 rounded border border-border-subtle">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <div className="px-3 py-1 text-[10px] font-mono text-muted-dark uppercase tracking-widest">
                    {category}
                  </div>
                  {items.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-accent-dim transition-colors group"
                    >
                      <span className="text-muted group-hover:text-accent-text transition-colors">
                        {cmd.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white group-hover:text-accent-text transition-colors">
                          {cmd.label}
                        </div>
                        <div className="text-xs text-muted-dim truncate">
                          {cmd.description}
                        </div>
                      </div>
                      <ArrowRight className="w-3 h-3 text-muted-dark group-hover:text-accent-text transition-colors opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-muted-dim font-mono">
                  No results for &quot;{query}&quot;
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
