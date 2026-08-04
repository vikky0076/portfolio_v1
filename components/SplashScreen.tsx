'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');

  const fullLine1 = "Welcome to my portfolio";
  const fullLine2 = "Thank you for visiting my portfolio";

  useEffect(() => {
    // Disable scroll during splash screen
    document.body.style.overflow = 'hidden';

    let index1 = 0;
    let index2 = 0;
    let timer: NodeJS.Timeout;

    // Type line 1
    const typeLine1 = () => {
      if (index1 < fullLine1.length) {
        setLine1(fullLine1.substring(0, index1 + 1));
        index1++;
        timer = setTimeout(typeLine1, 100);
      } else {
        // Line 1 finished, wait 700ms then start line 2
        timer = setTimeout(typeLine2, 700);
      }
    };

    // Type line 2
    const typeLine2 = () => {
      if (index2 < fullLine2.length) {
        setLine2(fullLine2.substring(0, index2 + 1));
        index2++;
        timer = setTimeout(typeLine2, 85);
      } else {
        // Line 2 finished, wait 1800ms then fade out splash screen
        timer = setTimeout(() => {
          setShow(false);
          document.body.style.overflow = '';
        }, 1800);
      }
    };

    // Start typing
    timer = setTimeout(typeLine1, 400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0B0B0B] flex flex-col items-center justify-center px-6"
        >
          {/* Subtle glowing center radial background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Typing Text Container */}
          <div className="text-center flex flex-col gap-4 max-w-2xl relative z-10 font-display">
            {/* Line 1: welcome to my portfolio */}
            <h1 className="font-faster text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-wide text-accent drop-shadow-[0_0_35px_rgba(255,94,0,0.35)] min-h-[50px] sm:min-h-[80px]">
              {line1}
              {line1.length < fullLine1.length && line1.length > 0 && (
                <span className="inline-block w-1.5 h-8 sm:h-12 lg:h-14 ml-1 bg-accent animate-pulse" />
              )}
            </h1>

            {/* Line 2: thank you for visiting my portfolio */}
            <p className="font-faster text-sm sm:text-2xl lg:text-3xl font-normal uppercase tracking-wide text-accent drop-shadow-[0_0_25px_rgba(255,94,0,0.35)] min-h-[30px]">
              {line2}
              {line2.length < fullLine2.length && line1.length === fullLine1.length && (
                <span className="inline-block w-1 h-5 sm:h-7 lg:h-8 ml-1 bg-accent animate-pulse" />
              )}
            </p>
          </div>

          {/* Subtle loading indicator ring at the bottom */}
          <div className="absolute bottom-16 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.1s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.5s]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
