"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_IN_OUT } from "@/lib/motion";
import { SITE } from "@/lib/site";

const TELEMETRY_STEPS = [
  "INITIALIZING WEBGL LIGHTFALL SHADER",
  "LOADING EDITORIAL & DISPLAY TYPOGRAPHY",
  "CALIBRATING LENIS & SPRING PHYSICS",
  "SYSTEM ONLINE — WELCOME",
];

/** Intro loader: eased % counter + crimson eclipse phase + telemetry readout, then wipes up to reveal the page. */
export default function Loader() {
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const finishImmediately = () => {
      const frame = window.requestAnimationFrame(() => {
        setDone(true);
        html.classList.add("loaded");
        window.dispatchEvent(new Event("app:loaded"));
      });
      return () => window.cancelAnimationFrame(frame);
    };
    if (html.classList.contains("loaded")) {
      return finishImmediately();
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return finishImmediately();
    }
    window.scrollTo(0, 0);

    let ready = false;
    let finished = false;
    let raf = 0;
    const start = performance.now();
    const pageLoad = new Promise<void>((r) =>
      document.readyState === "complete" ? r() : window.addEventListener("load", () => r(), { once: true })
    );
    Promise.race([
      Promise.all([pageLoad, document.fonts?.ready]),
      new Promise((r) => setTimeout(r, 3200)),
    ]).then(() => {
      ready = true;
    });

    const tick = (t: number) => {
      const lin = Math.min((t - start) / 1450, ready ? 1 : 0.78);
      setP(Math.round((1 - Math.pow(1 - lin, 3)) * 100));
      if (lin < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (finished) return;
      finished = true;
      setTimeout(() => {
        setDone(true);
        html.classList.add("loaded");
        window.dispatchEvent(new Event("app:loaded"));
      }, 260);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const hole = 1 - p / 100;
  const circumference = 2 * Math.PI * 46;
  const dashOffset = circumference * (1 - p / 100);
  const stepIndex = Math.min(TELEMETRY_STEPS.length - 1, Math.floor((p / 100) * TELEMETRY_STEPS.length));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9998] flex flex-col justify-between overflow-hidden bg-[#0a0002] px-6 py-6 text-white md:px-12 md:py-9"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: EASE_IN_OUT }}
        >
          {/* Ambient crimson glow inside loader */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]"
          />
          <div aria-hidden className="crimson-grid pointer-events-none absolute inset-0 opacity-30" />

          {/* Top bar */}
          <motion.div
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_IN_OUT }}
            className="relative z-10 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50"
          >
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/jzj.png" alt="" className="h-6 w-6 object-contain" />
              <span className="font-robotomedium text-white/80">{SITE.name}</span>
            </div>
            <span className="hidden sm:inline">PORTFOLIO EDITION {"//"} {new Date().getFullYear()}</span>
            <span className="tabular-nums text-primary">SYS.{String(p).padStart(3, "0")}</span>
          </motion.div>

          {/* Centerpiece Eclipse & Telemetry */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.94, y: -24 }}
            transition={{ duration: 0.55, ease: EASE_IN_OUT }}
          >
            <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
                <defs>
                  <mask id="loader-mask">
                    <rect width="100" height="100" fill="#fff" />
                    <circle cx={50 + 34 * hole} cy={50 - 22 * hole} r={34 * hole} fill="#000" />
                  </mask>
                  <radialGradient id="eclipse-grad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ff4d6d" />
                    <stop offset="55%" stopColor="#f40c3f" />
                    <stop offset="100%" stopColor="#6e0419" />
                  </radialGradient>
                </defs>
                {/* Outer track */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                {/* Progress ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#f40c3f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
                {/* Inner eclipse orb */}
                <g className="rotate-90 origin-center">
                  <circle cx="50" cy="50" r="32" fill="url(#eclipse-grad)" mask="url(#loader-mask)" />
                </g>
              </svg>
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_60px_rgba(244,12,63,0.3)]" />
            </div>

            <div className="flex items-baseline gap-1 font-unique text-5xl tracking-tight text-white md:text-7xl">
              <span className="tabular-nums">{String(p).padStart(2, "0")}</span>
              <span className="font-heading italic text-3xl text-primary md:text-4xl">%</span>
            </div>

            <p className="mt-4 font-robotomedium text-[11px] uppercase tracking-[0.24em] text-white/50">
              {TELEMETRY_STEPS[stepIndex]}
            </p>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex items-end justify-between text-xs text-white/45"
          >
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/30">Architecture</span>
              <span>Next.js · WebGL · Framer Motion · Lenis</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/30">Coordinates</span>
              <span>{SITE.coordinates}</span>
            </div>
          </motion.div>

          {/* Glowing bottom progress edge */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-crimson via-primary to-[#ff4d6d] shadow-[0_0_20px_#f40c3f]"
              style={{ width: `${p}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
