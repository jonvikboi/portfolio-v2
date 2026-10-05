"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_IN_OUT } from "@/lib/motion";
import { SITE } from "@/lib/site";

/** Intro loader: eased % counter + "moon phase" icon, then the panel wipes up to reveal the page. */
export default function Loader() {
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("loaded")) {
      setDone(true);
      return;
    }
    window.scrollTo(0, 0);

    let ready = false;
    let finished = false;
    let raf = 0;
    const start = performance.now();
    const pageLoad = new Promise<void>((r) =>
      document.readyState === "complete" ? r() : window.addEventListener("load", () => r(), { once: true })
    );
    Promise.race([Promise.all([pageLoad, document.fonts?.ready]), new Promise((r) => setTimeout(r, 4000))]).then(() => {
      ready = true;
    });

    const tick = (t: number) => {
      // Hold just short of 100% until fonts + assets are ready.
      const lin = Math.min((t - start) / 1600, ready ? 1 : 0.7);
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
      }, 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const hole = 1 - p / 100;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}
        >
          <motion.div
            className="flex flex-col items-center"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE_IN_OUT }}
          >
            <svg viewBox="0 0 100 100" className="mb-6 h-14 w-14" aria-hidden>
              <defs>
                <mask id="loader-mask">
                  <rect width="100" height="100" fill="#fff" />
                  <circle cx={50 + 34 * hole} cy={50 - 22 * hole} r={48 * hole} fill="#000" />
                </mask>
              </defs>
              <circle cx="50" cy="50" r="48" fill="#f40c3f" mask="url(#loader-mask)" />
            </svg>
            <span className="text-sm tabular-nums">{p}%</span>
          </motion.div>

          <div className="absolute inset-x-5 bottom-6 flex justify-between text-xs text-white/40 md:inset-x-10">
            <span>{SITE.name}</span>
            <span>Portfolio ©{new Date().getFullYear()}</span>
          </div>
          <div className="absolute bottom-0 left-0 h-px bg-primary" style={{ width: `${p}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
