'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'vigneshbs7653@gmail.com',
    href: 'mailto:vigneshbs7653@gmail.com',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'www.linkedin.com/in/vignesh076',
    href: 'https://www.linkedin.com/in/vignesh076',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/vikky0076',
    href: 'https://github.com/vikky0076',
  },
  {
    icon: FaInstagram,
    label: 'Instagram',
    value: '@senotza.a2k',
    href: 'https://www.instagram.com/senotza.a2k?igsh=MzU1azBlYzhjdmp1',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 bg-white select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold font-display text-accent mb-3 block">
            Let's Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-neutral-900 mb-4">
            Find Me <span className="text-gradient">Online</span>
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* 4-Card Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {CONTACT_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const CardContent = (
              <>
                <div className="w-12 h-12 rounded-2xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,94,0,0.05)] group-hover:shadow-[0_0_15px_rgba(255,94,0,0.2)]">
                  <Icon size={20} />
                </div>
                <span className="text-sm sm:text-base text-neutral-800 group-hover:text-accent font-sans font-bold text-center transition-colors duration-300">
                  {item.label}
                </span>
              </>
            );

            const cardClasses = "rounded-2xl p-6 flex flex-col items-center text-center justify-center border border-neutral-200/60 bg-neutral-50 shadow-sm hover:bg-neutral-100/50 hover:border-accent/30 hover:scale-[1.03] transition-all duration-300 min-h-[160px] group cursor-pointer";

            return item.href ? (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={cardClasses}
              >
                {CardContent}
              </motion.a>
            ) : (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={cardClasses}
              >
                {CardContent}
              </motion.div>
            );
          })}
        </div>

        {/* Open Contact Modal trigger */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
            className="inline-flex items-center justify-center gap-2.5 bg-accent text-white text-xs sm:text-sm uppercase tracking-widest font-bold px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(255,94,0,0.2)] hover:shadow-[0_0_25px_rgba(255,94,0,0.45)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Send Secure Message
            <Send size={14} className="text-white" />
          </button>
        </div>

      </div>
    </section>
  );
}
