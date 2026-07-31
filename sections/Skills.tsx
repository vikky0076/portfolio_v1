'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, LayoutTemplate, Server, Brain, Cloud, SlidersHorizontal } from 'lucide-react';
import {
  SiPython,
  SiReact,
  SiNodedotjs,
  SiDocker,
  SiGithub,
  SiTypescript,
  SiPytorch,
  SiHtml5,
  SiPostgresql,
  SiKubernetes,
  SiFigma,
  SiLinux,
  SiGraphql,
  SiFirebase,
  SiRedis,
  SiOpencv,
  SiTailwindcss,
} from 'react-icons/si';
import { FaRobot, FaBrain, FaAws } from 'react-icons/fa';

const SKILL_CATEGORIES = [
  {
    title: 'Programming',
    icon: Code,
    skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: LayoutTemplate,
    skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'React', 'Next.js', 'Framer Motion'],
  },
  {
    title: 'Backend & DB',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'AI / ML & Agents',
    icon: Brain,
    skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch', 'OpenCV', 'NLP', 'LangChain', 'RAG', 'Vector DBs', 'Generative AI', 'LLMs', 'AI Agents'],
  },
  {
    title: 'Cloud & Systems',
    icon: Cloud,
    skills: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Linux'],
  },
  {
    title: 'CS Core & Tools',
    icon: SlidersHorizontal,
    skills: ['Data Structures', 'Algorithms', 'OOP', 'System Design', 'Git / GitHub', 'Figma', 'Postman', 'Vercel / Firebase'],
  },
];

const MARQUEE_LEFT = [
  { name: 'Python', icon: SiPython },
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'AWS', icon: FaAws },
  { name: 'Docker', icon: SiDocker },
  { name: 'GitHub', icon: SiGithub },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'LangChain', icon: FaRobot },
  { name: 'PyTorch', icon: SiPytorch },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
];

const MARQUEE_RIGHT = [
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'Figma', icon: SiFigma },
  { name: 'Linux', icon: SiLinux },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'Vector DBs', icon: FaBrain },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Redis', icon: SiRedis },
  { name: 'OpenCV', icon: SiOpencv },
  { name: 'HTML5/CSS3', icon: SiHtml5 },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 bg-transparent select-none overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[30%] left-[10%] w-[250px] h-[250px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12">
        {/* Orange Banner Wrapper */}
        <div className="relative overflow-hidden rounded-[32px] border border-accent/15 bg-secondary/15 backdrop-blur-sm px-6 py-12 sm:px-12 sm:py-16 shadow-[0_0_50px_rgba(255,94,0,0.05)]">
          {/* Glowing background highlights inside the banner */}
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Section Header */}
          <div className="text-center mb-16 relative z-10">
            <span className="text-xs uppercase tracking-widest font-extrabold font-display text-accent mb-3 block">
              Technical Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-4">
              Roadmap & <span className="text-gradient">Acquired Skillsets</span>
            </h2>
            <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
          </div>

          {/* Roadmap Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-start relative group"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-accent/5 border border-accent/15 flex items-center justify-center text-accent">
                      <Icon size={16} />
                    </div>
                    <h3 className="text-sm font-bold font-display text-white group-hover:text-accent transition-colors duration-300">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2 font-sans">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] sm:text-xs text-white px-3 py-1.5 rounded-lg bg-accent/15 border border-accent/20 hover:bg-accent hover:border-accent/30 transition-all duration-300 relative overflow-hidden group/badge cursor-default"
                      >
                        {skill}
                        {/* Interactive glow dot on badge */}
                        <span className="absolute bottom-0 right-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

        {/* Double Infinite Marquee */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-4 flex flex-col gap-4 z-10">
          
          {/* Row 1: Leftwards */}
          <div className="flex overflow-hidden w-full relative">
            <div className="flex animate-marquee-left whitespace-nowrap min-w-full gap-8 shrink-0">
              {/* Main List */}
              {MARQUEE_LEFT.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={`l-${i}`}
                    className="inline-flex items-center gap-2 bg-white border border-neutral-200/80 rounded-full px-5 py-2 text-xs font-semibold text-neutral-900 cursor-default select-none shadow-md"
                  >
                    <Icon className="text-accent text-sm" />
                    <span>{tech.name}</span>
                  </div>
                );
              })}
              {/* Duplicate List */}
              {MARQUEE_LEFT.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={`l-dup-${i}`}
                    className="inline-flex items-center gap-2 bg-white border border-neutral-200/80 rounded-full px-5 py-2 text-xs font-semibold text-neutral-900 cursor-default select-none shadow-md"
                  >
                    <Icon className="text-accent text-sm" />
                    <span>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Rightwards */}
          <div className="flex overflow-hidden w-full relative">
            <div className="flex animate-marquee-right whitespace-nowrap min-w-full gap-8 shrink-0">
              {/* Main List */}
              {MARQUEE_RIGHT.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={`r-${i}`}
                    className="inline-flex items-center gap-2 bg-white border border-neutral-200/80 rounded-full px-5 py-2 text-xs font-semibold text-neutral-900 cursor-default select-none shadow-md"
                  >
                    <Icon className="text-accent text-sm" />
                    <span>{tech.name}</span>
                  </div>
                );
              })}
              {/* Duplicate List */}
              {MARQUEE_RIGHT.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={`r-dup-${i}`}
                    className="inline-flex items-center gap-2 bg-white border border-neutral-200/80 rounded-full px-5 py-2 text-xs font-semibold text-neutral-900 cursor-default select-none shadow-md"
                  >
                    <Icon className="text-accent text-sm" />
                    <span>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

    </section>
  );
}
