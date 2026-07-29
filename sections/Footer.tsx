'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-8 bg-transparent border-t border-white/5 select-none font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright */}
        <div className="text-[11px] sm:text-xs text-text-secondary font-medium tracking-wide">
          &copy; 2026 All Rights Reserved
        </div>

        {/* Right: Credits & Back to Top */}
        <div className="flex items-center gap-6">
          <div className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold font-display text-text-secondary">
            Developed by <span className="text-accent glow-orange-text">VIGNESH</span>
          </div>
          
          {/* Scroll to Top */}
          <button
            onClick={handleScrollTop}
            className={`p-2 rounded-full border border-white/5 bg-secondary/40 text-text-secondary hover:text-white hover:border-accent/40 transition-all duration-300 cursor-pointer ${
              showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
            }`}
            aria-label="Back to Top"
          >
            <ArrowUp size={14} className="text-accent" />
          </button>
        </div>
        
      </div>
    </footer>
  );
}
