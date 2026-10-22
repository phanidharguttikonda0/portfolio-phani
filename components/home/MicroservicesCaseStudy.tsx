'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, Radio, Database, MessageSquare } from 'lucide-react';

export default function MicroservicesCaseStudy() {
  return (
    <section id="case-studies" className="flex flex-col gap-8">
      <div className="border-b border-border-subtle pb-4">
        <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
          Enterprise Architecture
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          High-Throughput Microservices Platform
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-surface-100 border border-border-base rounded-2xl p-6 lg:p-8 flex flex-col gap-6"
      >
        <p className="text-sm text-muted leading-relaxed">
          Enterprise-grade microservices ecosystem with high-performance internal RPC,
          intelligent caching, and resilient event streaming for scalable backend architectures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-surface-300 border border-border-subtle card-hover">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
              <Network className="w-4 h-4 text-accent" />
              Service Topology
            </div>
            <p className="text-xs text-muted-dim leading-normal mb-3">
              Microservices ecosystem comprising API Gateway, Identity, Timeline,
              Content, and Notification services with clean domain boundaries.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['API Gateway', 'Identity', 'Timeline', 'Content', 'Notifications'].map((s) => (
                <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-dim text-accent-text border border-accent/10">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-surface-300 border border-border-subtle card-hover">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
              <Radio className="w-4 h-4 text-blue" />
              gRPC over HTTP/2
            </div>
            <p className="text-xs text-muted-dim leading-normal mb-3">
              Internal service-to-service communication via gRPC with Protobuf contracts.
              The public REST API Gateway maps gRPC status codes into standardized HTTP responses.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['gRPC', 'Protobuf', 'HTTP/2', 'REST Gateway'].map((s) => (
                <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-dim text-blue-text border border-blue/10">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-surface-300 border border-border-subtle card-hover">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
              <Database className="w-4 h-4 text-amber" />
              Redis Fan-Out Caching
            </div>
            <p className="text-xs text-muted-dim leading-normal mb-3">
              Timeline fan-out caching engine in Redis, buffering high-traffic user
              timelines and offloading <strong className="text-white">94%</strong> of
              direct read queries from the database.
            </p>
            <div className="p-2 rounded-lg bg-surface-200 border border-border-subtle">
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="text-muted-dim">DB Read Offload</span>
                <span className="text-amber font-bold">94%</span>
              </div>
              <div className="w-full bg-background rounded-full h-1.5">
                <div className="bg-amber rounded-full h-1.5 w-[94%]" />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-surface-300 border border-border-subtle card-hover">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
              <MessageSquare className="w-4 h-4 text-purple" />
              Kafka Event Streaming
            </div>
            <p className="text-xs text-muted-dim leading-normal mb-3">
              Notification and event pipelines in <strong className="text-white">Go</strong>,
              consuming Apache Kafka topics and AWS SQS queues with dead-letter
              queues for resilient background processing.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Apache Kafka', 'Go Consumer', 'AWS SQS', 'DLQs', 'Event-Driven'].map((s) => (
                <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-dim text-purple border border-purple/10">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="p-4 rounded-xl bg-surface-300 border border-border-subtle overflow-x-auto">
          <svg viewBox="0 0 800 180" className="w-full min-w-[600px] h-auto">
            <defs>
              <marker id="arrow-ms" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#345041" />
              </marker>
            </defs>

            {/* Client */}
            <rect x="20" y="50" width="100" height="45" rx="6" fill="#0d1512" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="70" y="72" textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">REST Client</text>
            <text x="70" y="85" textAnchor="middle" fill="#718b7e" fontSize="8" fontFamily="monospace">HTTPS</text>

            {/* API Gateway */}
            <rect x="160" y="50" width="100" height="45" rx="6" fill="#0d1512" stroke="#10b981" strokeWidth="1.5" />
            <text x="210" y="72" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">API Gateway</text>
            <text x="210" y="85" textAnchor="middle" fill="#718b7e" fontSize="8" fontFamily="monospace">REST → gRPC</text>

            {/* Services */}
            {[
              { label: 'Identity', x: 300, color: '#a855f7' },
              { label: 'Timeline', x: 420, color: '#f59e0b' },
              { label: 'Content', x: 540, color: '#3b82f6' },
              { label: 'Notify', x: 660, color: '#10b981' },
            ].map((svc) => (
              <g key={svc.label}>
                <rect x={svc.x} y="50" width="100" height="45" rx="6" fill="#0d1512" stroke={svc.color} strokeWidth="1.5" />
                <text x={svc.x + 50} y="72" textAnchor="middle" fill={svc.color} fontSize="10" fontFamily="monospace" fontWeight="bold">{svc.label}</text>
                <text x={svc.x + 50} y="85" textAnchor="middle" fill="#718b7e" fontSize="8" fontFamily="monospace">gRPC</text>
              </g>
            ))}

            {/* Data Stores */}
            <rect x="300" y="120" width="100" height="35" rx="6" fill="#0d1512" stroke="#a855f7" strokeWidth="1" />
            <text x="350" y="142" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace">PostgreSQL</text>

            <rect x="420" y="120" width="100" height="35" rx="6" fill="#0d1512" stroke="#f59e0b" strokeWidth="1" />
            <text x="470" y="142" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">Redis Cache</text>

            <rect x="660" y="120" width="100" height="35" rx="6" fill="#0d1512" stroke="#10b981" strokeWidth="1" />
            <text x="710" y="142" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">Kafka</text>

            {/* Arrows */}
            <line x1="120" y1="72" x2="160" y2="72" stroke="#345041" strokeWidth="2" markerEnd="url(#arrow-ms)" />
            <line x1="260" y1="72" x2="300" y2="72" stroke="#345041" strokeWidth="2" markerEnd="url(#arrow-ms)" />
            <line x1="260" y1="72" x2="300" y2="72" stroke="#345041" strokeWidth="2" />
            <line x1="210" y1="50" x2="350" y2="50" stroke="#345041" strokeWidth="1" strokeDasharray="4" />
            <line x1="210" y1="50" x2="470" y2="50" stroke="#345041" strokeWidth="1" strokeDasharray="4" />
            <line x1="210" y1="50" x2="590" y2="50" stroke="#345041" strokeWidth="1" strokeDasharray="4" />
            <line x1="210" y1="50" x2="710" y2="50" stroke="#345041" strokeWidth="1" strokeDasharray="4" />

            <line x1="350" y1="95" x2="350" y2="120" stroke="#345041" strokeWidth="1.5" markerEnd="url(#arrow-ms)" />
            <line x1="470" y1="95" x2="470" y2="120" stroke="#345041" strokeWidth="1.5" markerEnd="url(#arrow-ms)" />
            <line x1="710" y1="95" x2="710" y2="120" stroke="#345041" strokeWidth="1.5" markerEnd="url(#arrow-ms)" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
