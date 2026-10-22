'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  ExternalLink,
  Send,
  CheckCircle,
  User,
  Building,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { IDENTITY, BOTTLENECK_OPTIONS } from '@/lib/constants';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    bottleneck: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch request.');
      }

      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        company: '',
        bottleneck: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send request';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="flex flex-col gap-8">
      <div className="border-b border-border-subtle pb-4">
        <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
          Start a Conversation
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Book a Technical Consultation
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 bg-surface-100 border border-border-base rounded-2xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-muted-dim flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-200 border border-border-subtle text-sm text-white placeholder-muted-dark font-mono outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-muted-dim flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Work Email
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-200 border border-border-subtle text-sm text-white placeholder-muted-dark font-mono outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-muted-dim flex items-center gap-1.5">
                <Building className="w-3 h-3" /> Company / Project URL
              </label>
              <input
                type="text"
                value={formState.company}
                onChange={(e) =>
                  setFormState({ ...formState, company: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg bg-surface-200 border border-border-subtle text-sm text-white placeholder-muted-dark font-mono outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                placeholder="https://yourcompany.com"
              />
            </div>

            {/* Bottleneck Dropdown */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-mono text-muted-dim">
                Primary Bottleneck
              </label>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-200 border border-border-subtle text-sm text-left font-mono outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all flex items-center justify-between"
              >
                <span className={formState.bottleneck ? 'text-white' : 'text-muted-dark'}>
                  {formState.bottleneck || 'Select your primary challenge'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-dim transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-surface-300 border border-border-base rounded-lg shadow-xl z-10 overflow-hidden"
                  >
                    {BOTTLENECK_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setFormState({ ...formState, bottleneck: opt });
                          setDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2.5 text-xs font-mono text-muted hover:text-accent-text hover:bg-accent-dim text-left transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-muted-dim flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" /> Project Overview & Timeline
              </label>
              <textarea
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2.5 rounded-lg bg-surface-200 border border-border-subtle text-sm text-white placeholder-muted-dark font-mono outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                placeholder="Describe your project, current stack, and timeline..."
              />
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-dim border border-red/30 text-xs font-mono text-red flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <span>Failed to send: {errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const subject = encodeURIComponent(`${formState.bottleneck || 'Project Inquiry'} — ${formState.name}`);
                    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company}\nBottleneck: ${formState.bottleneck}\n\n${formState.message}`);
                    window.open(`mailto:${IDENTITY.email}?subject=${subject}&body=${body}`, '_blank');
                  }}
                  className="text-[11px] text-white hover:underline text-left"
                >
                  Click here to send directly via your desktop/mobile email client →
                </button>
              </div>
            )}

            {/* Success Banner */}
            {submitted && (
              <div className="p-3.5 rounded-lg bg-accent-dim border border-accent/40 text-xs font-mono text-accent-text flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-accent" />
                <span>Request dispatched directly to my inbox! I will reply within 24 hours.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || submitted}
              className="w-full py-3.5 rounded-lg bg-accent text-background font-bold text-sm hover:bg-accent-text transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting to Inbox...</span>
                </>
              ) : submitted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Dispatched to Phanidhar&apos;s Inbox!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Consultation Request</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Direct Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          <div className="bg-surface-100 border border-border-base rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white font-mono">Direct Channels</h3>

            <a
              href={`mailto:${IDENTITY.email}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-200 border border-border-subtle hover:border-accent/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center">
                <Mail className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-dim font-mono">Email</div>
                <div className="text-xs text-white font-mono truncate group-hover:text-accent-text transition-colors">
                  {IDENTITY.email}
                </div>
              </div>
            </a>

            <a
              href={`https://wa.me/${IDENTITY.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-200 border border-border-subtle hover:border-accent/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center">
                <Phone className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-dim font-mono">WhatsApp / Phone</div>
                <div className="text-xs text-white font-mono group-hover:text-accent-text transition-colors">
                  {IDENTITY.phone}
                </div>
              </div>
            </a>

            <a
              href={IDENTITY.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-200 border border-border-subtle hover:border-accent/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-dim flex items-center justify-center">
                <LinkedinIcon className="w-4 h-4 text-blue" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-dim font-mono">LinkedIn</div>
                <div className="text-xs text-white font-mono group-hover:text-blue-text transition-colors flex items-center gap-1">
                  Connect <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>

            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-200 border border-border-subtle hover:border-accent/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-300 flex items-center justify-center border border-border-subtle">
                <GithubIcon className="w-4 h-4 text-muted-light" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-dim font-mono">GitHub</div>
                <div className="text-xs text-white font-mono group-hover:text-accent-text transition-colors flex items-center gap-1">
                  View Code <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          </div>

          {/* Availability Card */}
          <div className="bg-surface-100 border border-accent/30 rounded-2xl p-6 glow-emerald">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-sm font-bold text-white font-mono">
                Currently Available
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Accepting new retainer clients for backend engineering, AWS
              infrastructure builds, and performance optimization sprints.
            </p>
            <div className="mt-3 flex items-baseline gap-2 font-mono">
              <span className="text-xl font-extrabold text-white">$500</span>
              <span className="text-xs text-muted-dim">/ week · 20 hrs committed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
