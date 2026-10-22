'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import CommandPalette from './CommandPalette';
import ContactModal from '@/components/home/ContactModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* Top Availability Bar */}
      <div className="w-full bg-surface-100 border-b border-border-subtle py-2 px-4 flex items-center justify-center gap-3 text-xs font-mono z-50 relative">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        <span className="text-muted">Contract Availability:</span>
        <span className="text-accent-text font-semibold">20 hrs/week ($500/wk)</span>
        <span className="text-muted-dark hidden sm:inline">|</span>
        <span className="text-muted-dim hidden sm:inline">
          AWS Infrastructure · High-Throughput Rust/Go
        </span>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-lg shadow-black/20'
            : 'bg-background/50 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <span className="font-mono font-bold text-lg text-white group-hover:text-accent-text transition-colors">
                phani.pro
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-accent-text bg-accent-dim px-2 py-0.5 rounded-full border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
                Available
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-3 py-2 text-sm font-mono text-muted hover:text-accent-text transition-colors rounded-lg hover:bg-accent-dim"
                >
                  <span className="text-muted-dark">{link.id}.</span>{' '}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCmdOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-muted-dim border border-border-base rounded-lg hover:border-border-highlight hover:text-muted transition-all"
              >
                <Command className="w-3 h-3" />
                <span>Cmd + K</span>
              </button>

              <button
                onClick={() => setContactModalOpen(true)}
                className="hidden md:inline-flex px-4 py-2 rounded-lg bg-accent text-background font-bold text-xs hover:bg-accent-text transition-all shadow-lg shadow-accent/20 cursor-pointer"
              >
                Book Technical Sync
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-muted hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border-subtle overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1 bg-surface-100">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-mono text-muted hover:text-accent-text hover:bg-accent-dim rounded-lg transition-colors"
                  >
                    <span className="text-muted-dark">{link.id}.</span> {link.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setContactModalOpen(true);
                  }}
                  className="block w-full mt-3 px-4 py-3 rounded-lg bg-accent text-background font-bold text-sm text-center cursor-pointer"
                >
                  Book Technical Sync
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <ContactModal open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}
