'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Zap, Server, Database, Cloud, Lock, ArrowRight, Copy, Check } from 'lucide-react';
import { ARCH_PILLS } from '@/lib/constants';

type ArchTab = 'request' | 'async' | 'network';

const TABS: { id: ArchTab; label: string; color: string }[] = [
  { id: 'request', label: 'Request Flow', color: 'text-accent-text' },
  { id: 'async', label: 'Async Pipeline', color: 'text-purple' },
  { id: 'network', label: 'Network Security', color: 'text-blue-text' },
];

const TERRAFORM_SNIPPETS: Record<ArchTab, string> = {
  request: `# ALB → ECS Fargate Service
resource "aws_ecs_service" "paatam_api" {
  name            = "paatam-api"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "api"
    container_port   = 3000
  }

  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }
}`,
  async: `# SQS Queue with Dead-Letter Queue
resource "aws_sqs_queue" "ocr_queue" {
  name                       = "paatam-ocr-queue"
  visibility_timeout_seconds = 900  # 15 minutes
  message_retention_seconds  = 1209600  # 14 days

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.ocr_dlq.arn
    maxReceiveCount     = 3
  })
}

resource "aws_sqs_queue" "ocr_dlq" {
  name                      = "paatam-ocr-dlq"
  message_retention_seconds = 1209600
}`,
  network: `# 3-Tier VPC Subnets
resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index}.0/24"
  availability_zone = data.aws_availability_zones.az.names[count.index]
  map_public_ip_on_launch = true
  tags = { Name = "public-\${count.index}" }
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.az.names[count.index]
  tags = { Name = "private-app-\${count.index}" }
}

resource "aws_subnet" "database" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index + 20}.0/24"
  availability_zone = data.aws_availability_zones.az.names[count.index]
  tags = { Name = "isolated-db-\${count.index}" }
}`,
};

export default function PaatamCaseStudy() {
  const [activeTab, setActiveTab] = useState<ArchTab>('request');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(TERRAFORM_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
        <div>
          <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
            Featured Production Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Paatam: Enterprise AI SaaS & Cloud Infra
          </h2>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded bg-blue-dim text-blue-text border border-blue/20 self-start sm:self-auto">
          AWS ap-south-2 · 100% Terraform
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-surface-100 border border-border-base rounded-2xl p-6 lg:p-8 flex flex-col gap-6"
      >
        <p className="text-sm text-muted leading-relaxed">
          Architected the full enterprise backend and cloud infrastructure from High-Level
          Design (HLD) to production. Built a 4-tier tenant hierarchy (
          <code className="text-accent-text font-mono text-xs">
            Corporate ➔ Branch ➔ Class ➔ Section
          </code>
          ) with zero-trust RBAC across 5 user roles, 153 live REST endpoints, and a
          decoupled serverless AI grading pipeline.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface-300 border border-border-subtle card-hover">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
              <Shield className="w-4 h-4 text-accent" />
              3-Tier VPC & RDS Proxy
            </div>
            <p className="text-xs text-muted-dim leading-normal">
              Isolated database subnets with NAT Gateway routing and RDS Proxy
              connection multiplexing to stop connection starvation during
              35-student exam bursts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-300 border border-border-subtle card-hover">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
              <Layers className="w-4 h-4 text-purple" />
              Decoupled Async Pipeline
            </div>
            <p className="text-xs text-muted-dim leading-normal">
              4 Amazon SQS queues with 15-min visibility timeouts, 4 DLQs, and 5
              Lambdas handling document extraction, PDF slicing, and AI rubric
              grading.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-300 border border-border-subtle card-hover">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
              <Zap className="w-4 h-4 text-amber" />
              Self-Healing Sweeper
            </div>
            <p className="text-xs text-muted-dim leading-normal">
              EventBridge scheduled cron wakes a sweeper Lambda every 15 minutes
              to inspect Postgres for orphaned jobs and safely re-enqueue them.
            </p>
          </div>
        </div>

        {/* Interactive Architecture Visualizer */}
        <div className="mt-4">
          <div className="flex items-center gap-1 mb-4 border-b border-border-subtle">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-mono transition-all border-b-2 ${
                  activeTab === tab.id
                    ? `${tab.color} border-accent bg-accent-dim`
                    : 'text-muted-dim border-transparent hover:text-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Architecture SVG Diagram */}
          <div className="bg-surface-300 rounded-xl border border-border-subtle p-6 min-h-[300px]">
            {activeTab === 'request' && <RequestFlowDiagram />}
            {activeTab === 'async' && <AsyncPipelineDiagram />}
            {activeTab === 'network' && <NetworkDiagram />}
          </div>

          {/* Terraform Snippet */}
          <div className="mt-4 rounded-xl overflow-hidden border border-border-subtle">
            <div className="flex items-center justify-between px-4 py-2 bg-surface-300 border-b border-border-subtle">
              <span className="text-[10px] font-mono text-muted-dim">
                terraform/{activeTab}.tf
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[10px] font-mono text-muted-dim hover:text-accent-text transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-accent" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-surface-200 text-xs font-mono text-muted-light overflow-x-auto leading-relaxed">
              {TERRAFORM_SNIPPETS[activeTab]}
            </pre>
          </div>
        </div>

        {/* Architecture Pill Tags & Deep Dive Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-light">
            {ARCH_PILLS.map((pill) => (
              <span
                key={pill}
                className="px-2.5 py-1 rounded bg-surface-300 border border-border-subtle hover:border-accent/30 transition-colors"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/case-studies/paatam"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent-text hover:underline"
            >
              Full SaaS Case Study →
            </a>
            <span className="text-muted-dark">|</span>
            <a
              href="/architecture"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-text hover:underline"
            >
              3-Tier Topology →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ===== SVG DIAGRAM COMPONENTS ===== */

function RequestFlowDiagram() {
  const nodes = [
    { id: 'user', x: 50, y: 60, label: 'Users / Clients', icon: '👤', color: '#10b981' },
    { id: 'waf', x: 200, y: 60, label: 'WAF', icon: '🛡️', color: '#3b82f6' },
    { id: 'alb', x: 350, y: 60, label: 'ALB (:443)', icon: '⚖️', color: '#3b82f6' },
    { id: 'ecs', x: 520, y: 60, label: 'ECS Fargate', icon: '📦', color: '#10b981' },
    { id: 's3', x: 520, y: 160, label: 'S3 Bucket', icon: '📁', color: '#f59e0b' },
    { id: 'rds', x: 700, y: 60, label: 'RDS Proxy', icon: '🗄️', color: '#a855f7' },
    { id: 'pg', x: 700, y: 160, label: 'PostgreSQL 16', icon: '💾', color: '#a855f7' },
  ];

  return (
    <div className="relative w-full overflow-x-auto">
      <svg viewBox="0 0 800 220" className="w-full min-w-[600px] h-auto">
        {/* Arrows */}
        <defs>
          <marker id="arrowhead-req" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#345041" />
          </marker>
        </defs>

        {/* Connection lines */}
        <line x1="110" y1="65" x2="185" y2="65" stroke="#345041" strokeWidth="2" markerEnd="url(#arrowhead-req)" />
        <line x1="260" y1="65" x2="335" y2="65" stroke="#345041" strokeWidth="2" markerEnd="url(#arrowhead-req)" />
        <line x1="420" y1="65" x2="500" y2="65" stroke="#345041" strokeWidth="2" markerEnd="url(#arrowhead-req)" />
        <line x1="580" y1="65" x2="680" y2="65" stroke="#345041" strokeWidth="2" markerEnd="url(#arrowhead-req)" />
        <line x1="540" y1="90" x2="540" y2="145" stroke="#345041" strokeWidth="2" markerEnd="url(#arrowhead-req)" />
        <line x1="720" y1="90" x2="720" y2="145" stroke="#345041" strokeWidth="2" markerEnd="url(#arrowhead-req)" />

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x - 10}
              y={node.y - 25}
              width="120"
              height="50"
              rx="8"
              fill="#0d1512"
              stroke={node.color}
              strokeWidth="1.5"
              opacity="0.9"
            />
            <text
              x={node.x + 50}
              y={node.y - 5}
              textAnchor="middle"
              fill={node.color}
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {node.label}
            </text>
            <text x={node.x + 50} y={node.y + 14} textAnchor="middle" fontSize="16">
              {node.icon}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function AsyncPipelineDiagram() {
  const stages = [
    { label: 'S3 Upload', sub: 'Presigned URL', color: '#f59e0b', x: 30 },
    { label: 'SQS: ocr-q', sub: '15min timeout', color: '#a855f7', x: 180 },
    { label: 'λ: OCR', sub: 'AI Extraction', color: '#10b981', x: 330 },
    { label: 'SQS: eval-q', sub: 'Evaluation', color: '#a855f7', x: 480 },
    { label: 'λ: Grade', sub: 'Rubric Scoring', color: '#10b981', x: 630 },
  ];

  return (
    <div className="relative w-full overflow-x-auto">
      <svg viewBox="0 0 800 200" className="w-full min-w-[600px] h-auto">
        <defs>
          <marker id="arrowhead-async" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#345041" />
          </marker>
        </defs>

        {/* Connection lines */}
        {stages.slice(0, -1).map((stage, i) => (
          <line
            key={i}
            x1={stage.x + 120}
            y1="55"
            x2={stages[i + 1].x + 10}
            y2="55"
            stroke="#345041"
            strokeWidth="2"
            markerEnd="url(#arrowhead-async)"
          />
        ))}

        {/* DLQ Lines */}
        <line x1="230" y1="80" x2="230" y2="130" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrowhead-async)" />
        <line x1="530" y1="80" x2="530" y2="130" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrowhead-async)" />

        {/* Stage boxes */}
        {stages.map((stage) => (
          <g key={stage.label}>
            <rect
              x={stage.x}
              y="25"
              width="130"
              height="55"
              rx="8"
              fill="#0d1512"
              stroke={stage.color}
              strokeWidth="1.5"
            />
            <text
              x={stage.x + 65}
              y="48"
              textAnchor="middle"
              fill={stage.color}
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {stage.label}
            </text>
            <text
              x={stage.x + 65}
              y="66"
              textAnchor="middle"
              fill="#718b7e"
              fontSize="9"
              fontFamily="monospace"
            >
              {stage.sub}
            </text>
          </g>
        ))}

        {/* DLQ boxes */}
        {[
          { x: 175, label: 'DLQ: ocr' },
          { x: 475, label: 'DLQ: eval' },
        ].map((dlq) => (
          <g key={dlq.label}>
            <rect
              x={dlq.x}
              y="135"
              width="110"
              height="40"
              rx="6"
              fill="rgba(239, 68, 68, 0.08)"
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <text
              x={dlq.x + 55}
              y="155"
              textAnchor="middle"
              fill="#ef4444"
              fontSize="10"
              fontFamily="monospace"
            >
              {dlq.label}
            </text>
            <text
              x={dlq.x + 55}
              y="168"
              textAnchor="middle"
              fill="#ef4444"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              14d retention
            </text>
          </g>
        ))}

        {/* Sweeper */}
        <rect x="310" y="135" width="140" height="40" rx="6" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" strokeWidth="1" />
        <text x="380" y="153" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">
          λ: Sweeper (15min)
        </text>
        <text x="380" y="166" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" opacity="0.6">
          EventBridge Cron
        </text>
      </svg>
    </div>
  );
}

function NetworkDiagram() {
  return (
    <div className="relative w-full overflow-x-auto">
      <svg viewBox="0 0 800 280" className="w-full min-w-[600px] h-auto">
        {/* VPC Border */}
        <rect x="20" y="10" width="760" height="260" rx="12" fill="none" stroke="#22352b" strokeWidth="2" strokeDasharray="8" />
        <text x="40" y="32" fill="#345041" fontSize="11" fontFamily="monospace" fontWeight="bold">
          VPC: 10.0.0.0/16 (ap-south-2)
        </text>

        {/* Public Subnet */}
        <rect x="40" y="45" width="220" height="85" rx="8" fill="rgba(59, 130, 246, 0.06)" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="55" y="63" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">
          PUBLIC SUBNETS
        </text>
        <text x="55" y="76" fill="#718b7e" fontSize="8" fontFamily="monospace">
          10.0.0.0/24, 10.0.1.0/24
        </text>

        <rect x="60" y="85" width="80" height="32" rx="5" fill="#0d1512" stroke="#3b82f6" strokeWidth="1" />
        <text x="100" y="105" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="monospace">
          ALB :443
        </text>

        <rect x="160" y="85" width="80" height="32" rx="5" fill="#0d1512" stroke="#3b82f6" strokeWidth="1" />
        <text x="200" y="105" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="monospace">
          NAT GW
        </text>

        {/* Private Subnet */}
        <rect x="290" y="45" width="220" height="85" rx="8" fill="rgba(16, 185, 129, 0.06)" stroke="#10b981" strokeWidth="1.5" />
        <text x="305" y="63" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">
          PRIVATE APP SUBNETS
        </text>
        <text x="305" y="76" fill="#718b7e" fontSize="8" fontFamily="monospace">
          10.0.10.0/24, 10.0.11.0/24
        </text>

        <rect x="310" y="85" width="80" height="32" rx="5" fill="#0d1512" stroke="#10b981" strokeWidth="1" />
        <text x="350" y="105" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">
          ECS Task 1
        </text>

        <rect x="410" y="85" width="80" height="32" rx="5" fill="#0d1512" stroke="#10b981" strokeWidth="1" />
        <text x="450" y="105" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">
          ECS Task 2
        </text>

        {/* Isolated DB Subnet */}
        <rect x="540" y="45" width="220" height="85" rx="8" fill="rgba(168, 85, 247, 0.06)" stroke="#a855f7" strokeWidth="1.5" />
        <text x="555" y="63" fill="#a855f7" fontSize="10" fontFamily="monospace" fontWeight="bold">
          ISOLATED DB SUBNETS
        </text>
        <text x="555" y="76" fill="#718b7e" fontSize="8" fontFamily="monospace">
          10.0.20.0/24, 10.0.21.0/24
        </text>

        <rect x="560" y="85" width="80" height="32" rx="5" fill="#0d1512" stroke="#a855f7" strokeWidth="1" />
        <text x="600" y="105" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace">
          RDS Proxy
        </text>

        <rect x="660" y="85" width="80" height="32" rx="5" fill="#0d1512" stroke="#a855f7" strokeWidth="1" />
        <text x="700" y="105" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace">
          PostgreSQL
        </text>

        {/* Arrows between subnets */}
        <defs>
          <marker id="arrowhead-net" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#345041" />
          </marker>
        </defs>
        <line x1="260" y1="100" x2="290" y2="100" stroke="#345041" strokeWidth="2" markerEnd="url(#arrowhead-net)" />
        <line x1="510" y1="100" x2="540" y2="100" stroke="#345041" strokeWidth="2" markerEnd="url(#arrowhead-net)" />

        {/* Security Groups */}
        <rect x="40" y="155" width="720" height="100" rx="8" fill="rgba(239, 68, 68, 0.04)" stroke="#ef4444" strokeWidth="1" strokeDasharray="6" />
        <text x="55" y="175" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
          SECURITY GROUPS & NACLs
        </text>

        <rect x="60" y="190" width="150" height="50" rx="6" fill="#0d1512" stroke="#22352b" strokeWidth="1" />
        <text x="135" y="210" textAnchor="middle" fill="#8ca396" fontSize="9" fontFamily="monospace">
          SG: alb-public
        </text>
        <text x="135" y="225" textAnchor="middle" fill="#718b7e" fontSize="8" fontFamily="monospace">
          Ingress: 443 (0.0.0.0/0)
        </text>

        <rect x="240" y="190" width="150" height="50" rx="6" fill="#0d1512" stroke="#22352b" strokeWidth="1" />
        <text x="315" y="210" textAnchor="middle" fill="#8ca396" fontSize="9" fontFamily="monospace">
          SG: ecs-private
        </text>
        <text x="315" y="225" textAnchor="middle" fill="#718b7e" fontSize="8" fontFamily="monospace">
          Ingress: 3000 (ALB SG)
        </text>

        <rect x="420" y="190" width="150" height="50" rx="6" fill="#0d1512" stroke="#22352b" strokeWidth="1" />
        <text x="495" y="210" textAnchor="middle" fill="#8ca396" fontSize="9" fontFamily="monospace">
          SG: rds-isolated
        </text>
        <text x="495" y="225" textAnchor="middle" fill="#718b7e" fontSize="8" fontFamily="monospace">
          Ingress: 5432 (ECS SG)
        </text>

        <rect x="600" y="190" width="150" height="50" rx="6" fill="#0d1512" stroke="#22352b" strokeWidth="1" />
        <text x="675" y="210" textAnchor="middle" fill="#8ca396" fontSize="9" fontFamily="monospace">
          No Internet GW
        </text>
        <text x="675" y="225" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">
          ❌ No public access
        </text>
      </svg>
    </div>
  );
}
