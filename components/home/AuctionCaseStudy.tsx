'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, HardDrive, Timer, ExternalLink } from 'lucide-react';
import { BENCHMARK_DATA, IDENTITY } from '@/lib/constants';

export default function AuctionCaseStudy() {
  const [rooms, setRooms] = useState(10);
  const [clients, setClients] = useState(1000);

  const simulated = useMemo(() => {
    const loadFactor = (rooms / 10) * (clients / 1000);

    // Node.js / Postgres model degrades exponentially
    const nodeP99 = Math.min(50 + loadFactor * 160 + Math.pow(loadFactor, 2) * 40, 1200);
    const nodeMemory = Math.min(120 + loadFactor * 80, 800);
    const nodeDropouts = Math.max(0, Math.floor((loadFactor - 1.5) * clients * 0.05));

    // Rust/Axum + Redis stays flat
    const rustP99 = Math.min(38 + loadFactor * 4.2, 72);
    const rustMemory = Math.min(52 + loadFactor * 6, 95);
    const rustDropouts = 0;

    return {
      node: { p99: nodeP99.toFixed(1), memory: nodeMemory.toFixed(0), dropouts: nodeDropouts },
      rust: { p99: rustP99.toFixed(1), memory: rustMemory.toFixed(0), dropouts: rustDropouts },
    };
  }, [rooms, clients]);

  return (
    <section id="benchmarks" className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
        <div>
          <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
            High-Throughput Systems
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Distributed Auction Engine — Rust/Tokio
          </h2>
        </div>
        <a
          href={IDENTITY.liveDemo}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono px-3 py-1.5 rounded bg-accent-dim text-accent-text border border-accent/20 self-start sm:self-auto hover:border-accent transition-colors flex items-center gap-1.5"
        >
          Live Demo <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-surface-100 border border-border-base rounded-2xl p-6 lg:p-8 flex flex-col gap-6"
      >
        {/* Problem + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-red font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red" />
              The Concurrency Problem
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Real-time bidding systems suffer from classic race conditions: two
              users submitting identical bids at the exact millisecond, resulting
              in double-spending or stale leaderboards. Relational database locks
              create massive latency bottlenecks (10ms–50ms row locking), causing
              WebSocket connections to drop.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-accent-text font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              The Rust + Tokio Solution
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Stateless, asynchronous backend in <strong className="text-white">Rust (Axum + Tokio)</strong>.
              Race-condition safe via <strong className="text-white">Redis atomic Lua scripts</strong>.
              Async disk dispatch through <strong className="text-white">Tokio MPSC channels</strong> at
              274ns latency, eliminating 11ms of blocking DB overhead.
            </p>
          </div>
        </div>

        {/* Verified Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-300 border border-border-subtle text-center">
            <Zap className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-xl font-extrabold text-white font-mono">
              {BENCHMARK_DATA.throughput.after}
            </div>
            <div className="text-[10px] text-muted-dim font-mono mt-1">
              bids/sec ({BENCHMARK_DATA.throughput.improvement})
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-300 border border-border-subtle text-center">
            <Timer className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-xl font-extrabold text-white font-mono">
              {BENCHMARK_DATA.p99Latency.after}ms
            </div>
            <div className="text-[10px] text-muted-dim font-mono mt-1">
              p99 Latency ({BENCHMARK_DATA.p99Latency.improvement})
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-300 border border-border-subtle text-center">
            <Cpu className="w-5 h-5 text-blue mx-auto mb-2" />
            <div className="text-xl font-extrabold text-white font-mono">
              -98%
            </div>
            <div className="text-[10px] text-muted-dim font-mono mt-1">
              Logging Overhead
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-300 border border-border-subtle text-center">
            <HardDrive className="w-5 h-5 text-purple mx-auto mb-2" />
            <div className="text-xl font-extrabold text-white font-mono">
              {BENCHMARK_DATA.memoryFootprint.value} MB
            </div>
            <div className="text-[10px] text-muted-dim font-mono mt-1">
              Peak Memory
            </div>
          </div>
        </div>

        {/* Interactive Latency Simulator */}
        <div className="mt-2 p-6 rounded-xl bg-surface-300 border border-border-subtle">
          <h3 className="text-sm font-bold text-white mb-4 font-mono">
            Interactive Latency & Concurrency Simulator
          </h3>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-xs font-mono text-muted-dim flex items-center justify-between mb-2">
                <span>Concurrent Rooms</span>
                <span className="text-accent-text font-bold">{rooms}</span>
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full h-1.5 bg-border-base rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[9px] font-mono text-muted-dark mt-1">
                <span>1</span>
                <span>50</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-dim flex items-center justify-between mb-2">
                <span>WebSocket Clients</span>
                <span className="text-accent-text font-bold">{clients.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
                className="w-full h-1.5 bg-border-base rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[9px] font-mono text-muted-dark mt-1">
                <span>100</span>
                <span>5,000</span>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Node.js Card */}
            <div className="p-4 rounded-xl bg-red-dim border border-red/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-red" />
                <span className="text-xs font-mono font-bold text-red">
                  Node.js + PostgreSQL
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-dim">p99 Latency</span>
                  <span className={`text-sm font-mono font-bold ${
                    Number(simulated.node.p99) > 200 ? 'text-red' : 'text-amber'
                  }`}>
                    {simulated.node.p99}ms
                  </span>
                </div>
                <div className="w-full bg-surface-300 rounded-full h-1.5">
                  <div
                    className="bg-red rounded-full h-1.5 transition-all duration-500"
                    style={{ width: `${Math.min((Number(simulated.node.p99) / 1200) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-dim">Memory</span>
                  <span className="text-sm font-mono font-bold text-red">
                    {simulated.node.memory} MB
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-dim">WS Dropouts</span>
                  <span className={`text-sm font-mono font-bold ${
                    Number(simulated.node.dropouts) > 0 ? 'text-red' : 'text-muted'
                  }`}>
                    {simulated.node.dropouts}
                  </span>
                </div>
              </div>
            </div>

            {/* Rust Card */}
            <div className="p-4 rounded-xl bg-accent-dim border border-accent/20 glow-emerald">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                <span className="text-xs font-mono font-bold text-accent-text">
                  Rust/Axum + Redis Atomic
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-dim">p99 Latency</span>
                  <span className="text-sm font-mono font-bold text-accent-text">
                    {simulated.rust.p99}ms
                  </span>
                </div>
                <div className="w-full bg-surface-300 rounded-full h-1.5">
                  <div
                    className="bg-accent rounded-full h-1.5 transition-all duration-500"
                    style={{ width: `${Math.min((Number(simulated.rust.p99) / 1200) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-dim">Memory</span>
                  <span className="text-sm font-mono font-bold text-accent-text">
                    {simulated.rust.memory} MB
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-dim">WS Dropouts</span>
                  <span className="text-sm font-mono font-bold text-accent-text">
                    {simulated.rust.dropouts}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Tags & Deep Dive Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-light">
            {['Rust + Axum + Tokio', 'Redis Lua Atomic Scripts', 'Tokio MPSC Channels', 'WebSocket Reconnection', 'Zero Race Conditions', '274ns Dispatch Latency'].map(
              (tag) => (
                <span key={tag} className="px-2.5 py-1 rounded bg-surface-300 border border-border-subtle">
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/case-studies/auction-engine"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent-text hover:underline"
            >
              Full Rust Deep-Dive →
            </a>
            <span className="text-muted-dark">|</span>
            <a
              href="/benchmarks"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-text hover:underline"
            >
              Latency Profiler →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
