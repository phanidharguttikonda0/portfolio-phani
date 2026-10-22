'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Shield,
  Layers,
  Zap,
  Database,
  Cloud,
  Lock,
  ArrowRight,
  Info,
  DollarSign,
  FileCode,
  X,
  ExternalLink,
} from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Badge } from '@/components/ui/Badge';

export type DiagramMode = 'request' | 'async' | 'network';

interface ArchNode {
  id: string;
  name: string;
  type: string;
  category: 'ingress' | 'compute' | 'database' | 'queue' | 'lambda' | 'storage';
  description: string;
  specs: string[];
  monthlyCost: string;
  terraform: string;
}

const NODES_DATA: Record<string, ArchNode> = {
  waf_alb: {
    id: 'waf_alb',
    name: 'AWS WAF + ALB',
    type: 'Application Load Balancer',
    category: 'ingress',
    description:
      'Terminates HTTPS traffic via AWS ACM certificates in ap-south-2. Rate limits abuse (max 2,000 req/5m) and forwards traffic across private ECS target groups.',
    specs: ['TLS 1.3 Termination', 'Cross-zone load balancing', 'HTTP/2 enabled', 'Target health checks :3000/health'],
    monthlyCost: '$22.50 / mo',
    terraform: `resource "aws_lb" "main" {
  name               = "paatam-prod-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id
  enable_deletion_protection = true
}`,
  },
  ecs_fargate: {
    id: 'ecs_fargate',
    name: 'ECS Fargate Tasks',
    type: 'Serverless Container Cluster',
    category: 'compute',
    description:
      'Auto-scaling Express/TypeScript tasks running inside private subnets without public IPs. Scales dynamically between 2 and 8 tasks based on CPU/Memory CloudWatch metrics.',
    specs: ['2 Desired Tasks (0.5 vCPU / 1GB RAM)', 'Zero direct public internet access', 'Pino async stdout streaming to CloudWatch'],
    monthlyCost: '$30.24 / mo',
    terraform: `resource "aws_ecs_service" "api" {
  name            = "paatam-api"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 2
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }
}`,
  },
  rds_proxy: {
    id: 'rds_proxy',
    name: 'Amazon RDS Proxy',
    type: 'Managed DB Connection Pooler',
    category: 'database',
    description:
      'Multiplexes thousands of microservice and Lambda connections into an isolated Postgres instance, preventing connection starvation and pool exhaustion during exam burst uploads.',
    specs: ['Max pool idle timeout: 120s', 'PostgreSQL 16 native auth via Secrets Manager', 'Eliminates 90% connection setup overhead'],
    monthlyCost: '$18.00 / mo',
    terraform: `resource "aws_db_proxy" "postgres" {
  name                   = "paatam-rds-proxy"
  engine_family          = "POSTGRESQL"
  role_arn               = aws_iam_role.rds_proxy.arn
  vpc_subnet_ids         = aws_subnet.isolated_db[*].id
  require_tls            = true
  auth {
    auth_scheme = "SECRETS"
    secret_arn  = aws_secretsmanager_secret.db_credentials.arn
  }
}`,
  },
  rds_db: {
    id: 'rds_db',
    name: 'Amazon RDS PostgreSQL 16',
    type: 'Primary Relational Database',
    category: 'database',
    description:
      'Isolated inside dedicated DB subnets without NAT egress. Enforces multi-tenant data partitioning, Sonyflake 64-bit distributed IDs, and composite indexes for fast rubric evaluation queries.',
    specs: ['db.t4g.small (2 vCPU, 2GB RAM)', '50GB gp3 SSD (3,000 IOPS)', 'Automated daily snapshots + 7-day retention'],
    monthlyCost: '$34.50 / mo',
    terraform: `resource "aws_db_instance" "postgres" {
  identifier           = "paatam-db-prod"
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.t4g.small"
  allocated_storage    = 50
  db_subnet_group_name = aws_db_subnet_group.isolated.name
  publicly_accessible  = false
}`,
  },
  sqs_ocr: {
    id: 'sqs_ocr',
    name: 'SQS: ocr-queue',
    type: 'Decoupled Message Buffer',
    category: 'queue',
    description:
      'Buffers document parsing tasks. Configured with a 15-minute visibility timeout to accommodate large multi-page student exam PDFs without dropping or duplicating jobs.',
    specs: ['15-minute visibility timeout', 'Max receive count: 3', 'Dead-Letter Queue attached', 'KMS Server-side encryption'],
    monthlyCost: '$1.20 / mo',
    terraform: `resource "aws_sqs_queue" "ocr_queue" {
  name                       = "paatam-ocr-queue"
  visibility_timeout_seconds = 900
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.ocr_dlq.arn
    maxReceiveCount     = 3
  })
}`,
  },
  lambda_ocr: {
    id: 'lambda_ocr',
    name: 'Lambda: OCR Extractor',
    type: 'Serverless Worker Function',
    category: 'lambda',
    description:
      'Extracts handwritten Indic and English script from PDF slices stored in S3. Processes batches asynchronously and queues evaluation payloads into SQS: eval-queue.',
    specs: ['1,024 MB Memory allocation', '300s Execution timeout', 'ARM64 Graviton runtime for 20% lower cost'],
    monthlyCost: '$8.40 / mo',
    terraform: `resource "aws_lambda_function" "ocr_extractor" {
  function_name = "paatam-ocr-extractor"
  runtime       = "nodejs20.x"
  architectures = ["arm64"]
  memory_size   = 1024
  timeout       = 300
  role          = aws_iam_role.lambda_ocr.arn
}`,
  },
  sqs_dlq: {
    id: 'sqs_dlq',
    name: '4x Dead-Letter Queues (DLQs)',
    type: 'Failure Quarantine & Audit',
    category: 'queue',
    description:
      'Quarantines malformed PDFs or AI timeout failures with 14-day message retention. Triggers CloudWatch alarm thresholds for team Slack notifications.',
    specs: ['14-day message retention (1,209,600s)', 'CloudWatch Alarm: ApproximateNumberOfMessagesVisible > 0', 'Zero silent job drops'],
    monthlyCost: '$0.50 / mo',
    terraform: `resource "aws_sqs_queue" "ocr_dlq" {
  name                      = "paatam-ocr-dlq"
  message_retention_seconds = 1209600
}`,
  },
  sweeper_cron: {
    id: 'sweeper_cron',
    name: 'EventBridge Sweeper Cron',
    type: 'Self-Healing Orchestrator',
    category: 'lambda',
    description:
      'Scheduled rule firing every 15 minutes. Wakes the Sweeper Lambda to query Postgres for orphaned evaluation jobs stuck in-flight and safely re-enqueues them.',
    specs: ['Cron: rate(15 minutes)', 'Idempotent state verification', 'Automatic self-healing recovery'],
    monthlyCost: '$0.80 / mo',
    terraform: `resource "aws_cloudwatch_event_rule" "sweeper" {
  name                = "paatam-sweeper-trigger"
  schedule_expression = "rate(15 minutes)"
}
resource "aws_cloudwatch_event_target" "sweeper_target" {
  rule      = aws_cloudwatch_event_rule.sweeper.name
  target_id = "SweeperLambda"
  arn       = aws_lambda_function.sweeper.arn
}`,
  },
};

export default function InteractiveDiagram() {
  const [activeMode, setActiveMode] = useState<DiagramMode>('request');
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(NODES_DATA.waf_alb);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tab Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-xl bg-surface-100 border border-border-base">
        <div className="flex items-center gap-2">
          {(
            [
              { id: 'request', label: '1. Request Flow (Ingress)', color: 'border-accent' },
              { id: 'async', label: '2. Async Serverless Pipeline', color: 'border-purple' },
              { id: 'network', label: '3. Network Security & Subnets', color: 'border-blue' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMode(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeMode === tab.id
                  ? 'bg-surface-50 text-white border border-border-highlight shadow-sm'
                  : 'text-muted-dim hover:text-muted hover:bg-surface-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono text-muted-dim flex items-center gap-1.5 px-2">
          <Info className="w-3.5 h-3.5 text-accent" />
          Click any component to inspect Terraform & cost
        </span>
      </div>

      {/* Main Canvas + Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Diagram Canvas */}
        <div className="lg:col-span-8 bg-[#070c0a] border border-border-base rounded-2xl p-6 min-h-[440px] flex flex-col justify-between relative overflow-hidden shadow-2xl">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Mode Title & Badges */}
          <div className="relative z-10 flex items-center justify-between border-b border-border-subtle pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-muted-light font-bold">
                {activeMode === 'request' && 'Production Ingress & Compute Topology'}
                {activeMode === 'async' && 'Decoupled Asynchronous Grading Pipeline'}
                {activeMode === 'network' && '3-Tier Isolated VPC Security Zones'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-dim bg-surface-200 px-2 py-0.5 rounded border border-border-subtle">
              AWS ap-south-2
            </span>
          </div>

          {/* Dynamic SVG / Node Diagram */}
          <div className="relative z-10 my-auto py-6 flex flex-col gap-6">
            {activeMode === 'request' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Step 1: Client */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-100 border border-border-subtle w-full sm:w-28">
                  <Cloud className="w-6 h-6 text-muted-light mb-1" />
                  <span className="text-xs font-mono font-bold text-white">Browser</span>
                  <span className="text-[10px] text-muted-dim">HTTPS :443</span>
                </div>

                <ArrowRight className="w-5 h-5 text-accent-text shrink-0 rotate-90 sm:rotate-0" />

                {/* Step 2: ALB */}
                <button
                  onClick={() => setSelectedNode(NODES_DATA.waf_alb)}
                  className={`flex flex-col items-center text-center p-3.5 rounded-xl border transition-all cursor-pointer w-full sm:w-36 ${
                    selectedNode?.id === 'waf_alb'
                      ? 'bg-surface-50 border-accent shadow-lg shadow-accent/20'
                      : 'bg-surface-100 border-border-base hover:border-accent/40'
                  }`}
                >
                  <Shield className="w-6 h-6 text-emerald-400 mb-1" />
                  <span className="text-xs font-mono font-bold text-white">ALB + WAF</span>
                  <span className="text-[10px] text-accent-text font-mono">Public Subnet</span>
                </button>

                <ArrowRight className="w-5 h-5 text-accent-text shrink-0 rotate-90 sm:rotate-0" />

                {/* Step 3: ECS */}
                <button
                  onClick={() => setSelectedNode(NODES_DATA.ecs_fargate)}
                  className={`flex flex-col items-center text-center p-3.5 rounded-xl border transition-all cursor-pointer w-full sm:w-36 ${
                    selectedNode?.id === 'ecs_fargate'
                      ? 'bg-surface-50 border-accent shadow-lg shadow-accent/20'
                      : 'bg-surface-100 border-border-base hover:border-accent/40'
                  }`}
                >
                  <Server className="w-6 h-6 text-blue-400 mb-1" />
                  <span className="text-xs font-mono font-bold text-white">ECS Fargate</span>
                  <span className="text-[10px] text-blue-300 font-mono">Private Subnet</span>
                </button>

                <ArrowRight className="w-5 h-5 text-accent-text shrink-0 rotate-90 sm:rotate-0" />

                {/* Step 4: RDS Proxy & Postgres */}
                <div className="flex flex-col gap-2 w-full sm:w-36">
                  <button
                    onClick={() => setSelectedNode(NODES_DATA.rds_proxy)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedNode?.id === 'rds_proxy'
                        ? 'bg-surface-50 border-accent shadow-md shadow-accent/20'
                        : 'bg-surface-100 border-border-base hover:border-accent/40'
                    }`}
                  >
                    <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="text-left">
                      <div className="text-[11px] font-mono font-bold text-white">RDS Proxy</div>
                      <div className="text-[9px] text-muted-dim font-mono">Pooling</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedNode(NODES_DATA.rds_db)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedNode?.id === 'rds_db'
                        ? 'bg-surface-50 border-accent shadow-md shadow-accent/20'
                        : 'bg-surface-100 border-border-base hover:border-accent/40'
                    }`}
                  >
                    <Database className="w-4 h-4 text-accent shrink-0" />
                    <div className="text-left">
                      <div className="text-[11px] font-mono font-bold text-white">PostgreSQL 16</div>
                      <div className="text-[9px] text-accent-text font-mono">Isolated DB</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {activeMode === 'async' && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Step 1: SQS OCR */}
                <button
                  onClick={() => setSelectedNode(NODES_DATA.sqs_ocr)}
                  className={`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedNode?.id === 'sqs_ocr'
                      ? 'bg-surface-50 border-purple shadow-lg shadow-purple/20'
                      : 'bg-surface-100 border-border-base hover:border-purple/40'
                  }`}
                >
                  <Layers className="w-5 h-5 text-purple mb-1.5" />
                  <span className="text-xs font-mono font-bold text-white">SQS: ocr-queue</span>
                  <span className="text-[10px] text-purple font-mono mt-0.5">15m Visibility</span>
                  <p className="text-[10px] text-muted-dim mt-1">Multi-page PDFs buffer</p>
                </button>

                {/* Step 2: Lambda OCR */}
                <button
                  onClick={() => setSelectedNode(NODES_DATA.lambda_ocr)}
                  className={`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedNode?.id === 'lambda_ocr'
                      ? 'bg-surface-50 border-purple shadow-lg shadow-purple/20'
                      : 'bg-surface-100 border-border-base hover:border-purple/40'
                  }`}
                >
                  <Zap className="w-5 h-5 text-amber mb-1.5" />
                  <span className="text-xs font-mono font-bold text-white">Lambda: OCR</span>
                  <span className="text-[10px] text-amber font-mono mt-0.5">ARM64 Graviton</span>
                  <p className="text-[10px] text-muted-dim mt-1">Extracts handwritten text</p>
                </button>

                {/* Step 3: DLQ */}
                <button
                  onClick={() => setSelectedNode(NODES_DATA.sqs_dlq)}
                  className={`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedNode?.id === 'sqs_dlq'
                      ? 'bg-surface-50 border-red shadow-lg shadow-red/20'
                      : 'bg-surface-100 border-border-base hover:border-red/40'
                  }`}
                >
                  <Shield className="w-5 h-5 text-red mb-1.5" />
                  <span className="text-xs font-mono font-bold text-white">4x DLQ Queues</span>
                  <span className="text-[10px] text-red font-mono mt-0.5">14-Day Retention</span>
                  <p className="text-[10px] text-muted-dim mt-1">Captures failed retries</p>
                </button>

                {/* Step 4: Sweeper */}
                <button
                  onClick={() => setSelectedNode(NODES_DATA.sweeper_cron)}
                  className={`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedNode?.id === 'sweeper_cron'
                      ? 'bg-surface-50 border-accent shadow-lg shadow-accent/20'
                      : 'bg-surface-100 border-border-base hover:border-accent/40'
                  }`}
                >
                  <Zap className="w-5 h-5 text-accent-text mb-1.5" />
                  <span className="text-xs font-mono font-bold text-white">EventBridge Sweeper</span>
                  <span className="text-[10px] text-accent-text font-mono mt-0.5">Cron 15m</span>
                  <p className="text-[10px] text-muted-dim mt-1">Re-enqueues orphaned jobs</p>
                </button>
              </div>
            )}

            {activeMode === 'network' && (
              <div className="flex flex-col gap-3 font-mono">
                {/* Public Tier */}
                <div
                  onClick={() => setSelectedNode(NODES_DATA.waf_alb)}
                  className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      PUBLIC SUBNET
                    </span>
                    <span className="text-xs text-white">10.0.1.0/24 & 10.0.2.0/24</span>
                  </div>
                  <span className="text-xs text-muted-light">Internet Gateway · ALB · NAT GW</span>
                </div>

                {/* Private Tier */}
                <div
                  onClick={() => setSelectedNode(NODES_DATA.ecs_fargate)}
                  className="p-3.5 rounded-xl border border-blue-500/30 bg-blue-500/5 flex items-center justify-between cursor-pointer hover:border-blue-500 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold">
                      PRIVATE APP SUBNET
                    </span>
                    <span className="text-xs text-white">10.0.3.0/24 & 10.0.4.0/24</span>
                  </div>
                  <span className="text-xs text-muted-light">ECS Fargate · Outbound via NAT GW only</span>
                </div>

                {/* Isolated Tier */}
                <div
                  onClick={() => setSelectedNode(NODES_DATA.rds_db)}
                  className="p-3.5 rounded-xl border border-purple/30 bg-purple/5 flex items-center justify-between cursor-pointer hover:border-purple transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-purple/20 text-purple text-xs font-bold">
                      ISOLATED DB SUBNET
                    </span>
                    <span className="text-xs text-white">10.0.5.0/24 & 10.0.6.0/24</span>
                  </div>
                  <span className="text-xs text-muted-light">RDS Proxy · PostgreSQL 16 · Zero Egress</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Metric Bar */}
          <div className="relative z-10 pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between text-xs font-mono text-muted-dim gap-2">
            <span>Region: AWS ap-south-2 (Hyderabad)</span>
            <span>IaC: 100% Terraform (S3 State + DynamoDB Lock)</span>
          </div>
        </div>

        {/* Component Inspector Drawer */}
        <div className="lg:col-span-4 bg-surface-100 border border-border-base rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          {selectedNode ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="emerald" size="sm">
                    {selectedNode.type}
                  </Badge>
                  <h3 className="text-lg font-bold text-white font-mono mt-1">
                    {selectedNode.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-accent-text">
                    {selectedNode.monthlyCost}
                  </div>
                  <div className="text-[10px] text-muted-dim font-mono">est. run-rate</div>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                {selectedNode.description}
              </p>

              {/* Specs */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-mono text-muted-dark uppercase tracking-wider font-semibold">
                  Key Specifications
                </span>
                <ul className="space-y-1 text-xs text-[#d1dfd7] font-mono">
                  {selectedNode.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terraform Snippet */}
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-dark">
                  <span className="uppercase tracking-wider font-semibold">
                    Terraform Definition
                  </span>
                  <span className="text-[10px] text-accent">HCL</span>
                </div>
                <CodeBlock code={selectedNode.terraform} language="hcl" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-dim">
              <Info className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-xs font-mono">Click any component to inspect its architecture details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
