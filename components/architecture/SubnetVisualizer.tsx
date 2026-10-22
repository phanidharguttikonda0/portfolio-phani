'use client';

import React, { useState } from 'react';
import { Shield, ArrowRight, Globe, Lock, Server, Database, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface SubnetDef {
  tier: 'Public' | 'Private App' | 'Isolated DB';
  azA: string;
  azB: string;
  routeTarget: string;
  ingressRules: string;
  egressRules: string;
  components: string[];
  color: string;
  borderColor: string;
}

const SUBNETS: SubnetDef[] = [
  {
    tier: 'Public',
    azA: '10.0.1.0/24 (ap-south-2a)',
    azB: '10.0.2.0/24 (ap-south-2b)',
    routeTarget: '0.0.0.0/0 → Internet Gateway (igw-09a8f)',
    ingressRules: 'HTTPS :443 from 0.0.0.0/0 (ACM SSL)',
    egressRules: 'All outbound traffic allowed to Private App tier',
    components: ['Application Load Balancer (ALB)', 'AWS NAT Gateway 1 & 2', 'Bastion Host (Optional)'],
    color: 'bg-emerald-500/10 text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    tier: 'Private App',
    azA: '10.0.3.0/24 (ap-south-2a)',
    azB: '10.0.4.0/24 (ap-south-2b)',
    routeTarget: '0.0.0.0/0 → NAT Gateway (nat-01b44)',
    ingressRules: 'TCP :3000 strictly from ALB Security Group',
    egressRules: 'Outbound HTTP/HTTPS strictly via NAT Gateway (No Public IP)',
    components: ['AWS ECS Fargate Container Tasks', 'Lambda Eni Interfaces', 'CloudWatch Agent Exporter'],
    color: 'bg-blue-500/10 text-blue-400',
    borderColor: 'border-blue-500/30',
  },
  {
    tier: 'Isolated DB',
    azA: '10.0.5.0/24 (ap-south-2a)',
    azB: '10.0.6.0/24 (ap-south-2b)',
    routeTarget: 'Local VPC only (10.0.0.0/16). ZERO Internet Route.',
    ingressRules: 'TCP :5432 strictly from RDS Proxy Security Group',
    egressRules: 'Zero egress routing to internet or external endpoints',
    components: ['Amazon RDS PostgreSQL 16 (Multi-AZ)', 'Amazon RDS Proxy', 'DB Subnet Group'],
    color: 'bg-purple-500/10 text-purple',
    borderColor: 'border-purple/30',
  },
];

export default function SubnetVisualizer() {
  const [selectedTier, setSelectedTier] = useState<number>(0);

  const active = SUBNETS[selectedTier];

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUBNETS.map((sub, idx) => (
          <button
            key={sub.tier}
            onClick={() => setSelectedTier(idx)}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedTier === idx
                ? 'bg-surface-50 ' + sub.borderColor + ' shadow-lg shadow-black/40 ring-1 ring-accent/30'
                : 'bg-surface-100 border-border-base hover:border-border-highlight'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${sub.color}`}>
                TIER 0{idx + 1}
              </span>
              {selectedTier === idx && (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              )}
            </div>

            <h4 className="text-base font-bold text-white font-mono">{sub.tier} Subnets</h4>
            <p className="text-xs text-muted-dim font-mono mt-1">{sub.azA}</p>
          </button>
        ))}
      </div>

      {/* Selected Tier Deep-Dive Details */}
      <div className="bg-surface-100 border border-border-base rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <Badge variant={selectedTier === 0 ? 'emerald' : selectedTier === 1 ? 'blue' : 'purple'}>
              VPC CIDR: 10.0.0.0/16 · AWS ap-south-2
            </Badge>
            <h3 className="text-xl font-bold text-white font-mono mt-1">
              {active.tier} Tier Routing & Security Posture
            </h3>
          </div>
          <span className="text-xs font-mono text-muted-dim bg-surface-200 px-3 py-1.5 rounded-lg border border-border-subtle self-start sm:self-auto">
            Zero-Trust Isolation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          {/* Subnet CIDRs */}
          <div className="p-4 rounded-xl bg-surface-200 border border-border-subtle flex flex-col gap-2">
            <span className="text-muted-dark uppercase tracking-wider font-semibold">
              Availability Zone Allocations
            </span>
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Zone A: {active.azA}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Zone B: {active.azB}</span>
            </div>
          </div>

          {/* Route Table Destination */}
          <div className="p-4 rounded-xl bg-surface-200 border border-border-subtle flex flex-col gap-2">
            <span className="text-muted-dark uppercase tracking-wider font-semibold">
              Route Table Default Egress
            </span>
            <div className="text-accent-text font-bold leading-relaxed">
              {active.routeTarget}
            </div>
          </div>

          {/* Ingress Security Group Rules */}
          <div className="p-4 rounded-xl bg-surface-200 border border-border-subtle flex flex-col gap-2">
            <span className="text-muted-dark uppercase tracking-wider font-semibold">
              Security Group Ingress
            </span>
            <p className="text-muted-light leading-relaxed">{active.ingressRules}</p>
          </div>

          {/* Egress Security Group Rules */}
          <div className="p-4 rounded-xl bg-surface-200 border border-border-subtle flex flex-col gap-2">
            <span className="text-muted-dark uppercase tracking-wider font-semibold">
              Security Group Egress
            </span>
            <p className="text-muted-light leading-relaxed">{active.egressRules}</p>
          </div>
        </div>

        {/* Attached Infrastructure Resources */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono text-muted-dark uppercase tracking-wider font-semibold">
            Provisioned Infrastructure Resources in this Tier
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {active.components.map((comp, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-[#070c0a] border border-border-subtle text-xs font-mono text-[#d1dfd7] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
