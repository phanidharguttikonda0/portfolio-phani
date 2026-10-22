'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cloud, Wrench, Database, Radio, GitBranch } from 'lucide-react';
import { TECH_MATRIX } from '@/lib/constants';

const ICONS = [
  <Code key="lang" className="w-4 h-4" />,
  <Cloud key="cloud" className="w-4 h-4" />,
  <Wrench key="iac" className="w-4 h-4" />,
  <Database key="db" className="w-4 h-4" />,
  <Radio key="msg" className="w-4 h-4" />,
  <GitBranch key="devops" className="w-4 h-4" />,
];

export default function TechMatrix() {
  return (
    <section className="flex flex-col gap-6">
      <div className="border-b border-border-subtle pb-4">
        <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
          Technical Capabilities
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Verified Production Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TECH_MATRIX.map((item, idx) => (
          <motion.div
            key={item.domain}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="p-4 rounded-xl bg-surface-100 border border-border-base card-hover"
          >
            <div className="flex items-center gap-2 text-accent-text mb-2">
              {ICONS[idx]}
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                {item.domain}
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed font-mono">{item.tools}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
