"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Lock scrolling until the intro loader has finished.
    let onLoaded: (() => void) | undefined;
    if (!document.documentElement.classList.contains("loaded")) {
      lenis.stop();
      onLoaded = () => lenis.start();
      window.addEventListener("app:loaded", onLoaded, { once: true });
    }

    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      if (onLoaded) window.removeEventListener("app:loaded", onLoaded);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
