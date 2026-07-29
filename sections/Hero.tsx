'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import profileImg from '@/public/assets/profile.png';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaCode } from 'react-icons/fa';

const TYPEWRITER_WORDS = [
  'Software Engineer',
  'AI Engineer',
  'Full Stack Developer',
  'ML Engineer',
];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Parallax ref
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = TYPEWRITER_WORDS[wordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }, 100);
    }

    if (!isDeleting && typedText === currentWord) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx]);

  // Mouse parallax effect for right column orbits
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate normalized position between -1 and 1
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent"
    >
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start items-center relative z-10">
        {/* Left Column - Info & Action */}
        <div className="lg:col-span-7 flex flex-col items-start text-left lg:h-[580px] lg:justify-between lg:py-4">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] tracking-widest font-extrabold uppercase font-display mb-6 lg:mb-0 shadow-[0_0_15px_rgba(255,106,0,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Software Engineer
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-start gap-1 mb-4 lg:mb-0 w-full"
          >
            <span className="font-playfair italic font-normal text-text-secondary text-4xl sm:text-5xl lg:text-6xl tracking-wide select-none">
              Hi, I'm
            </span>
            <span className="font-syne font-extrabold uppercase text-gradient tracking-tight text-5xl sm:text-8xl lg:text-[100px] leading-none py-1 block drop-shadow-[0_0_35px_rgba(255,94,0,0.2)]">
              Vignesh
            </span>
          </motion.h1>

          {/* Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl lg:text-3xl text-text-secondary font-display font-medium mb-10 lg:mb-0 h-10 tracking-wide"
          >
            I'm a <span className="text-accent border-r-3 border-accent animate-pulse font-bold">{typedText}</span>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            {[
              { icon: FaLinkedinIn, href: 'https://linkedin.com/in/vignesh-b' },
              { icon: FaGithub, href: 'https://github.com/vikky0076' },
              { icon: FaEnvelope, href: 'mailto:vigneshb00x@gmail.com' },
              { icon: FaCode, href: 'https://github.com/vikky0076' },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-white/5 bg-secondary/25 hover:bg-accent/10 hover:border-accent/40 rounded-lg text-text-secondary hover:text-accent transition-all duration-300 hover:scale-105 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column - Avatar & Parallax Orbit */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-12">
          {/* Background is clean and transparent */}

          {/* Profile Picture Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-[320px] h-[500px] sm:w-[400px] sm:h-[650px] lg:w-[460px] lg:h-[720px] z-10 flex justify-center items-end"
            style={{
              transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0)`,
              transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >


            {/* Orange glowing standing platform (Galaxy splash effect under shoes) */}
            <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[260px] h-[50px] z-0 pointer-events-none select-none">
              {/* Inner core glows */}
              <div className="absolute inset-0 bg-accent/40 rounded-full blur-[20px] scale-y-40 animate-pulse" />
              <div className="absolute inset-x-8 inset-y-1 bg-[#FF5E00]/60 rounded-full blur-[8px] scale-y-30 animate-pulse-slow" />
              
              {/* Splashing star/galaxy particles */}
              <div className="absolute w-1.5 h-1.5 rounded-full bg-accent animate-ping top-[10%] left-[15%] shadow-[0_0_8px_#FF5E00]" />
              <div className="absolute w-1 h-1 rounded-full bg-[#FF8B3D] animate-ping top-[30%] right-[10%] shadow-[0_0_6px_#FF5E00] [animation-delay:0.3s]" />
              <div className="absolute w-2 h-2 rounded-full bg-accent/80 animate-ping bottom-[5%] left-[45%] shadow-[0_0_10px_#FF5E00] [animation-delay:0.7s]" />
              <div className="absolute w-1 h-1 rounded-full bg-white top-[15%] right-[30%] shadow-[0_0_4px_#FFF] animate-pulse" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-accent top-[50%] left-[25%] shadow-[0_0_8px_#FF5E00] animate-pulse [animation-delay:0.5s]" />
              <div className="absolute w-1 h-1 rounded-full bg-[#FF5E00] bottom-[20%] right-[20%] shadow-[0_0_6px_#FF5E00] animate-pulse [animation-delay:0.9s]" />

              {/* Cosmic dust ring orbits */}
              <div className="absolute inset-x-[-15px] inset-y-[-5px] border border-accent/15 rounded-full blur-[1px] rotate-[-5deg] scale-y-25 animate-orbit-rotate opacity-75" />
              <div className="absolute inset-x-[-8px] inset-y-[-3px] border border-dashed border-[#FF8B3D]/20 rounded-full rotate-[8deg] scale-y-30 animate-orbit-rotate-reverse opacity-60" />
            </div>

            {/* Orange Thunder/Lightning Background Shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{ 
                opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                scale: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                delay: 0.5 
              }}
              className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none select-none w-full h-[95%] top-[2%]"
            >
              <svg
                viewBox="0 0 100 200"
                className="w-[75%] h-full filter drop-shadow-[0_0_20px_rgba(255,94,0,0.3)]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="thunder-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5E00" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#FF8B3D" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#FF5E00" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Glowing Background Body */}
                <path
                  d="M 60 10 L 35 90 L 55 90 L 30 150 L 50 150 L 40 190 L 65 110 L 45 110 L 70 50 L 52 50 Z"
                  fill="url(#thunder-grad)"
                  stroke="#FF5E00"
                  strokeWidth="2"
                  strokeLinejoin="miter"
                  opacity="0.8"
                />
                {/* Thick Outer Glow Stroke */}
                <path
                  d="M 60 10 L 35 90 L 55 90 L 30 150 L 50 150 L 40 190 L 65 110 L 45 110 L 70 50 L 52 50 Z"
                  fill="none"
                  stroke="#FF5E00"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  opacity="0.3"
                  className="blur-[6px]"
                />
                {/* Middle Glow Stroke */}
                <path
                  d="M 60 10 L 35 90 L 55 90 L 30 150 L 50 150 L 40 190 L 65 110 L 45 110 L 70 50 L 52 50 Z"
                  fill="none"
                  stroke="#FF8B3D"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  opacity="0.6"
                  className="blur-[2px]"
                />
                {/* Bright Core Stroke */}
                <path
                  d="M 60 10 L 35 90 L 55 90 L 30 150 L 50 150 L 40 190 L 65 110 L 45 110 L 70 50 L 52 50 Z"
                  fill="none"
                  stroke="#FFEAD1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  opacity="0.95"
                />
              </svg>
            </motion.div>

            {/* Image Container with CSS Mask for smooth fade-out */}
            <div 
              className="relative w-full h-full overflow-hidden select-none z-10"
              style={{
                WebkitMaskImage: 'linear-gradient(to top, transparent, #000 180px)',
                maskImage: 'linear-gradient(to top, transparent, #000 180px)',
              }}
            >
              <Image
                src={profileImg}
                alt="Vignesh B standing portrait"
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 460px"
                className="object-contain object-bottom filter contrast-[1.05]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Downward mouse-scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <button
          onClick={() => handleScrollTo('about')}
          className="flex flex-col items-center gap-2 group focus:outline-none"
        >
          <span className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1.5 transition-colors group-hover:border-accent">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-1.5 bg-accent rounded-full"
            />
          </span>
          <span className="text-[9px] uppercase tracking-widest text-text-secondary group-hover:text-white transition-colors">
            
          </span>
        </button>
      </div>
    </section>
  );
}
