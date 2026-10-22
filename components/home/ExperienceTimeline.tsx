'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, GraduationCap } from 'lucide-react';
import { EXPERIENCE, EDUCATION } from '@/lib/constants';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="flex flex-col gap-8">
      <div className="border-b border-border-subtle pb-4">
        <span className="text-xs font-mono text-accent-text uppercase tracking-widest font-semibold">
          Professional History
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Work Experience & Education
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border-base to-transparent" />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative pl-12 md:pl-16"
            >
              {/* Timeline Dot */}
              <div className="absolute left-2.5 md:left-4.5 top-1 w-3 h-3 rounded-full bg-accent border-2 border-background shadow-lg shadow-accent/30" />

              <div className="bg-surface-100 border border-border-base rounded-xl p-5 sm:p-6 card-hover">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{exp.role}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase className="w-3.5 h-3.5 text-accent" />
                      <span className="text-sm font-semibold text-accent-text">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-dim">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-accent-dim text-accent-text border border-accent/10 mb-3">
                  {exp.type}
                </span>

                {/* Highlights */}
                <ul className="space-y-2">
                  {exp.highlights.map((h, hIdx) => (
                    <li
                      key={hIdx}
                      className="text-xs sm:text-sm text-muted leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-accent-text before:font-mono"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative pl-12 md:pl-16"
          >
            <div className="absolute left-2.5 md:left-4.5 top-1 w-3 h-3 rounded-full bg-blue border-2 border-background shadow-lg shadow-blue/30" />

            <div className="bg-surface-100 border border-border-base rounded-xl p-5 sm:p-6 card-hover">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-blue" />
                <h3 className="text-base font-bold text-white">Education</h3>
              </div>
              <p className="text-sm font-semibold text-blue-text">{EDUCATION.institution}</p>
              <p className="text-xs text-muted mt-1">{EDUCATION.degree}</p>
              <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-mono text-muted-dim bg-blue-dim rounded border border-blue/10">
                {EDUCATION.period}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
