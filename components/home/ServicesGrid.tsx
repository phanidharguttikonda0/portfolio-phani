'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { SERVICES, IDENTITY } from '@/lib/constants';

export default function ServicesGrid() {
  return (
    <section id="services" className="flex flex-col gap-8">
      <div className="border-b border-border-subtle pb-4">
        <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
          Engagement Models
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Contract Retainers & Specialized Sprints
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`p-6 lg:p-8 rounded-2xl flex flex-col justify-between gap-6 card-hover ${
              service.primary
                ? 'bg-surface-100 border-2 border-accent/40 shadow-xl shadow-accent/5 glow-emerald'
                : 'bg-surface-100 border border-border-base'
            }`}
          >
            <div className="flex flex-col gap-3">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold self-start border ${
                  service.badgeColor === 'emerald'
                    ? 'bg-accent-dim text-accent-text border-accent/20'
                    : service.badgeColor === 'blue'
                    ? 'bg-blue-dim text-blue-text border-blue/20'
                    : 'bg-amber-dim text-amber border-amber/20'
                }`}
              >
                {service.badge}
              </div>

              <h3 className="text-lg font-bold text-white">{service.title}</h3>

              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {service.price}
                </span>
                <span className="text-sm text-muted-dim">{service.unit}</span>
              </div>

              <p className="text-xs text-muted leading-relaxed">{service.description}</p>

              <ul className="space-y-2.5 text-xs text-foreground mt-2">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        service.badgeColor === 'emerald'
                          ? 'text-accent'
                          : service.badgeColor === 'blue'
                          ? 'text-blue'
                          : 'text-amber'
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={service.ctaLink}
              className={`w-full py-3 rounded-lg font-bold text-center text-xs transition-all ${
                service.primary
                  ? 'bg-accent text-background hover:bg-accent-text shadow-md'
                  : 'bg-surface-50 border border-border-base hover:border-accent text-accent-text'
              }`}
            >
              {service.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
