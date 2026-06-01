'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DotGrid = dynamic(() => import('./DotGrid'), { ssr: false });

export default function DotGridWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay slightly to let page transitions run smoothly
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <DotGrid
      dotSize={5}
      gap={15}
      baseColor="#3a2929"
      activeColor="#ff2727"
      proximity={120}
      shockRadius={250}
      shockStrength={5}
      resistance={750}
      returnDuration={1.5}
      className="!p-0 w-full h-full"
    />
  );
}
