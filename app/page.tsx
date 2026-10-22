'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Mail, GitBranch } from 'lucide-react';
import { HERO_METRICS, IDENTITY } from '@/lib/constants';
import HeroTerminal from '@/components/home/HeroTerminal';
import PaatamCaseStudy from '@/components/home/PaatamCaseStudy';
import AuctionCaseStudy from '@/components/home/AuctionCaseStudy';
import MicroservicesCaseStudy from '@/components/home/MicroservicesCaseStudy';
import TechMatrix from '@/components/home/TechMatrix';
import ServicesGrid from '@/components/home/ServicesGrid';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import ContactSection from '@/components/home/ContactSection';

/* ===== Animated Counter Hook ===== */
function useCounter(target: string, duration: number = 2000) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    // Parse numeric portion
    const numMatch = target.match(/[\d.]+/);
    if (!numMatch) {
      setDisplay(target);
      return;
    }
    const numericTarget = parseFloat(numMatch[0]);
    const prefix = target.slice(0, target.indexOf(numMatch[0]));
    const suffix = target.slice(target.indexOf(numMatch[0]) + numMatch[0].length);
    const hasDecimal = numMatch[0].includes('.');
    const decimalPlaces = hasDecimal ? numMatch[0].split('.')[1].length : 0;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericTarget * eased;

      if (hasDecimal) {
        setDisplay(`${prefix}${current.toFixed(decimalPlaces)}${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.floor(current)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return display;
}

function MetricCard({ value, label, color }: { value: string; label: string; color: string }) {
  const animatedValue = useCounter(value, 2500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-surface-100 border border-border-base card-hover"
    >
      <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${color}`}>
        {animatedValue}
      </div>
      <div className="text-xs text-muted-dim mt-1 font-mono">{label}</div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-24">

        {/* ===== HERO SECTION ===== */}
        <section className="flex flex-col gap-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-50 border border-border-base text-xs font-mono text-accent-text"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>AWS INFRASTRUCTURE & DISTRIBUTED SYSTEMS ARCHITECT</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            I build backend systems that{' '}
            <span className="gradient-text">
              don&apos;t crash under load
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed"
          >
            Cloud Backend Engineer specializing in high-concurrency systems across{' '}
            <strong className="text-white">Rust (Tokio)</strong>,{' '}
            <strong className="text-white">Go</strong>, and{' '}
            <strong className="text-white">Java (Spring Boot)</strong>. I design isolated
            3-tier AWS topologies via{' '}
            <strong className="text-white">Terraform</strong>, eliminate RDS connection
            starvation with <strong className="text-white">RDS Proxy</strong>, and decouple
            massive workloads using self-healing{' '}
            <strong className="text-white">SQS/DLQ pipelines</strong>.
          </motion.p>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2"
          >
            {HERO_METRICS.map((m, idx) => (
              <MetricCard key={idx} value={m.value} label={m.label} color={m.color} />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-accent text-background font-bold text-sm hover:bg-accent-text transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Book Technical Consultation
            </a>
            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg bg-surface-50 text-accent-text border border-border-base hover:border-accent font-semibold text-sm transition-all flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4" />
              Review GitHub Codebase
            </a>
          </motion.div>

          {/* Boot Terminal */}
          <div className="mt-4">
            <HeroTerminal />
          </div>
        </section>

        {/* ===== PAATAM CASE STUDY ===== */}
        <PaatamCaseStudy />

        {/* ===== AUCTION ENGINE ===== */}
        <AuctionCaseStudy />

        {/* ===== MICROSERVICES ===== */}
        <MicroservicesCaseStudy />

        {/* ===== TECH MATRIX ===== */}
        <TechMatrix />

        {/* ===== SERVICES ===== */}
        <ServicesGrid />

        {/* ===== EXPERIENCE ===== */}
        <ExperienceTimeline />

        {/* ===== CONTACT ===== */}
        <ContactSection />

      </div>
    </div>
  );
}
