'use client';

import React from 'react';
import { Mail, Phone, ExternalLink, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { IDENTITY } from '@/lib/constants';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-border-subtle bg-surface-300">
      {/* Terminal Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-border-subtle">
        <div className="flex items-center gap-3 text-xs font-mono text-muted-dim">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span className="text-muted-dark">phani.pro</span>
          <span className="text-border-highlight">|</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-accent-text">SYSTEM OPERATIONAL</span>
          </span>
          <span className="text-border-highlight">|</span>
          <span>Latency: 48.7ms p99</span>
          <span className="text-border-highlight hidden sm:inline">|</span>
          <span className="hidden sm:inline">Memory: 67.1 MB</span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-mono font-bold text-xl text-white">phani.pro</span>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Cloud Backend Engineer & Distributed Systems Specialist. Building
              production infrastructure that scales.
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-xs font-mono text-accent-text">
                Available: 20 hrs/week
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-muted-dark uppercase tracking-widest">
              Quick Links
            </span>
            <div className="flex flex-col gap-2">
              {['Architecture', 'Benchmarks', 'Case Studies', 'Experience', 'Contact'].map(
                (item) => (
                  <a
                    key={item}
                    href={`/#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-muted hover:text-accent-text transition-colors font-mono"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-muted-dark uppercase tracking-widest">
              Connect
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${IDENTITY.email}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent-text transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-muted-dim group-hover:text-accent transition-colors" />
                <span className="font-mono text-xs">{IDENTITY.email}</span>
              </a>
              <a
                href={`tel:${IDENTITY.phone}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent-text transition-colors group"
              >
                <Phone className="w-3.5 h-3.5 text-muted-dim group-hover:text-accent transition-colors" />
                <span className="font-mono text-xs">{IDENTITY.phone}</span>
              </a>
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-accent-text transition-colors group"
              >
                <GithubIcon className="w-3.5 h-3.5 text-muted-dim group-hover:text-accent transition-colors" />
                <span className="font-mono text-xs">GitHub</span>
                <ExternalLink className="w-3 h-3 text-muted-dark opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-accent-text transition-colors group"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-muted-dim group-hover:text-accent transition-colors" />
                <span className="font-mono text-xs">LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-muted-dark opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-dark">
          <span>
            © {currentYear} {IDENTITY.name}. Engineered with precision.
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </div>
    </footer>
  );
}
