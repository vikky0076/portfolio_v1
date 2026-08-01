'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, MapPin, GraduationCap, Mail, Globe2, Lightbulb, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import profileImg from '@/public/assets/profile.png';

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

        {/* 4-Card Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Profile Image (Left Visual Anchor) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 glass-card rounded-3xl p-4 flex flex-col items-stretch justify-stretch relative overflow-hidden group"
          >
            {/* Ambient Background Glow behind the card */}
            <div className="absolute -inset-2 bg-gradient-to-b from-accent/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 pointer-events-none" />

            {/* Futuristic Corner Accents */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-accent/60 group-hover:border-accent group-hover:drop-shadow-[0_0_8px_#FF5E00] transition-all duration-300 z-30" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-accent/60 group-hover:border-accent group-hover:drop-shadow-[0_0_8px_#FF5E00] transition-all duration-300 z-30" />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-accent/60 group-hover:border-accent group-hover:drop-shadow-[0_0_8px_#FF5E00] transition-all duration-300 z-30" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-accent/60 group-hover:border-accent group-hover:drop-shadow-[0_0_8px_#FF5E00] transition-all duration-300 z-30" />

            {/* Image Inner Container / Glowing Orange Frame */}
            <div className="relative w-full h-full min-h-[350px] lg:min-h-0 rounded-2xl overflow-hidden bg-primary/30 border-2 border-accent/70 shadow-[0_0_20px_rgba(255,94,0,0.25)] group-hover:shadow-[0_0_35px_rgba(255,94,0,0.65)] group-hover:border-accent transition-all duration-500 flex justify-center items-end p-2">
              {/* Decorative Tech Overlay Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />
              
              {/* Glow Behind Portrait */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[65%] bg-accent/20 rounded-full blur-[45px] pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Animated Background Orbits */}
              <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-accent/20 animate-orbit-rotate top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute w-[260px] h-[260px] rounded-full border border-dotted border-white/5 animate-orbit-rotate-reverse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40" />

              {/* Drifting Floating Sparks / Particles */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-accent/50 shadow-[0_0_6px_#FF5E00] animate-float"
                    style={{
                      width: `${(i % 2) + 2}px`,
                      height: `${(i % 2) + 2}px`,
                      left: `${(i * 19) % 80 + 10}%`,
                      top: `${(i * 17) % 60 + 20}%`,
                      animationDuration: `${((i * 1.2) % 3) + 3}s`,
                      animationDelay: `${i * 0.5}s`,
                      opacity: 0.2 + (i % 4) * 0.15,
                    }}
                  />
                ))}
              </div>

              {/* The portrait image */}
              <div className="relative w-full h-[95%] select-none z-10 flex justify-center items-end">
                <Image
                  src={profileImg}
                  alt="Vignesh B portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain object-bottom transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:filter contrast-[1.02]"
                />
              </div>

              {/* Bottom Fade Gradient Overlay */}
              <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-primary/95 to-transparent z-20 pointer-events-none" />
              
              {/* Top/Side subtle vignetting */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-primary/30 z-20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Card 2: Intro (Philosophy) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 glass-card rounded-3xl p-8 flex flex-col justify-between"
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
                  { label: 'ML Engineer', isHighlight: true },
                ].map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/95">
                    <span className="text-accent font-bold">&gt;</span>
                    {role.isHighlight ? (
                      <span className="text-accent font-semibold">{role.label}</span>
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
            className="lg:col-span-6 glass-card rounded-3xl p-8 flex flex-col justify-between"
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
            className="lg:col-span-6 glass-card rounded-3xl p-8 flex flex-col justify-between"
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
