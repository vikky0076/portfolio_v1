'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 120; // Scroll offset trigger
      for (const item of NAV_ITEMS) {
        const id = item.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-primary/75 backdrop-blur-md border-b border-white/5 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <svg
              viewBox="0 0 50 32"
              className="w-10 h-6 text-accent fill-none stroke-current filter drop-shadow-[0_0_8px_rgba(255,94,0,0.45)] transition-transform duration-300 group-hover:scale-105"
              strokeWidth={4.5}
              strokeLinecap="square"
              strokeLinejoin="miter"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* V path */}
              <path d="M 4,4 L 14,26 L 24,4" />
              {/* B path */}
              <path d="M 28,4 L 28,26" />
              <path d="M 28,4 L 38,4 C 43,4 45,7 45,11.5 C 45,15 43,15 38,15 L 28,15" />
              <path d="M 28,15 L 39,15 C 44,15 46,18 46,22.5 C 46,26 44,26 39,26 L 28,26" />
            </svg>
            <span className="text-white font-display text-xs font-bold tracking-widest uppercase transition-colors duration-300 group-hover:text-accent">
              VIGNESH B
            </span>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-6 bg-secondary/40 border border-white/5 rounded-full px-5 py-2 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`relative text-[11px] uppercase tracking-widest font-semibold font-display px-2 py-1 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent shadow-[0_0_8px_rgba(255,106,0,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA Button / Auth Badge */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2.5 bg-secondary/50 border border-white/5 rounded-full px-3 py-1.5 backdrop-blur-sm shadow-md">
                <img
                  src={user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`}
                  alt={user.displayName || 'User'}
                  className="w-6.5 h-6.5 rounded-full border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`;
                  }}
                />
                <span className="text-[10px] uppercase tracking-widest font-bold text-white max-w-[80px] truncate">
                  {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
                
                {user.email === 'vigneshbs7653@gmail.com' && (
                  <button
                    onClick={() => router.push('/admin')}
                    className="p-1 text-accent hover:text-white transition-colors cursor-pointer"
                    title="Admin Panel"
                  >
                    <ShieldAlert size={14} />
                  </button>
                )}
                
                <button
                  onClick={() => logout()}
                  className="p-1 text-text-secondary hover:text-red-400 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/login');
                }}
                className="relative inline-flex items-center justify-center px-5 py-2 text-[10px] uppercase tracking-widest font-bold font-display rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer focus:outline-none"
              >
                Sign In
              </button>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-contact'));
              }}
              className="relative inline-flex items-center justify-center px-5 py-2 text-xs uppercase tracking-widest font-bold font-display rounded-full bg-accent text-white shadow-[0_0_20px_rgba(255,94,0,0.2)] hover:shadow-[0_0_25px_rgba(255,94,0,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer focus:outline-none"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile controls: Sign In & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Auth Button / Avatar */}
            {user ? (
              <div className="flex items-center gap-2 bg-secondary/50 border border-white/5 rounded-full pl-1.5 pr-2.5 py-1.5 backdrop-blur-sm shadow-md">
                <img
                  src={user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`}
                  alt={user.displayName || 'User'}
                  className="w-5.5 h-5.5 rounded-full border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`;
                  }}
                />
                
                {user.email === 'vigneshbs7653@gmail.com' && (
                  <button
                    onClick={() => router.push('/admin')}
                    className="p-0.5 text-accent hover:text-white transition-colors cursor-pointer"
                    title="Admin Panel"
                  >
                    <ShieldAlert size={12} />
                  </button>
                )}
                
                <button
                  onClick={() => logout()}
                  className="p-0.5 text-text-secondary hover:text-red-400 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={11} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/login');
                }}
                className="relative inline-flex items-center justify-center px-3.5 py-1.5 text-[9px] uppercase tracking-widest font-bold font-display rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer focus:outline-none"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white hover:text-accent transition-colors focus:outline-none p-1.5 rounded-lg border border-white/5 bg-secondary/50"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-lg pt-24 px-6 flex flex-col gap-6 lg:hidden"
          >
            <nav className="flex flex-col gap-5 justify-center items-center mt-8">
              {NAV_ITEMS.map((item) => {
                const id = item.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={`text-sm uppercase tracking-widest font-bold font-display py-2 ${
                      isActive ? 'text-accent text-glow-orange' : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
            <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-xs mx-auto">
              {user ? (
                <div className="flex flex-col items-center gap-3 w-full border border-white/5 bg-secondary/20 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3 w-full">
                    <img
                      src={user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full border border-white/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`;
                      }}
                    />
                    <div className="text-left min-w-0 flex-1 font-sans">
                      <p className="text-xs font-bold text-white truncate leading-none mb-1">
                        {user.displayName || user.email?.split('@')[0]}
                      </p>
                      <p className="text-[10px] text-text-secondary truncate leading-none">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full mt-2">
                    {user.email === 'vigneshbs7653@gmail.com' && (
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          router.push('/admin');
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary/50 border border-white/10 hover:border-accent/40 text-accent text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer"
                      >
                        <ShieldAlert size={14} />
                        Admin
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    router.push('/login');
                  }}
                  className="w-full text-center py-3 text-xs uppercase tracking-widest font-bold font-display rounded-full border border-white/10 text-white hover:bg-white/5 transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent('open-contact'));
                }}
                className="w-full text-center py-3 text-xs uppercase tracking-widest font-bold font-display rounded-full bg-accent text-white shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
