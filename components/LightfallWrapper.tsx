'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Lightfall = dynamic(() => import('./Lightfall'), { ssr: false });

/** Fixed ambient background. Fades in after the loader and can be toggled from the header. */
export default function LightfallWrapper() {
  const [mounted, setMounted] = useState(false);
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(localStorage.getItem('ambient') !== 'off');
    const timer = setTimeout(() => setMounted(true), 100);
    const onAmbient = (e: Event) => setOn((e as CustomEvent<boolean>).detail);
    window.addEventListener('ambient', onAmbient);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('ambient', onAmbient);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]"
      style={{ opacity: mounted && on ? 0.55 : 0 }}
    >
      {mounted && (
        <Lightfall
          colors={['#f40c3f', '#6e0419', '#ff4d6d']}
          backgroundColor="#0a0002"
          speed={0.35}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.5}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.4}
          opacity={1}
          paused={!on}
          mouseInteraction
          mouseStrength={0.4}
          mouseRadius={1}
        />
      )}
      {/* Vignette keeps text legible over the streaks */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0002_95%)]" />
    </div>
  );
}
