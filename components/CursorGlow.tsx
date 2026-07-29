'use client';

import React, { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable cursor glow on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updatePosition = () => {
      // Linear interpolation (lerp) for smooth lag/following effect
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="cursor-glow"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
