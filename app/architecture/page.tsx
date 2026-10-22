import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Server, Shield, Database, Terminal, FileCode, CheckCircle2 } from 'lucide-react';
import InteractiveDiagram from '@/components/architecture/InteractiveDiagram';
import SubnetVisualizer from '@/components/architecture/SubnetVisualizer';
import CostCalculator from '@/components/architecture/CostCalculator';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Cloud Architecture & VPC Security Topology | Phanidhar Reddy',
  description:
    'Deep-dive into 3-tier AWS VPC topologies, ECS Fargate serverless clustering, RDS Proxy connection multiplexing, and modular Terraform IaC.',
};

export default function ArchitecturePage() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
        
        {/* Back navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-dim hover:text-accent-text transition-colors self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-50 border border-border-base text-xs font-mono text-accent-text">
              <Terminal className="w-3.5 h-3.5" />
              <span>PRODUCTION CLOUD ARCHITECTURE EXPLORER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              3-Tier AWS Topology & Multi-Tenant Pipeline
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
              Explore the exact cloud architecture powering enterprise SaaS applications in AWS <code className="text-emerald-300 font-mono">ap-south-2</code>. Built 100% with modular Terraform, isolated subnet boundaries, and self-healing asynchronous queues.
            </p>
          </div>
        </div>

        {/* SECTION 1: Dynamic Architecture Canvas */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
              Interactive Topology Inspector
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Live AWS Infrastructure Canvas
            </h2>
          </div>
          <InteractiveDiagram />
        </section>

        {/* SECTION 2: Subnet Visualizer */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-blue-text uppercase tracking-widest font-semibold">
              Network Isolation & CIDR Blocks
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              3-Tier Subnet Routing & Security Groups
            </h2>
          </div>
          <SubnetVisualizer />
        </section>

        {/* SECTION 3: Cost Calculator */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              Financial Transparency
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              AWS Infrastructure Run-Rate Calculator
            </h2>
          </div>
          <CostCalculator />
        </section>

        {/* Bottom CTA Card */}
        <div className="p-8 rounded-2xl bg-surface-100 border border-accent/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 glow-emerald">
          <div className="flex flex-col gap-2">
            <Badge variant="emerald" size="sm">
              ZERO-DOWNTIME INFRASTRUCTURE SPRINT
            </Badge>
            <h3 className="text-xl font-bold text-white font-mono">
              Need this exact AWS topology codified for your startup?
            </h3>
            <p className="text-xs text-muted max-w-xl">
              Turnkey 1–2 week delivery: Modular Terraform codebase, 3-tier VPC, ECS Fargate, RDS Proxy, and GitHub Actions CI/CD with full handover documentation.
            </p>
          </div>
          <a
            href="mailto:guttikondaphanidharreddy@gmail.com?subject=AWS%20Infrastructure%20Sprint%20Inquiry"
            className="px-6 py-3 rounded-lg bg-accent text-background font-bold text-xs hover:bg-accent-text transition-all shadow-lg shadow-accent/20 shrink-0 text-center"
          >
            Inquire About Infrastructure Sprint
          </a>
        </div>

      </div>
    </div>
  );
}
