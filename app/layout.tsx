import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Phanidhar Reddy | Cloud Backend & Distributed Systems Consultant',
  description:
    'Specializing in AWS (ECS, RDS Proxy, Terraform) and low-latency systems in Rust, Go, and Java. Available for 20 hrs/week contracts ($500/wk).',
  metadataBase: new URL('https://phani.pro'),
  openGraph: {
    title: 'Phanidhar Reddy | Cloud Backend & Distributed Systems Specialist',
    description:
      'Explore production AWS architectures, p99 latency benchmarks in Rust, and enterprise SaaS case studies.',
    url: 'https://phani.pro',
    siteName: 'Phani.pro Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Phanidhar Reddy - Cloud Backend Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phanidhar Reddy | Cloud Backend Engineer',
    description:
      'High-throughput Rust backends, AWS Terraform infrastructure, and zero-downtime microservices.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
