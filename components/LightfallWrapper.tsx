'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Lightfall = dynamic(() => import('./Lightfall'), { ssr: false });

/** Fixed ambient background. Fades in after the loader and can be toggled from the header. */
export default function LightfallWrapper() {
  const [mounted, setMounted] = useState(false);
  const [on, setOn] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(motionQuery.matches);
    const initialFrame = window.requestAnimationFrame(() => {
      setOn(localStorage.getItem('ambient') !== 'off');
      syncMotion();
    });
    motionQuery.addEventListener('change', syncMotion);
    const timer = setTimeout(() => setMounted(true), 80);
    const onAmbient = (e: Event) => setOn((e as CustomEvent<boolean>).detail);
    window.addEventListener('ambient', onAmbient);
    return () => {
      clearTimeout(timer);
      window.cancelAnimationFrame(initialFrame);
      motionQuery.removeEventListener('change', syncMotion);
      window.removeEventListener('ambient', onAmbient);
    };
  }, []);

  const active = mounted && on && !reducedMotion;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]"
      style={{ opacity: active ? 0.72 : 0.18 }}
    >
      {/* Subtle architectural grid & ambient crimson aurora */}
      <div className="crimson-grid absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,#000_25%,transparent_85%)]" />
      <div className="animate-pulse-slow absolute -top-48 left-1/4 h-[520px] w-[520px] rounded-full bg-primary/12 blur-[140px]" />
      <div className="animate-pulse-slow absolute -bottom-48 right-1/5 h-[460px] w-[460px] rounded-full bg-crimson/25 blur-[130px]" />

      {active && (
        <Lightfall
          colors={['#f40c3f', '#6e0419', '#ff4d6d', '#e50b3b']}
          backgroundColor="#0a0002"
          speed={0.38}
          streakCount={3}
          streakWidth={1.1}
          streakLength={1.15}
          glow={1.15}
          density={0.55}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.45}
          opacity={1}
          mouseInteraction
          mouseStrength={0.65}
          mouseRadius={1.15}
        />
      )}

      {/* Vignette keeps typography crisp over the luminous shader streaks */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0a0002_96%)]" />
    </div>
  );
}
