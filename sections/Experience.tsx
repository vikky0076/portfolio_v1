'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const EXPERIENCES = [
  {
    date: '2025 - Present',
    role: 'Web Developer (Freelance)',
    desc: 'Building modern websites and web applications for clients, integrating custom designs, responsive frontends, and robust backend endpoints.',
  },
  {
    date: '2025',
    role: 'Smart India Hackathon (SIH) Participant',
    desc: 'Collaborated in high-pressure hackathon environment to work on innovative problem statements and deploy real-world software solutions.',
  },
  {
    date: '2025',
    role: 'Hackathon 360 3.0 (KPR) Participant',
    desc: 'Participated in full-scale technical design sprints, built functional prototypes, and presented software solutions to judging panels.',
  },
  {
    date: '2025',
    role: 'UI/UX & Frontend Developer Projects',
    desc: 'Created multiple premium responsive landing pages, focus-targeted dashboards, and UI concepts using modern styles.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-transparent select-none overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[90px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold font-display text-accent mb-3 block">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-4">
            Experience & <span className="text-gradient">Timeline</span>
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Timeline Area */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Vertical Line (Dashed) */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1.5px] border-l-2 border-dashed border-accent/25 -translate-x-[0.75px]" />

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-stretch w-full">
                  {/* Outer flex children: Left & Right blocks */}
                  
                  {/* Left Column (Desktop-only alignment wrapper) */}
                  <div className={`hidden md:flex items-center justify-end w-1/2 pr-12 text-right ${isEven ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl p-6 text-left w-full border border-neutral-200/80 shadow-md hover:scale-[1.02] transition-all duration-300"
                    >
                      <span className="text-xs font-bold text-accent tracking-wider uppercase block mb-1">
                        {exp.date}
                      </span>
                      <h3 className="text-base font-bold font-display text-neutral-900 mb-2">
                        {exp.role}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                        {exp.desc}
                      </p>
                    </motion.div>
                    )}
                  </div>

                  {/* Center Node dot marker */}
                  <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-accent flex items-center justify-center z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>

                  {/* Right Column / Mobile Container */}
                  <div className={`flex items-center justify-start w-full md:w-1/2 pl-12 md:pl-12 text-left ${!isEven ? 'opacity-100' : 'md:opacity-0 md:pointer-events-none'}`}>
                    {(!isEven || true) && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        // Mobile forces view of both sides, so on desktop we hide the duplicate, but on mobile we show it.
                        className={`bg-white rounded-2xl p-6 w-full border border-neutral-200/80 shadow-md hover:scale-[1.02] transition-all duration-300 ${isEven ? 'md:hidden' : ''}`}
                      >
                        <span className="text-xs font-bold text-accent tracking-wider uppercase block mb-1">
                          {exp.date}
                        </span>
                        <h3 className="text-base font-bold font-display text-neutral-900 mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                          {exp.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
