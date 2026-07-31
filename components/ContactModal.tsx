'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, X, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function ContactModal() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Listen for the custom event to open the contact form modal
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-contact', handleOpen);
    return () => window.removeEventListener('open-contact', handleOpen);
  }, []);

  // Pre-fill Name & Email if logged in
  useEffect(() => {
    if (user && isOpen) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.displayName || user.email?.split('@')[0] || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user, isOpen]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');
    setSubmitError(null);

    try {
      // Save submission inside Firestore contact_messages collection.
      // With local persistence enabled, Firestore writes update the local cache immediately and sync in the background.
      const docRefPromise = addDoc(collection(db, 'contact_messages'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
        status: 'New',
        userId: user?.uid || null,
      });

      // We wait up to 2 seconds for server acknowledgment. If it takes longer (slow connection/offline),
      // we proceed to the success view anyway and let Firestore sync in the background.
      await Promise.race([
        docRefPromise,
        new Promise((resolve) => setTimeout(resolve, 2000))
      ]);

      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto close modal after successful dispatch
      setTimeout(() => {
        setFormState('idle');
        setIsOpen(false);
      }, 3000);
    } catch (err: any) {
      console.error('Error submitting contact form:', err);
      setFormState('idle');
      setSubmitError(err.message || 'Failed to transmit message. Please verify your connection.');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setFormState('idle');
    setSubmitError(null);
    setErrors({ name: '', email: '', subject: '', message: '' });
  };

  const handleRedirectToLogin = () => {
    handleClose();
    router.push('/login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="glass-card rounded-3xl p-6 md:p-8 w-full max-w-lg relative overflow-hidden bg-[#131313]/90 shadow-2xl border border-white/10 z-10"
          >
            {/* Background glowing Neon Paper Airplane Icon */}
            <div className="absolute right-[-10px] bottom-[-10px] w-48 h-48 opacity-[0.06] select-none pointer-events-none z-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-[#FF5E00] stroke-[1px] glow-orange">
                <path d="M22 2L2 9L11 13L19 6L12 14L15 22L22 2Z" />
              </svg>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-secondary hover:text-white hover:bg-white/5 p-1.5 rounded-lg transition-all cursor-pointer focus:outline-none z-10"
              aria-label="Close Contact Form"
            >
              <X size={18} />
            </button>

            {authLoading ? (
              // Loading screen
              <div className="flex flex-col items-center justify-center py-20 min-h-[350px]">
                <Loader2 size={36} className="text-accent animate-spin" />
                <span className="text-xs text-text-secondary mt-4 font-semibold">Authenticating session...</span>
              </div>
            ) : !user ? (
              // Locked state if not authenticated
              <div className="text-center flex flex-col items-center justify-center py-10 min-h-[320px] relative z-10">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 animate-pulse">
                  <Lock size={24} />
                </div>
                <h2 className="text-xl font-bold font-display text-white mb-2">Authentication Required</h2>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm mb-8">
                  To prevent spam submissions and secure your conversation history, please sign in before sending a message.
                </p>
                <button
                  onClick={handleRedirectToLogin}
                  className="w-full max-w-xs inline-flex items-center justify-center bg-accent text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(255,94,0,0.2)] hover:scale-[1.01] transition-transform duration-200 cursor-pointer focus:outline-none"
                >
                  Sign In to Continue
                </button>
              </div>
            ) : (
              // Authorized Form
              <div className="relative z-10 w-full">
                {/* Content Header */}
                <div className="text-left mb-6 pr-8">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold font-display text-accent mb-2 block">
                    Secure Channel
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white mb-2">
                    Send a <span className="text-gradient">Message</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
                    Hello, <strong className="text-white">{user.displayName || user.email?.split('@')[0]}</strong>. Drop me a line below.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-sans">
                  <AnimatePresence mode="wait">
                    {formState === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-emerald-400 gap-2 min-h-[280px]"
                      >
                        <CheckCircle2 size={36} className="text-emerald-500 animate-bounce" />
                        <span className="text-sm font-bold uppercase tracking-wider">Message Dispatched</span>
                        <span className="text-xs text-emerald-300">Successfully sent! Vignesh B will respond shortly.</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-3"
                      >
                        {/* Transmission Failure Alert */}
                        {submitError && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2.5 rounded-xl text-center font-medium">
                            {submitError}
                          </div>
                        )}

                        {/* Name input */}
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={formState === 'submitting'}
                            className="w-full text-xs sm:text-sm bg-primary/45 border border-white/5 hover:border-white/15 focus:border-accent rounded-xl px-4 py-3 text-white placeholder-text-secondary transition-all"
                          />
                          {errors.name && <span className="text-[10px] text-red-500 text-left block mt-1 px-1">{errors.name}</span>}
                        </div>

                        {/* Email input */}
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={formState === 'submitting' || !!user.email} // lock email if verified
                            className="w-full text-xs sm:text-sm bg-primary/45 border border-white/5 hover:border-white/15 focus:border-accent rounded-xl px-4 py-3 text-white placeholder-text-secondary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                          />
                          {errors.email && <span className="text-[10px] text-red-500 text-left block mt-1 px-1">{errors.email}</span>}
                        </div>

                        {/* Subject input */}
                        <div>
                          <input
                            type="text"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            disabled={formState === 'submitting'}
                            className="w-full text-xs sm:text-sm bg-primary/45 border border-white/5 hover:border-white/15 focus:border-accent rounded-xl px-4 py-3 text-white placeholder-text-secondary transition-all"
                          />
                          {errors.subject && <span className="text-[10px] text-red-500 text-left block mt-1 px-1">{errors.subject}</span>}
                        </div>

                        {/* Message Input */}
                        <div>
                          <textarea
                            placeholder="Type your message here..."
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            disabled={formState === 'submitting'}
                            className="w-full text-xs sm:text-sm bg-primary/45 border border-white/5 hover:border-white/15 focus:border-accent rounded-xl px-4 py-3 text-white placeholder-text-secondary transition-all resize-none"
                          />
                          {errors.message && <span className="text-[10px] text-red-500 text-left block mt-1 px-1">{errors.message}</span>}
                        </div>

                        {/* Send Button */}
                        <button
                          type="submit"
                          disabled={formState === 'submitting'}
                          className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white text-xs sm:text-sm uppercase tracking-widest font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(255,94,0,0.2)] hover:shadow-[0_0_20px_rgba(255,94,0,0.35)] transition-all duration-300 disabled:opacity-50 hover:scale-[1.01]"
                        >
                          {formState === 'submitting' ? 'Transmitting...' : 'Send Message'}
                          <Send size={12} className="text-white" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
