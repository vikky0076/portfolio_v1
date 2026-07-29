'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const { 
    user, 
    loading, 
    loginWithGoogle, 
    sendMagicLink, 
    error, 
    setError, 
    magicLinkSent, 
    setMagicLinkSent 
  } = useAuth();
  
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved email if Remember Me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      await sendMagicLink(email);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B0B] text-white flex items-center justify-center relative overflow-hidden select-none font-sans">
      
      {/* Background Decorative Blur Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        
        {/* Left Column - Welcome Intro */}
        <div className="lg:col-span-6 flex flex-col items-start justify-center text-left">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => router.push('/')}>
            <svg
              viewBox="0 0 50 32"
              className="w-10 h-6 text-accent fill-none stroke-current filter drop-shadow-[0_0_8px_rgba(255,94,0,0.45)]"
              strokeWidth={4.5}
              strokeLinecap="square"
              strokeLinejoin="miter"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 4,4 L 14,26 L 24,4" />
              <path d="M 28,4 L 28,26" />
              <path d="M 28,4 L 38,4 C 43,4 45,7 45,11.5 C 45,15 43,15 38,15 L 28,15" />
              <path d="M 28,15 L 39,15 C 44,15 46,18 46,22.5 C 46,26 44,26 39,26 L 28,26" />
            </svg>
            <span className="text-white font-display text-xs font-bold tracking-widest uppercase transition-colors hover:text-accent">
              VIGNESH B
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-7xl font-extrabold font-display leading-none mb-6">
              Welcome <br />
              <span className="text-gradient">Back</span>
            </h1>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md font-medium">
              Sign in to verify your identity and unlock premium features, full-featured contact channels, and customized interactions on my portfolio.
            </p>
          </motion.div>

          {/* Abstract Orange Glow Element */}
          <div className="relative mt-8 w-64 h-32 opacity-25 select-none pointer-events-none hidden lg:block">
            <div className="absolute inset-0 bg-accent/40 rounded-full blur-[40px] animate-pulse" />
            <div className="absolute top-[10px] left-[50px] w-24 h-24 bg-accent/60 rounded-full blur-[20px] scale-y-40 animate-pulse-slow" />
          </div>
        </div>

        {/* Right Column - Glass Login Card */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 sm:p-12 w-full max-w-[500px] relative overflow-hidden bg-secondary/15 border border-white/5 shadow-2xl flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {magicLinkSent ? (
                // Magic Link Sent Success View
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center flex flex-col items-center justify-center py-6 min-h-[300px]"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-white mb-3">Check your inbox</h2>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm mb-8">
                    We have dispatched a magic login link to <strong className="text-white">{email}</strong>. Click the link in your email to log in automatically.
                  </p>
                  <button
                    onClick={() => setMagicLinkSent(false)}
                    className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-accent/40 bg-secondary/35 text-white text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition-all duration-300 cursor-pointer w-full"
                  >
                    Use a different email
                  </button>
                </motion.div>
              ) : (
                // Standard Login Fields View
                <motion.div
                  key="login-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold font-display text-white mb-2">Access Portal</h2>
                    <p className="text-xs text-text-secondary">Passwordless registration and login options.</p>
                  </div>

                  {/* Errors alerts */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2.5"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Primary Google Login Button */}
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading || isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 bg-white text-neutral-900 font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md"
                  >
                    <FcGoogle size={18} />
                    <span>Sign In with Google</span>
                  </button>

                  {/* OR Separator */}
                  <div className="flex items-center gap-4 my-2">
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">or continue with</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>

                  {/* Email Login Form */}
                  <form onSubmit={handleMagicLinkLogin} className="flex flex-col gap-4">
                    <div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                          <Mail size={16} />
                        </span>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                          }}
                          disabled={loading || isSubmitting}
                          required
                          className="w-full text-xs sm:text-sm bg-primary/45 border border-white/5 hover:border-white/15 focus:border-accent rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-text-secondary transition-all"
                        />
                      </div>
                    </div>

                    {/* Remember me toggle */}
                    <div className="flex items-center justify-between mt-1 px-1">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs text-text-secondary select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          disabled={loading || isSubmitting}
                          className="w-4 h-4 rounded bg-primary/50 border-white/10 text-accent focus:ring-accent accent-accent cursor-pointer"
                        />
                        <span>Remember my email</span>
                      </label>
                      
                      <span className="text-xs text-accent font-semibold cursor-pointer hover:underline" onClick={() => router.push('/register')}>
                        Create account
                      </span>
                    </div>

                    {/* Continue Button */}
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white text-xs uppercase tracking-widest font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(255,94,0,0.2)] hover:shadow-[0_0_20px_rgba(255,94,0,0.35)] transition-all duration-300 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span>Sending Link...</span>
                          <Loader2 size={12} className="animate-spin" />
                        </>
                      ) : (
                        <span>Send Magic Link</span>
                      )}
                    </button>
                  </form>

                  {/* Footnote / Legal links */}
                  <div className="text-[10px] text-text-secondary text-center leading-relaxed mt-4">
                    By accessing, you agree to our{' '}
                    <span className="hover:underline hover:text-white cursor-pointer">Terms of Service</span> and{' '}
                    <span className="hover:underline hover:text-white cursor-pointer">Privacy Policy</span>.
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-white/5 my-2" />

                  {/* Back to Portfolio button */}
                  <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center justify-center gap-2 text-text-secondary hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors duration-200 cursor-pointer"
                  >
                    <ArrowLeft size={12} />
                    <span>Back to Portfolio</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
