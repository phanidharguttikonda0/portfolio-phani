'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Phone,
  ExternalLink,
  Send,
  CheckCircle,
  Building,
  User,
  MessageSquare,
  ChevronDown,
  Calendar,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { IDENTITY, BOTTLENECK_OPTIONS } from '@/lib/constants';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  defaultBottleneck?: string;
}

export default function ContactModal({
  open,
  onClose,
  defaultBottleneck = '',
}: ContactModalProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    bottleneck: defaultBottleneck || BOTTLENECK_OPTIONS[0],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${formState.bottleneck}] Technical Consultation — ${formState.company || formState.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company}\nPrimary Bottleneck: ${formState.bottleneck}\n\nProject Scope:\n${formState.message}`
    );
    window.open(
      `mailto:${IDENTITY.email}?subject=${subject}&body=${body}`,
      '_blank'
    );
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-surface-100 border border-border-highlight rounded-2xl p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border-subtle pb-4">
              <div>
                <span className="text-[11px] font-mono text-accent-text uppercase tracking-wider font-semibold">
                  DIRECT CONSULTATION BOOKING
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
                  Book a Technical Sync
                </h3>
                <p className="text-xs text-muted-dim font-mono mt-0.5">
                  Fractional Retainer ($500/wk) or AWS Infrastructure Sprint
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-dim hover:text-white hover:bg-surface-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Calendly Callout */}
            <div className="p-3.5 rounded-xl bg-surface-200 border border-accent/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono text-[#d1dfd7]">
                  Want to skip email and jump on a call?
                </span>
              </div>
              <a
                href={`mailto:${IDENTITY.email}?subject=15-Min%20Technical%20Sync`}
                className="text-xs font-mono font-bold text-accent-text hover:underline flex items-center gap-1 shrink-0"
              >
                Instant 15-Min Sync <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-muted-light flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-muted-dim" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Vance"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-200 border border-border-base text-white text-xs font-mono focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-muted-light flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-muted-dim" />
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-200 border border-border-base text-white text-xs font-mono focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Company / URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-muted-light flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-muted-dim" />
                  Company / Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://yourcompany.io"
                  value={formState.company}
                  onChange={(e) =>
                    setFormState({ ...formState, company: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-200 border border-border-base text-white text-xs font-mono focus:outline-none focus:border-accent"
                />
              </div>

              {/* Primary Bottleneck Dropdown */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-xs font-mono text-muted-light">
                  Primary Technical Bottleneck *
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-200 border border-border-base text-white text-xs font-mono flex items-center justify-between text-left cursor-pointer focus:outline-none focus:border-accent"
                >
                  <span className="truncate">{formState.bottleneck}</span>
                  <ChevronDown className="w-4 h-4 text-muted-dim shrink-0" />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-surface-200 border border-border-highlight rounded-xl overflow-hidden shadow-2xl">
                    {BOTTLENECK_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setFormState({ ...formState, bottleneck: opt });
                          setDropdownOpen(false);
                        }}
                        className="w-full px-3.5 py-2.5 text-left text-xs font-mono text-muted hover:text-white hover:bg-surface-50 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-muted-light flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-dim" />
                  Project Overview & Timeline
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your current stack, traffic load, or upcoming infrastructure milestones..."
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-200 border border-border-base text-white text-xs font-mono focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3.5 rounded-lg bg-accent text-background font-bold text-xs hover:bg-accent-text transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-background" />
                    <span>Inquiry Prepared! Opening Client...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Technical Consultation Request</span>
                  </>
                )}
              </button>
            </form>

            {/* Direct Connect Badges */}
            <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between text-xs font-mono text-muted-dim gap-2">
              <a
                href={`mailto:${IDENTITY.email}`}
                className="hover:text-accent-text transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{IDENTITY.email}</span>
              </a>
              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent-text transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent-text transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
