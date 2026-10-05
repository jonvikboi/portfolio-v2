"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

/** Single curtain: drops in on exit, lifts away on enter, with a crimson leading edge. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial="initial" animate="enter" exit="exit" className="relative flex min-h-screen w-full flex-col">
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] bg-[#140004]"
          variants={{
            initial: { y: "0%" },
            enter: { y: "-100%", transition: { duration: 0.9, ease: EASE_IN_OUT, delay: 0.05 } },
            exit: { y: "0%", transition: { duration: 0.7, ease: EASE_IN_OUT } },
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary" />
        </motion.div>

        <motion.div
          className="w-full flex-grow"
          variants={{
            initial: { opacity: 0, y: 24 },
            enter: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.35, ease: EASE },
              transitionEnd: { transform: "none" },
            },
            exit: { opacity: 0, y: -24, transition: { duration: 0.5, ease: EASE_IN_OUT } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
