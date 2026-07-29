'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetElement = document.querySelector(anchor.hash) as HTMLElement | null;
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -80, // Offset for sticky navbar
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener('click', handleHashClick);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleHashClick);
    };
  }, []);

  return <>{children}</>;
}
