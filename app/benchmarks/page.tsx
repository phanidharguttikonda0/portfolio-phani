import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Terminal, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import ConcurrencySlider from '@/components/benchmarks/ConcurrencySlider';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Real-Time Benchmarks & Concurrency Profiling | Phanidhar Reddy',
  description:
    'Interactive latency benchmark simulator comparing Rust Tokio/Axum against Node.js event loops. 48.7ms p99 latency, 1,217 bids/sec, and 274ns disk dispatch.',
};

export default function BenchmarksPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
        
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-dim hover:text-accent-text transition-colors self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-50 border border-border-base text-xs font-mono text-blue-text">
              <Zap className="w-3.5 h-3.5" />
              <span>LOW-LATENCY DISTRIBUTED SYSTEMS PROFILING</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Tokio Async Runtime & Latency Benchmarks
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
              Empirical performance data from live stress tests simulating thousands of concurrent bidding transactions. Discover how zero-allocation serialization, atomic Redis scripts, and Tokio MPSC channels eliminate latency jitter.
            </p>
          </div>
        </div>

        {/* Verification Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-surface-100 border border-border-base">
            <div className="text-3xl font-extrabold text-accent-text font-mono">48.7ms</div>
            <div className="text-xs text-muted-dim font-mono mt-1">p99 Tail Latency</div>
            <div className="text-[10px] text-muted-dark font-mono mt-0.5">1.7x faster than Node</div>
          </div>
          <div className="p-5 rounded-xl bg-surface-100 border border-border-base">
            <div className="text-3xl font-extrabold text-white font-mono">1,217</div>
            <div className="text-xs text-muted-dim font-mono mt-1">Sustained Bids / Sec</div>
            <div className="text-[10px] text-muted-dark font-mono mt-0.5">+43% throughput gain</div>
          </div>
          <div className="p-5 rounded-xl bg-surface-100 border border-border-base">
            <div className="text-3xl font-extrabold text-blue-text font-mono">274ns</div>
            <div className="text-xs text-muted-dim font-mono mt-1">MPSC Channel Dispatch</div>
            <div className="text-[10px] text-muted-dark font-mono mt-0.5">Non-blocking in-memory</div>
          </div>
          <div className="p-5 rounded-xl bg-surface-100 border border-border-base">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">67.1 MB</div>
            <div className="text-xs text-muted-dim font-mono mt-1">Peak Memory Footprint</div>
            <div className="text-[10px] text-muted-dark font-mono mt-0.5">Zero GC pauses</div>
          </div>
        </div>

        {/* SECTION: Interactive Concurrency Simulator */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
              Live Interactive Simulator
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Concurrency & Memory Stress Simulator
            </h2>
          </div>
          <ConcurrencySlider />
        </section>

        {/* Architectural Deep-Dive Comparison */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-muted-light uppercase tracking-widest font-semibold">
              System Design Analysis
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Why the Rust + Tokio Architecture Wins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-100 border border-border-base flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Atomic Redis Lua Scripts
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Wallet verification, bid qualification, and room leader updates execute in a single sub-millisecond atomic cycle inside Redis. This eliminates distributed database lock contention entirely.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-100 border border-border-base flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Zap className="w-4 h-4 text-blue-text" />
                274ns MPSC Disk Decoupling
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Rather than forcing WebSocket handler threads to wait 11ms for synchronous PostgreSQL disk flushes, events are emitted to an in-memory Tokio MPSC channel in 274 nanoseconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-100 border border-border-base flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Activity className="w-4 h-4 text-purple" />
                Zero Garbage Collection Pauses
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Rust&apos;s ownership model eliminates runtime garbage collection. Memory consumption stays capped under 70 MB even when processing over 1,200 concurrent auction bids every second.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-surface-100 border border-border-base flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white font-mono">
              Scaling a high-throughput backend service?
            </h3>
            <p className="text-xs text-muted max-w-xl">
              I consult on high-concurrency architectures in Rust, Go, and Java Spring Boot. Available for 20 hrs/week fractional retainers ($500/wk).
            </p>
          </div>
          <a
            href="mailto:guttikondaphanidharreddy@gmail.com?subject=High-Concurrency%20Backend%20Inquiry"
            className="px-6 py-3 rounded-lg bg-accent text-background font-bold text-xs hover:bg-accent-text transition-all shadow-lg shadow-accent/20 shrink-0 text-center"
          >
            Schedule Performance Consultation
          </a>
        </div>

      </div>
    </div>
  );
}
