'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Lightfall = dynamic(() => import('./Lightfall'), { ssr: false });

export default function LightfallWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      <Lightfall
        colors={['#f40c3f', '#6e0419', '#ff4d6d']}
        backgroundColor="#0a0002"
        speed={0.5}
        streakCount={2}
        streakWidth={1}
        streakLength={1}
        glow={1}
        density={0.6}
        twinkle={1}
        zoom={3}
        backgroundGlow={0.5}
        opacity={1}
        mouseInteraction
        mouseStrength={0.5}
        mouseRadius={1}
      />
    </div>
  );
}
