import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Layers, Zap, Database, Server, CheckCircle2, GitBranch, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/CodeBlock';
import InteractiveDiagram from '@/components/architecture/InteractiveDiagram';
import SubnetVisualizer from '@/components/architecture/SubnetVisualizer';

export const metadata: Metadata = {
  title: 'Paatam SaaS Case Study: Enterprise AWS & AI Pipeline | Phanidhar Reddy',
  description:
    'Comprehensive technical breakdown of Paatam: Multi-tenant hierarchy, 153 REST endpoints, Sonyflake 64-bit IDs, RDS Proxy, and decoupled SQS/DLQ AI evaluation pipeline.',
};

export default function PaatamCaseStudyPage() {
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
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="emerald" size="sm">
                CASE STUDY 01 // ENTERPRISE AI SAAS
              </Badge>
              <span className="text-xs font-mono text-muted-dim bg-surface-200 px-2 py-0.5 rounded border border-border-subtle">
                AWS ap-south-2 · 100% Terraform
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Paatam: Enterprise AI SaaS & Cloud Infra
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
              Architected the full enterprise backend and cloud infrastructure from High-Level Design (HLD) to production deployment. Features a 4-tier tenant hierarchy, 153 live REST endpoints, zero-trust RBAC across 5 roles, and a decoupled serverless AI grading pipeline.
            </p>
          </div>
        </div>

        {/* Executive Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-surface-100 border border-border-base">
            <div className="text-3xl font-extrabold text-accent-text font-mono">153</div>
            <div className="text-xs text-muted-dim font-mono mt-1">Production REST Endpoints</div>
          </div>
          <div className="p-5 rounded-xl bg-surface-100 border border-border-base">
            <div className="text-3xl font-extrabold text-white font-mono">4-Tier</div>
            <div className="text-xs text-muted-dim font-mono mt-1">Multi-Tenant Hierarchy</div>
          </div>
          <div className="p-5 rounded-xl bg-surface-100 border border-border-base">
            <div className="text-3xl font-extrabold text-blue-text font-mono">230+</div>
            <div className="text-xs text-muted-dim font-mono mt-1">Automated Integration Tests</div>
          </div>
          <div className="p-5 rounded-xl bg-surface-100 border border-border-base">
            <div className="text-3xl font-extrabold text-purple font-mono">4 SQS + 4 DLQ</div>
            <div className="text-xs text-muted-dim font-mono mt-1">Self-Healing Pipeline</div>
          </div>
        </div>

        {/* SECTION 1: The Business Problem */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-red uppercase tracking-widest font-semibold">
              The Engineering Challenge
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Synchronous Bottlenecks in AI Exam Evaluation
            </h2>
          </div>

          <div className="bg-surface-100 border border-border-base rounded-2xl p-6 sm:p-8 flex flex-col gap-4 text-sm text-muted leading-relaxed">
            <p>
              In educational institutions, grading multi-page handwritten student exam sheets is subject to sudden, extreme traffic spikes. When 35 teachers simultaneously upload classroom exam bundles (averaging 35 multi-page PDF scripts each), synchronous HTTP processing caused:
            </p>
            <ul className="space-y-2 text-xs font-mono text-red list-disc pl-5">
              <li>HTTP 504 Gateway Timeouts while waiting for external OCR and LLM grading APIs</li>
              <li>Database connection starvation in PostgreSQL due to hundreds of open connection holds</li>
              <li>Orphaned jobs and unrecoverable silent data loss upon transient network interruptions</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: Technical Architecture Breakdown */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
              High-Level Design (HLD)
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Architecture & Data Flow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface-100 border border-border-base flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Database className="w-4 h-4 text-accent" />
                Multi-Tenant Isolation & Sonyflake IDs
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Data isolation strictly follows <code className="text-emerald-300 font-mono">Corporate ➔ Branch ➔ Class ➔ Section</code> governed by zero-trust RBAC middleware across 5 roles (Super Admin, Corporate Admin, Branch Admin, Teacher, Student). Sequential database IDs are replaced with <strong>Sonyflake 64-bit distributed IDs</strong> to prevent enumeration attacks and guarantee future horizontal sharding capability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-100 border border-border-base flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Shield className="w-4 h-4 text-blue-400" />
                Isolated 3-Tier VPC & RDS Proxy
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Deployed in AWS <code className="text-emerald-300 font-mono">ap-south-2</code> via Terraform. ECS Fargate containers run in private subnets with NAT Gateway routing. Amazon RDS Proxy sits before PostgreSQL 16, multiplexing thousands of incoming connections into a stable connection pool to eliminate exhaustion.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-100 border border-border-base flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Layers className="w-4 h-4 text-purple" />
                Decoupled Serverless Queues
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Multi-stage asynchronous pipeline: Direct S3 presigned URL uploads trigger SQS queues (<code className="text-accent-text font-mono">ocr-queue</code>, <code className="text-purple font-mono">eval-queue</code>) with 15-minute visibility timeouts. Dedicated Dead-Letter Queues (DLQs) retain failed messages for 14 days.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-100 border border-border-base flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Zap className="w-4 h-4 text-amber" />
                EventBridge Self-Healing Sweeper
              </div>
              <p className="text-xs text-muted leading-relaxed">
                An Amazon EventBridge cron trigger runs every 15 minutes, waking a Sweeper Lambda function to query Postgres for orphaned jobs stuck in-flight and automatically re-enqueue them idempotently.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Topology Explorer */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
              Live Topology Visualizer
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Paatam Request & Pipeline Canvas
            </h2>
          </div>
          <InteractiveDiagram />
        </section>

        {/* SECTION 4: Terraform Infrastructure Snippet */}
        <section className="flex flex-col gap-4">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
              Infrastructure as Code
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Core Terraform Modules
            </h2>
          </div>
          <CodeBlock
            filename="terraform/modules/ecs_rds_proxy.tf"
            language="hcl"
            code={`# RDS Proxy Configuration for Paatam SaaS
resource "aws_db_proxy" "postgres" {
  name                   = "paatam-rds-proxy"
  debug_logging          = false
  engine_family          = "POSTGRESQL"
  idle_client_timeout    = 120
  require_tls            = true
  role_arn               = aws_iam_role.rds_proxy.arn
  vpc_security_group_ids = [aws_security_group.rds_proxy.id]
  vpc_subnet_ids         = aws_subnet.isolated_db[*].id

  auth {
    auth_scheme = "SECRETS"
    description = "PostgreSQL 16 master credentials"
    iam_auth    = "DISABLED"
    secret_arn  = aws_secretsmanager_secret.db_credentials.arn
  }
}

resource "aws_db_proxy_default_target_group" "target_group" {
  db_proxy_name = aws_db_proxy.postgres.name

  connection_pool_config {
    connection_borrow_timeout    = 120
    max_connections_percent      = 90
    max_idle_connections_percent = 50
  }
}`}
          />
        </section>

      </div>
    </div>
  );
}
