"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

/** Route transition wrapper with a crimson-edged curtain on navigation. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion() ?? false;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduced ? false : "initial"}
        animate={reduced ? "reduced" : "enter"}
        exit={reduced ? "reduced" : "exit"}
        className="relative flex min-h-screen w-full flex-col"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] bg-[#140004]"
          variants={{
            initial: { y: "0%" },
            enter: {
              y: "-100%",
              transition: { duration: 0.85, ease: EASE_IN_OUT, delay: 0.04 },
            },
            exit: {
              y: "0%",
              transition: { duration: 0.65, ease: EASE_IN_OUT },
            },
            reduced: { y: "-100%" },
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-crimson via-primary to-[#ff4d6d] shadow-[0_0_20px_#f40c3f]" />
        </motion.div>

        <motion.div
          className="w-full flex-grow"
          variants={{
            initial: { opacity: 0, y: 20 },
            enter: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 0.25, ease: EASE },
              transitionEnd: { transform: "none" },
            },
            exit: {
              opacity: 0,
              y: -20,
              transition: { duration: 0.45, ease: EASE_IN_OUT },
            },
            reduced: { opacity: 1, y: 0 },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
