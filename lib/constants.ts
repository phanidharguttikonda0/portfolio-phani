/* ===== CORE IDENTITY ===== */
export const IDENTITY = {
  name: 'Phanidhar Reddy Guttikonda',
  shortName: 'Phanidhar Reddy',
  title: 'Cloud Backend Engineer & Distributed Systems Specialist',
  email: 'guttikondaphanidharreddy@gmail.com',
  phone: '+91 8885858760',
  location: 'Ongole / Bengaluru, India',
  remoteZones: 'US, UK, UAE, India',
  linkedin: 'https://www.linkedin.com/in/phanidhar-reddy-guttikonda-321817233/',
  github: 'https://github.com/phanidharguttikonda0',
  liveDemo: 'https://ipl-auction.phani.services',
  domain: 'phani.pro',
};

/* ===== HERO METRICS ===== */
export const HERO_METRICS = [
  { value: '48.7ms', label: 'p99 WebSocket Latency', color: 'text-white' },
  { value: '153', label: 'Production Endpoints (HLD)', color: 'text-accent-text' },
  { value: '274ns', label: 'Tokio MPSC Dispatch', color: 'text-white' },
  { value: '0', label: 'Duplicate Charges (Idempotent)', color: 'text-blue-text' },
];

/* ===== TECHNICAL MATRIX ===== */
export const TECH_MATRIX = [
  {
    domain: 'Languages',
    tools: 'Rust (Axum, Tokio), Go, Java (Spring Boot), TypeScript, Node.js (Express), SQL',
  },
  {
    domain: 'Cloud (AWS)',
    tools: '3-Tier VPC, ECS Fargate, ALB, RDS PostgreSQL 16, RDS Proxy, Lambda, SQS, EventBridge, Secrets Manager, CloudWatch, ECR, S3, IAM',
  },
  {
    domain: 'Infrastructure as Code',
    tools: 'Terraform (Modular HCL, S3 Remote State, DynamoDB State Locking)',
  },
  {
    domain: 'Databases & Cache',
    tools: 'PostgreSQL 16, Redis (Clustering, Atomic Lua, Pub/Sub), MongoDB, DynamoDB',
  },
  {
    domain: 'Message Streaming',
    tools: 'Apache Kafka, AWS SQS (Standard, FIFO, DLQs), gRPC (HTTP/2), WebSockets',
  },
  {
    domain: 'DevOps & QA',
    tools: 'Docker, GitHub Actions CI/CD, Zod Validation, Pino Async Logging, 230+ Integration Tests',
  },
];

/* ===== NAV LINKS ===== */
export const NAV_LINKS = [
  { id: '01', label: 'Architecture', href: '/#architecture' },
  { id: '02', label: 'Benchmarks', href: '/#benchmarks' },
  { id: '03', label: 'Case Studies', href: '/#case-studies' },
  { id: '04', label: 'Experience', href: '/#experience' },
  { id: '05', label: 'Contact', href: '/#contact' },
];

/* ===== BOOT SEQUENCE ===== */
export const BOOT_LINES = [
  { prefix: 'SYSTEM_INIT', text: 'Booting phani.pro kernel v2026.4...', delay: 0 },
  { prefix: 'VPC_CONFIG', text: 'Validating 3-tier subnets (ap-south-2): 10.0.0.0/16... OK', delay: 600 },
  { prefix: 'RDS_PROXY', text: 'Connection pool initialized. Target: db.t4g.small (PostgreSQL 16)... OK', delay: 1200 },
  { prefix: 'CONTAINER', text: 'ECS Fargate tasks running (2/2 healthy). ALB listening on :443... OK', delay: 1800 },
  { prefix: 'ASYNC_PIPE', text: 'SQS queues attached: ocr-q, eval-q, assign-q. DLQs active (14d retention)... OK', delay: 2400 },
  { prefix: 'RETAINER_STATUS', text: 'Phanidhar Reddy: OPEN for 20 hrs/week contracts ($25/hr)... READY.', delay: 3000 },
];

/* ===== EXPERIENCE TIMELINE ===== */
export const EXPERIENCE = [
  {
    role: 'Cloud Backend Engineer & Infrastructure Consultant',
    company: 'Freelance & Client Engagements',
    period: 'Oct 2025 – Present',
    location: 'Remote',
    type: 'Part-Time Consultant / Technical Lead',
    highlights: [
      'Standardized multi-tenant cloud environments across startups using modular Terraform with remote state locking on S3 and DynamoDB.',
      'Implemented RDS Proxy connection pooling across relational databases, completely eliminating connection exhaustion during high-concurrency request spikes.',
      'Designed decoupled asynchronous event processing systems using AWS SQS, SNS, and Lambda triggers with custom retry budgets and DLQ patterns.',
      'Audited slow database execution plans, resolving N+1 query bottlenecks and redesigning composite indices for high-throughput operations.',
      'Established production CI/CD pipelines with GitHub Actions for automated Docker builds and zero-downtime rolling container releases on AWS ECS.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Tiny Pal',
    period: 'Jul 2025 – Jan 2026',
    location: 'Remote',
    type: 'Backend & Cloud Engineering',
    highlights: [
      'Architected and containerized Spring Boot and Node.js microservices deployed across AWS EC2 and RDS PostgreSQL, managed through automated GitHub Actions CI/CD pipelines.',
      'Integrated Razorpay subscription billing with idempotent webhook handlers and atomic database state transitions, preventing duplicate billing charges across concurrent transactional events.',
      'Engineered secure 3-tier VPC networking by isolating RDS instances inside private database subnets with NAT Gateway egress routing, pulling secrets at runtime via AWS Secrets Manager.',
      'Optimized PostgreSQL schema structures and execution plans with targeted indexing strategies, enhancing query execution speed and guaranteeing long-term data integrity.',
      'Configured asynchronous structured application logging using Pino, piping centralized runtime telemetry into AWS CloudWatch for rapid incident resolution.',
    ],
  },
  {
    role: 'Full Stack Developer & Cloud Engineer',
    company: 'Center for Wireless Networks & Applications (Amrita WNA)',
    period: 'Jan 2023 – May 2025',
    location: 'Amrita University, India',
    type: 'Research & Development',
    highlights: [
      'Developed responsive web applications and backend services for institutional and research platforms, integrating external REST APIs and relational database architectures.',
      'Managed campus cloud infrastructure and virtualized server environments, implementing containerized Docker deployments and automated backup procedures for research databases.',
      'Designed authentication flows and role-based access control (RBAC) mechanisms to safeguard proprietary research data across multidisciplinary engineering teams.',
    ],
  },
];

export const EDUCATION = {
  institution: 'Amrita School of Computing, Amrita Vishwa Vidyapeetham',
  period: '2021 – 2025',
  degree: 'Bachelor of Technology (B.Tech) in Computer Science & Artificial Intelligence',
};

/* ===== SERVICES ===== */
export const SERVICES = [
  {
    id: 'retainer',
    badge: 'MOST POPULAR FOR STARTUPS',
    badgeColor: 'emerald',
    title: 'Part-Time Cloud Backend Retainer',
    price: '$500',
    unit: '/ week (20 hrs committed)',
    description:
      'Dedicated fractional engineering capacity for Seed and Series A startups needing senior backend systems and AWS cloud expertise without the overhead of a full-time hire.',
    features: [
      'Microservices & backend APIs (Rust, Go, Java Spring Boot, Node.js)',
      'AWS infrastructure as code (Terraform) maintenance & updates',
      'RDS Proxy connection pool tuning and Postgres query optimization',
      'Integration into your Slack, GitHub, and weekly sprint planning',
    ],
    cta: 'Start Retainer Engagement',
    ctaLink: `mailto:guttikondaphanidharreddy@gmail.com?subject=Retainer%20Inquiry%20-%2020%20hrs/week`,
    primary: true,
  },
  {
    id: 'sprint',
    badge: 'FIXED-PRICE SPRINT',
    badgeColor: 'blue',
    title: 'Zero-Downtime AWS Infrastructure Setup',
    price: '$1,500 – $2,500',
    unit: '/ 1–2 week turnaround',
    description:
      'Turnkey cloud infrastructure written from scratch using modular Terraform with remote state locking, ready for high-traffic production workloads.',
    features: [
      '3-tier VPC (Public ALB, Private ECS Fargate, Isolated RDS subnets)',
      'PostgreSQL connection multiplexing via AWS RDS Proxy',
      'Decoupled SQS/DLQ queues with EventBridge cron sweeper',
      'Full GitHub Actions CI/CD to AWS ECR with zero-downtime rolling deploys',
    ],
    cta: 'Inquire About Infrastructure Sprint',
    ctaLink: `mailto:guttikondaphanidharreddy@gmail.com?subject=AWS%20Infrastructure%20Sprint%20Inquiry`,
    primary: false,
  },
  {
    id: 'audit',
    badge: 'PERFORMANCE AUDIT',
    badgeColor: 'amber',
    title: 'Database & Performance Optimization Audit',
    price: '$750 – $1,200',
    unit: '/ 3–5 day delivery',
    description:
      'Deep performance profiling and optimization of your PostgreSQL databases, connection pools, and caching layers to eliminate bottlenecks.',
    features: [
      'Resolving Postgres connection starvation and configuring RDS Proxy',
      'Query profiling, index rebuilding, and eliminating N+1 bottlenecks',
      'Low-latency Redis caching layer implementation',
      'Comprehensive optimization report with actionable recommendations',
    ],
    cta: 'Request Performance Audit',
    ctaLink: `mailto:guttikondaphanidharreddy@gmail.com?subject=Performance%20Audit%20Inquiry`,
    primary: false,
  },
];

/* ===== CONTACT BOTTLENECK OPTIONS ===== */
export const BOTTLENECK_OPTIONS = [
  'AWS Infrastructure & Terraform',
  'RDS Connection Starvation / Database Slowdown',
  'High-Concurrency Real-Time Service',
  'Fractional Backend Retainer (20 hrs/wk)',
];

/* ===== ARCHITECTURE PILLS ===== */
export const ARCH_PILLS = [
  'ECS Fargate (2 Tasks)',
  'PostgreSQL 16 + Sonyflake 64-bit IDs',
  'CloudWatch + Pino Async Logs',
  '230 Automated CI/CD Tests',
  'RDS Proxy Connection Multiplexing',
  '4 SQS Queues + 4 DLQs',
  'Terraform Modular IaC',
  'Zero-Downtime Deployments',
];

/* ===== BENCHMARK METRICS ===== */
export const BENCHMARK_DATA = {
  throughput: { before: 850, after: 1217, unit: 'bids/sec', improvement: '+43%' },
  p99Latency: { before: 85.2, after: 48.7, unit: 'ms', improvement: '1.7x lower' },
  loggingOverhead: { before: 100, after: 2, unit: '%', improvement: '-98%' },
  memoryFootprint: { value: 67.1, unit: 'MB', label: 'Peak Stress Load' },
};
