'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MessageSquare, QrCode, Calculator } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const PROJECTS = [
  {
    title: 'AI Chatbot for Student Support',
    desc: 'AI-powered assistant that helps students with instant answers, resources and guidance.',
    tags: ['Next.js', 'OpenAI API', 'Tailwind CSS'],
    liveHref: '#',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'chat',
  },
  {
    title: 'Smart Attendance System',
    desc: 'QR-based attendance system with location verification and real-time reporting.',
    tags: ['React', 'Node.js', 'MongoDB'],
    liveHref: '#',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'qr',
  },
  {
    title: 'CGPA Calculator',
    desc: 'Simple and fast CGPA calculator for university students with beautiful UI.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveHref: '#',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'calc',
  },
];

export default function Projects() {
  const renderPreview = (type: string) => {
    switch (type) {
      case 'chat':
        return (
          <div className="w-full h-full bg-secondary/50 rounded-xl border border-white/5 p-3 flex flex-col justify-between overflow-hidden relative group/chat-preview">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[8px] uppercase tracking-widest text-text-secondary font-bold font-display">
                  Student Bot
                </span>
              </div>
              <div className="self-start bg-secondary border border-white/5 rounded-lg px-2 py-1 text-[8px] max-w-[85%] text-text-secondary">
                Hello Vignesh B! How can I assist you with your exam prep?
              </div>
              <div className="self-end bg-accent/15 border border-accent/25 text-accent rounded-lg px-2 py-1 text-[8px] max-w-[85%]">
                Tell me about my next AI & ML lecture.
              </div>
            </div>
            <div className="h-4 bg-primary/40 border border-white/5 rounded-full flex items-center px-2 justify-between">
              <span className="text-[7px] text-text-secondary">Type message...</span>
              <MessageSquare size={8} className="text-accent" />
            </div>
          </div>
        );
      case 'qr':
        return (
          <div className="w-full h-full bg-secondary/50 rounded-xl border border-white/5 flex flex-col justify-center items-center gap-2 overflow-hidden relative">
            <div className="relative p-2.5 bg-primary/80 border border-accent/20 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <QrCode size={36} className="text-accent glow-orange" />
              {/* Scan laser line */}
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-accent/80 shadow-[0_0_8px_#FF5E00] animate-bounce" />
            </div>
            <span className="text-[7px] uppercase tracking-wider text-text-secondary">
              GPS Lock Verified
            </span>
          </div>
        );
      case 'calc':
        return (
          <div className="w-full h-full bg-secondary/50 rounded-xl border border-white/5 p-3 flex flex-col justify-between overflow-hidden relative">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[8px] font-bold font-display text-white">CGPA Board</span>
              <Calculator size={10} className="text-accent" />
            </div>
            <div className="flex flex-col gap-1 items-center justify-center py-1">
              <span className="text-2xl font-extrabold font-display text-accent glow-orange">9.3</span>
              <span className="text-[7px] uppercase tracking-widest text-text-secondary">Takshashila GPA</span>
            </div>
            <div className="w-full h-1 bg-primary rounded-full overflow-hidden">
              <div className="h-full bg-accent w-[93%]" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-24 bg-transparent select-none overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[110px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold font-display text-accent mb-3 block">
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-4">
            Innovations & <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between relative group hover:scale-[1.02] duration-300"
            >
              {/* Mockup Preview Area */}
              <div className="w-full h-[180px] rounded-2xl overflow-hidden mb-6 bg-primary/20 border border-white/5 flex items-center justify-center p-3 relative">
                {renderPreview(proj.previewType)}
              </div>

              {/* Text Details */}
              <div className="flex flex-col text-left flex-grow mb-6">
                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans mb-4">
                  {proj.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-3 py-1 rounded-lg bg-secondary border border-white/5 text-text-secondary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                <a
                  href={proj.liveHref}
                  className="flex-1 text-center text-xs uppercase tracking-widest font-bold py-3 bg-accent/10 border border-accent/25 hover:bg-accent hover:text-white text-accent rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  Live Demo <ExternalLink size={12} />
                </a>
                <a
                  href={proj.githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs uppercase tracking-widest font-bold py-3 bg-secondary border border-white/5 hover:border-white/20 text-white rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300"
                >
                  <FaGithub size={13} /> GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
