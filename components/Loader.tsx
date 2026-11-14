"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_IN_OUT } from "@/lib/motion";
import { LiquidGlassLogo } from "@/components/liquid-glass-logo";

/**
 * Opening animation powered by the ReactDrops LiquidGlassLogo component.
 * Plays the sphere-to-tile liquid glass entrance and finishes on the original
 * `/icons/jzj.png` logo on a black background before revealing the portfolio.
 */
export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const finish = () => {
      setDone(true);
      html.classList.add("loaded");
      window.dispatchEvent(new Event("app:loaded"));
    };

    if (html.classList.contains("loaded")) {
      const frame = window.requestAnimationFrame(finish);
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // logoFinishTime in liquid-glass-logo-renderer is 1.8s; hold briefly on the finished logo before exiting.
    const durationMs = reduced ? 600 : 2400;
    const timer = window.setTimeout(finish, durationMs);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black"
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.95, ease: EASE_IN_OUT }}
        >
          <LiquidGlassLogo
            logo="/icons/jzj.png"
            ending="logo"
            logoSize={380}
            logoScale={0.88}
            logoColor={"original"}
            style={{ height: 680 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
