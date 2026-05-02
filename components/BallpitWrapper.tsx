"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Ballpit = dynamic(() => import("./Ballpit"), { ssr: false });

export default function BallpitWrapper() {
  const [ballCount, setBallCount] = useState(175);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Reduce ball count on mobile for better performance
    if (window.innerWidth < 768) {
      setBallCount(100);
    }
    
    // Delay Ballpit mounting to allow initial page transitions to play smoothly 
    // without WebGL compilation blocking the main thread
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return null;

  return (
    <Ballpit
      count={ballCount}
      gravity={0.5}
      friction={0.9975}
      wallBounce={0.95}
      followCursor={false}
      colors={[0xffffff, 0xf40c3f, 0xe50b3b, 0x6e0419, 0x310108]}
      ambientColor={0x310108}
    />
  );
}
