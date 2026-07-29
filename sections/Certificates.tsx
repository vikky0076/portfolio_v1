'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const CERTIFICATES = [
  { name: 'Python for Data Science', issuer: 'IBM', href: 'https://credentials.edx.org/' },
  { name: 'AI Fundamentals', issuer: 'Microsoft', href: 'https://learn.microsoft.com/en-us/credentials/' },
  { name: 'Azure Fundamentals', issuer: 'Microsoft', href: 'https://learn.microsoft.com/en-us/credentials/' },
  { name: 'Google AI Essentials', issuer: 'Google', href: 'https://grow.google/intl/en_in/' },
  { name: '100+ More Certificates', issuer: 'Various Platforms', href: 'https://github.com/vikky0076' },
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 bg-transparent select-none overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold font-display text-accent mb-3 block">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-4">
            Licenses & <span className="text-gradient">Certifications</span>
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CERTIFICATES.map((cert, idx) => (
            <motion.a
              key={idx}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-5 hover:border-accent/20 hover:bg-secondary/35 group transition-all duration-300 flex items-center justify-between border border-white/5 bg-secondary/20 shadow-md hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 text-left min-w-0">
                <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center shrink-0 text-accent group-hover:scale-110 transition-transform">
                  <Award size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors duration-300 truncate mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-text-secondary font-medium font-sans">
                    {cert.issuer}
                  </p>
                </div>
              </div>
              <ExternalLink size={14} className="text-text-secondary group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
