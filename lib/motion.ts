"use client";

import { useEffect, useState } from "react";

type Bezier = [number, number, number, number];

/** Soft expo-out — used for most reveals. */
export const EASE: Bezier = [0.22, 1, 0.36, 1];
/** Strong in-out — used for curtains, clip-path wipes and large moves. */
export const EASE_IN_OUT: Bezier = [0.76, 0, 0.24, 1];

/** True once the intro loader has finished (immediately true on client-side navigations). */
export function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains("loaded")) {
      const frame = window.requestAnimationFrame(() => setLoaded(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const on = () => setLoaded(true);
    window.addEventListener("app:loaded", on);
    return () => window.removeEventListener("app:loaded", on);
  }, []);
  return loaded;
}

/** Smoothly scroll to an element id, using Lenis when available. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement | number, o?: object) => void } }).__lenis;
  const target = id === "hero" ? 0 : el;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  } else if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
