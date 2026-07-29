'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, MapPin, GraduationCap, Mail, Globe2, Lightbulb, ArrowRight } from 'lucide-react';

interface CountUpCellProps {
  target: number;
  suffix?: string;
  label: string;
  isInfinity?: boolean;
}

function CountUpCell({ target, suffix = '', label, isInfinity = false }: CountUpCellProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInfinity || !inView) return;

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, inView, isInfinity]);

  return (
    <div
      ref={ref}
      className="p-5 rounded-2xl bg-primary/30 border border-white/5 flex flex-col justify-center items-center text-center shadow-lg hover:border-accent/25 hover:shadow-[0_0_15px_rgba(255,106,0,0.05)] transition-all duration-300"
    >
      <span className="text-3xl font-extrabold font-display text-accent mb-2">
        {isInfinity ? '∞' : `${count}${suffix}`}
      </span>
      <span className="text-[10px] sm:text-xs text-text-secondary leading-snug">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative py-24 bg-transparent select-none overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[250px] h-[250px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Sections Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold font-display text-accent mb-3 block">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-4">
            Turning Ideas Into <span className="text-gradient">Impactful Solutions</span>
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Intro (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 glass-card rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2 block">
                Philosophy
              </span>
              <h3 className="text-xl font-bold font-display text-white mb-4">
                High-Performance Software Craftsmanship
              </h3>

              {/* Roles bulleted list (moved from Hero) */}
              <div className="flex flex-col gap-2 mb-6 font-sans">
                {[
                  { label: 'Software Engineer', isHighlight: false },
                  { label: 'AI Engineer', isHighlight: false },
                  { label: 'Full Stack Developer', isHighlight: false },
                  { label: 'Future ', highlightText: 'ML Engineer', isHighlight: true },
                ].map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/95">
                    <span className="text-accent font-bold">&gt;</span>
                    {role.isHighlight ? (
                      <span>
                        {role.label}
                        <span className="text-accent font-semibold">{role.highlightText}</span>
                      </span>
                    ) : (
                      <span>{role.label}</span>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 font-sans">
                I'm a Computer Science student with a strong passion for technology, problem-solving and continuous learning. I love building projects, exploring new tools and turning ideas into real-world solutions.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-sans">
                Passionate about building intelligent, scalable and user-centric applications that solve real-world problems. Exploring the intersection of AI, Web and Cloud to create impactful solutions.
              </p>
            </div>
            
            <button
              onClick={() => handleScrollTo('projects')}
              className="group inline-flex items-center justify-center gap-2 border border-white/10 hover:border-accent/40 bg-secondary/35 text-white text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-6 w-full"
            >
              Know More About Me
              <ArrowRight size={14} className="text-accent transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Card 2: Details List (Center) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 glass-card rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent mb-4 block">
                Profile Sheet
              </span>
              
              <div className="flex flex-col gap-4 font-sans">
                {/* Detail Items */}
                {[
                  { icon: User, label: 'Name', value: 'Vignesh B' },
                  { icon: MapPin, label: 'Location', value: 'Arasampattu, Kallakurichi, Tamil Nadu, India' },
                  { icon: GraduationCap, label: 'Education', value: 'B.Sc Computer Science (AI & ML), Takshashila University, 2025 - 2028' },
                  { icon: Mail, label: 'Email', value: 'vigneshb00x@gmail.com', isLink: true, href: 'mailto:vigneshb00x@gmail.com' },
                  { icon: Globe2, label: 'Languages', value: 'Tamil | English' },
                  { icon: Lightbulb, label: 'Interests', value: 'Web Dev, AI, Tech Gadgets, Problem Solving, Learning & Teaching' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-accent/5 border border-accent/15 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-accent" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
                          {item.label}
                        </span>
                        {item.isLink ? (
                          <a
                            href={item.href}
                            className="text-xs text-white hover:text-accent font-medium break-all transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-xs text-white font-medium break-words leading-relaxed">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Stats Counters Grid (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 glass-card rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent mb-4 block">
                Key Metrics
              </span>
              
              <div className="grid grid-cols-2 gap-4">
                <CountUpCell target={1} suffix="+" label="Years of Learning & Building" />
                <CountUpCell target={10} suffix="+" label="Projects Built" />
                <CountUpCell target={100} suffix="+" label="Certificates Earned" />
                <CountUpCell target={0} label="Passion for Learning" isInfinity />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
