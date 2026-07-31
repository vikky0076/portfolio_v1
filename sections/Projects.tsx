'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MessageSquare, QrCode, Calculator, Film, Play, Clock, Waves, GraduationCap, Laptop } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const PROJECTS = [
  {
    title: 'Student AI Chatbot',
    desc: 'Conversational AI agent for students, offering quick guidance, reference search, and study guides.',
    tags: ['Next.js', 'OpenAI API', 'Framer Motion'],
    liveHref: 'https://thoughtful-text-bot.lovable.app',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'chat',
  },
  {
    title: 'Smart Attendance System',
    desc: 'QR-based smart attendance tracker with secure location verification and real-time statistics.',
    tags: ['React', 'Node.js', 'MongoDB'],
    liveHref: 'https://sas-smart.vercel.app',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'qr',
  },
  {
    title: 'CGPA Calculator',
    desc: 'Simple and fast CGPA calculator for university students with a beautiful, responsive user interface.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveHref: 'https://novyrax-cgpa-calci.vercel.app/',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'calc',
  },
  {
    title: 'Chess Clock System',
    desc: 'Dynamic digital chess timer supporting custom time controls, delays, and intuitive player controls.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    liveHref: 'https://chess-clock-silk.vercel.app/',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'chess',
  },
  {
    title: 'Flood Safe AI System',
    desc: 'Advanced AI model predicting and warning against flood risks based on hydrological sensor data.',
    tags: ['Python', 'Machine Learning', 'Next.js'],
    liveHref: 'https://floot-safe-ai.netlify.app/',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'flood',
  },
  {
    title: 'Skillora Learning Website',
    desc: 'Feature-rich, interactive e-learning platform providing course directories and custom assessments.',
    tags: ['Next.js', 'Tailwind CSS', 'Firebase'],
    liveHref: 'https://skilloralearn.vercel.app/',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'skillora',
  },
  {
    title: 'Dreams Cut Production Portfolio',
    desc: 'Highly stylized company showcase website representing a digital production agency.',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveHref: 'https://dreamscutproduction.netlify.app/',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'dcp',
  },
  {
    title: 'Dynamic & Static Portfolios',
    desc: 'A repository of interactive responsive developer profiles and single-page landing site layouts.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveHref: 'https://vikky5376.github.io/portpolio/',
    githubHref: 'https://github.com/vikky0076',
    previewType: 'portfolios',
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
      case 'dcp':
        return (
          <div className="w-full h-full bg-secondary/50 rounded-xl border border-white/5 p-3 flex flex-col justify-between overflow-hidden relative">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold font-display text-accent uppercase tracking-wider">Dreams Cut Production</span>
              <Film size={10} className="text-accent" />
            </div>
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-accent animate-pulse">
                <Play size={12} fill="currentColor" className="ml-0.5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[7px] text-white font-semibold">Active Timeline</span>
                <span className="text-[6px] text-text-secondary">Render: 4K UHD</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[6px] text-text-secondary">
              <span>02:14 / 05:00</span>
              <div className="w-16 h-1 bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[45%]" />
              </div>
            </div>
          </div>
        );
      case 'chess':
        return (
          <div className="w-full h-full bg-secondary/50 rounded-xl border border-white/5 p-3 flex flex-col justify-between overflow-hidden relative">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[8px] font-bold font-display text-white">CHESS TIMERS</span>
              <Clock size={10} className="text-accent" />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center justify-center py-2 text-center">
              <div className="bg-primary/60 border border-accent/20 rounded-lg p-1.5 flex flex-col">
                <span className="text-[6px] text-accent uppercase tracking-widest font-bold">White</span>
                <span className="text-sm font-extrabold font-mono text-white">05:00</span>
              </div>
              <div className="bg-accent/10 border border-accent/40 rounded-lg p-1.5 flex flex-col animate-pulse">
                <span className="text-[6px] text-accent uppercase tracking-widest font-bold">Black</span>
                <span className="text-sm font-extrabold font-mono text-accent">04:52</span>
              </div>
            </div>
            <span className="text-[6px] text-text-secondary text-center uppercase tracking-widest">Active Turn: Black</span>
          </div>
        );
      case 'flood':
        return (
          <div className="w-full h-full bg-secondary/50 rounded-xl border border-white/5 p-3 flex flex-col justify-between overflow-hidden relative">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold font-display text-emerald-400 uppercase tracking-wider">Flood Safe AI</span>
              <Waves size={10} className="text-emerald-400" />
            </div>
            <div className="flex flex-col gap-1 items-center justify-center py-1">
              <span className="text-xl font-extrabold font-display text-emerald-400 glow-emerald">SAFE</span>
              <span className="text-[6px] uppercase tracking-widest text-text-secondary">Water Level: 1.2m</span>
            </div>
            <div className="flex justify-between items-center text-[6px] text-text-secondary">
              <span>Risk Level: 5%</span>
              <div className="w-16 h-1 bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[5%]" />
              </div>
            </div>
          </div>
        );
      case 'skillora':
        return (
          <div className="w-full h-full bg-secondary/50 rounded-xl border border-white/5 p-3 flex flex-col justify-between overflow-hidden relative">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[8px] font-bold font-display text-white">Skillora LMS</span>
              <GraduationCap size={10} className="text-accent" />
            </div>
            <div className="flex flex-col gap-1.5 py-1 text-left">
              <div className="flex justify-between text-[7px] text-text-secondary font-semibold">
                <span>React Advanced Course</span>
                <span className="text-accent font-bold">85% Done</span>
              </div>
              <div className="w-full h-1 bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[85%]" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-primary/40 border border-white/5 rounded px-2 py-0.5 self-start">
              <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              <span className="text-[6px] text-text-secondary">Next Assessment: Routing</span>
            </div>
          </div>
        );
      case 'portfolios':
        return (
          <div className="w-full h-full bg-secondary/50 rounded-xl border border-white/5 p-3 flex flex-col justify-between overflow-hidden relative">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold font-display text-white uppercase tracking-wider">Theme Showcase</span>
              <Laptop size={10} className="text-accent" />
            </div>
            <div className="bg-primary/60 border border-white/5 rounded-lg p-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-[8px] font-extrabold text-accent">
                VB
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <div className="h-1 bg-white/20 rounded w-16" />
                <div className="h-1 bg-white/10 rounded w-24" />
              </div>
            </div>
            <div className="flex justify-between text-[6px] text-text-secondary uppercase tracking-widest">
              <span>Static Dev Theme</span>
              <span className="text-accent">Active</span>
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
              {/* Clickable Card Body linking to Live Site */}
              <a
                href={proj.liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col flex-grow cursor-pointer"
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
              </a>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full relative z-10">
                <a
                  href={proj.liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
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
