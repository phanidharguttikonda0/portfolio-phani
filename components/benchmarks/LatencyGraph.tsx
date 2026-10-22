'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface LatencyGraphProps {
  concurrencyLevel: number; // e.g. 100 to 5000 clients
}

export default function LatencyGraph({ concurrencyLevel = 1200 }: LatencyGraphProps) {
  // Calculate dynamic latency based on concurrency level
  // Rust stays remarkably flat: p50 ~ 4ms, p90 ~ 18ms, p99 ~ 48.7ms (under 1200), scales gently
  const factor = concurrencyLevel / 1200;

  const rustP50 = (4.2 * Math.pow(factor, 0.15)).toFixed(1);
  const rustP90 = (18.5 * Math.pow(factor, 0.25)).toFixed(1);
  const rustP99 = (48.7 * Math.pow(factor, 0.35)).toFixed(1);

  // Node.js / synchronous Postgres degrades exponentially under high concurrency:
  const nodeP50 = (24.0 * Math.pow(factor, 0.9)).toFixed(1);
  const nodeP90 = (180.0 * Math.pow(factor, 1.4)).toFixed(1);
  const nodeP99 = (852.0 * Math.pow(factor, 1.8)).toFixed(1);

  return (
    <div className="bg-surface-100 border border-border-base rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
        <div>
          <Badge variant="emerald" size="sm">
            PERCENTILE LATENCY BENCHMARKS (ms)
          </Badge>
          <h4 className="text-lg font-bold text-white font-mono mt-1">
            Rust Tokio/Axum vs Node.js Event Loop
          </h4>
        </div>
        <span className="text-xs font-mono text-muted-dim">
          Load: {concurrencyLevel.toLocaleString()} concurrent bids/sec
        </span>
      </div>

      {/* Latency Bars Comparison */}
      <div className="flex flex-col gap-6">
        {/* p50 */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-light font-bold">p50 Latency (Median Response)</span>
            <span className="text-accent-text font-bold">Rust: {rustP50}ms · Node: {nodeP50}ms</span>
          </div>
          <div className="space-y-1.5 font-mono text-[10px]">
            {/* Rust bar */}
            <div className="flex items-center gap-2">
              <span className="w-14 text-right text-emerald-400">Rust</span>
              <div className="flex-1 bg-surface-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(parseFloat(rustP50) * 1.5, 95)}%` }}
                />
              </div>
              <span className="w-12 text-white font-bold">{rustP50}ms</span>
            </div>
            {/* Node bar */}
            <div className="flex items-center gap-2">
              <span className="w-14 text-right text-red">Node.js</span>
              <div className="flex-1 bg-surface-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red/80 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(parseFloat(nodeP50) * 1.5, 95)}%` }}
                />
              </div>
              <span className="w-12 text-muted-dim">{nodeP50}ms</span>
            </div>
          </div>
        </div>

        {/* p90 */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-light font-bold">p90 Latency (90th Percentile)</span>
            <span className="text-accent-text font-bold">Rust: {rustP90}ms · Node: {nodeP90}ms</span>
          </div>
          <div className="space-y-1.5 font-mono text-[10px]">
            {/* Rust bar */}
            <div className="flex items-center gap-2">
              <span className="w-14 text-right text-emerald-400">Rust</span>
              <div className="flex-1 bg-surface-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(parseFloat(rustP90) * 0.8, 95)}%` }}
                />
              </div>
              <span className="w-12 text-white font-bold">{rustP90}ms</span>
            </div>
            {/* Node bar */}
            <div className="flex items-center gap-2">
              <span className="w-14 text-right text-red">Node.js</span>
              <div className="flex-1 bg-surface-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red/80 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(parseFloat(nodeP90) * 0.3, 95)}%` }}
                />
              </div>
              <span className="w-12 text-muted-dim">{nodeP90}ms</span>
            </div>
          </div>
        </div>

        {/* p99 */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-light font-bold">p99 Latency (Worst-case Tail)</span>
            <span className="text-accent-text font-bold">Rust: {rustP99}ms · Node: {nodeP99}ms</span>
          </div>
          <div className="space-y-1.5 font-mono text-[10px]">
            {/* Rust bar */}
            <div className="flex items-center gap-2">
              <span className="w-14 text-right text-emerald-400">Rust</span>
              <div className="flex-1 bg-surface-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-300 glow-emerald"
                  style={{ width: `${Math.min(parseFloat(rustP99) * 0.4, 95)}%` }}
                />
              </div>
              <span className="w-12 text-accent-text font-bold">{rustP99}ms</span>
            </div>
            {/* Node bar */}
            <div className="flex items-center gap-2">
              <span className="w-14 text-right text-red">Node.js</span>
              <div className="flex-1 bg-surface-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(parseFloat(nodeP99) * 0.1, 95)}%` }}
                />
              </div>
              <span className="w-12 text-red font-bold">{nodeP99}ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
