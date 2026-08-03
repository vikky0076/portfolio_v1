'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const CONNECT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'vigneshbs7653@gmail.com',
    href: 'mailto:vigneshbs7653@gmail.com',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vignesh-b',
    href: 'https://linkedin.com/in/vignesh-b',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/vikky0076',
    href: 'https://github.com/vikky0076',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Arasampattu, Kallakurichi, TN, India',
    href: null,
  },
];

export default function Connect() {
  return (
    <section id="connect" className="relative py-16 bg-transparent select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest font-extrabold font-display text-accent mb-3 block">
            Let's Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-4">
            Find Me <span className="text-gradient">Online</span>
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* 4-Card Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {CONNECT_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const CardContent = (
              <>
                <div className="w-12 h-12 rounded-2xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,94,0,0.1)] group-hover:shadow-[0_0_15px_rgba(255,94,0,0.3)]">
                  <Icon size={20} />
                </div>
                <span className="text-sm sm:text-base text-white group-hover:text-accent font-sans font-bold text-center transition-colors duration-300">
                  {item.label}
                </span>
              </>
            );

            const cardClasses = "glass-card rounded-2xl p-6 flex flex-col items-center text-center justify-center border border-white/5 bg-secondary/20 shadow-md hover:border-accent/20 hover:scale-[1.03] transition-all duration-300 min-h-[160px] group cursor-pointer";

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

      </div>
    </section>
  );
}
