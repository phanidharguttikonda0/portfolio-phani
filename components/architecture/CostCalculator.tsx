'use client';

import React, { useState } from 'react';
import { DollarSign, Cpu, Database, Network, Server, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function CostCalculator() {
  const [fargateTasks, setFargateTasks] = useState(2);
  const [dbTier, setDbTier] = useState<'t4g.small' | 't4g.medium' | 'r6g.large'>('t4g.small');
  const [useRdsProxy, setUseRdsProxy] = useState(true);
  const [natGateways, setNatGateways] = useState(1);
  const [dataOutGb, setDataOutGb] = useState(100);

  // Pricing formula based on AWS ap-south-2
  const fargateCostPerTask = 15.12; // 0.5 vCPU, 1GB RAM ~ $15.12/mo
  const fargateTotal = fargateTasks * fargateCostPerTask;

  const dbPricing = {
    't4g.small': 34.5,
    't4g.medium': 68.0,
    'r6g.large': 185.0,
  };
  const rdsBase = dbPricing[dbTier];
  const rdsProxyTotal = useRdsProxy ? 18.0 : 0.0;

  const albCost = 22.5; // ALB base
  const natCost = natGateways * 32.85; // ~$32.85/mo per NAT GW in ap-south-2
  const dataTransferCost = dataOutGb * 0.09; // $0.09/GB egress
  const sqsAndLambdas = 4.5; // SQS queues + DLQ + Sweeper cron

  const monthlyTotal =
    fargateTotal + rdsBase + rdsProxyTotal + albCost + natCost + dataTransferCost + sqsAndLambdas;

  return (
    <div className="bg-surface-100 border border-border-base rounded-2xl p-6 sm:p-8 flex flex-col gap-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <Badge variant="emerald" size="sm">
            AWS INFRASTRUCTURE COST SIMULATOR
          </Badge>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
            Production Run-Rate Calculator
          </h3>
          <p className="text-xs text-muted-dim font-mono mt-0.5">
            Transparent AWS pricing calibrated for ap-south-2 (Hyderabad / Mumbai)
          </p>
        </div>

        {/* Projected Total */}
        <div className="p-4 rounded-xl bg-surface-200 border border-border-highlight flex flex-col items-start sm:items-end">
          <span className="text-[11px] font-mono text-muted-dim">Estimated Monthly Bill</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-accent-text font-mono">
              ${monthlyTotal.toFixed(2)}
            </span>
            <span className="text-xs text-muted-dark font-mono">/ mo</span>
          </div>
        </div>
      </div>

      {/* Sliders and Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ECS Fargate Tasks */}
        <div className="p-4 rounded-xl bg-surface-200 border border-border-subtle flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-white flex items-center gap-1.5 font-bold">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              ECS Fargate Tasks
            </span>
            <span className="text-accent-text font-bold">
              {fargateTasks} tasks (${fargateTotal.toFixed(2)}/mo)
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            step={1}
            value={fargateTasks}
            onChange={(e) => setFargateTasks(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-dim font-mono">
            <span>1 task (Staging)</span>
            <span>2 tasks (HA Min)</span>
            <span>8 tasks (Peak Burst)</span>
          </div>
        </div>

        {/* Database Class */}
        <div className="p-4 rounded-xl bg-surface-200 border border-border-subtle flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-white flex items-center gap-1.5 font-bold">
              <Database className="w-3.5 h-3.5 text-accent" />
              RDS PostgreSQL Instance
            </span>
            <span className="text-accent-text font-bold">${rdsBase.toFixed(2)}/mo</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            {(['t4g.small', 't4g.medium', 'r6g.large'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setDbTier(tier)}
                className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                  dbTier === tier
                    ? 'bg-surface-50 border-accent text-accent-text font-bold'
                    : 'bg-surface-300 border-border-subtle text-muted-dim hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* RDS Proxy & High Concurrency */}
        <div className="p-4 rounded-xl bg-surface-200 border border-border-subtle flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold text-white">Enable RDS Proxy Pooling</span>
            <span className="text-[11px] text-muted-dim font-mono">
              Prevents DB connection exhaustion ($18.00/mo)
            </span>
          </div>
          <button
            onClick={() => setUseRdsProxy(!useRdsProxy)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              useRdsProxy ? 'bg-accent justify-end' : 'bg-surface-300 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-background" />
          </button>
        </div>

        {/* NAT Gateways */}
        <div className="p-4 rounded-xl bg-surface-200 border border-border-subtle flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold text-white">NAT Gateways (Egress)</span>
            <span className="text-[11px] text-muted-dim font-mono">
              {natGateways === 1 ? '1 NAT GW (Cost Optimized)' : '2 Multi-AZ NAT GWs ($65.70/mo)'}
            </span>
          </div>
          <div className="flex gap-1 font-mono text-xs">
            {[1, 2].map((num) => (
              <button
                key={num}
                onClick={() => setNatGateways(num)}
                className={`px-3 py-1 rounded-lg border cursor-pointer ${
                  natGateways === num
                    ? 'bg-surface-50 border-accent text-accent-text font-bold'
                    : 'bg-surface-300 border-border-subtle text-muted-dim'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bill Breakdown Summary */}
      <div className="p-4 rounded-xl bg-[#070c0a] border border-border-subtle flex flex-col gap-2 font-mono text-xs">
        <span className="text-muted-dark uppercase tracking-wider font-semibold">
          Cost Allocation Matrix
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div>
            <div className="text-muted-dim text-[10px]">Compute (ECS)</div>
            <div className="text-white font-bold">${fargateTotal.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted-dim text-[10px]">Database + Proxy</div>
            <div className="text-white font-bold">${(rdsBase + rdsProxyTotal).toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted-dim text-[10px]">Networking (ALB + NAT)</div>
            <div className="text-white font-bold">${(albCost + natCost).toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted-dim text-[10px]">Async (SQS + Cron)</div>
            <div className="text-white font-bold">${sqsAndLambdas.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
