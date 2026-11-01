"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Dual-layer precision cursor:
 * 1. Crisp core dot that tracks with high-stiffness spring.
 * 2. Fluid trailing ring that expands over interactive controls or turns into a
 *    glassmorphic crimson disc with a label over `[data-cursor="..."]` elements.
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Fast inner dot
  const dotX = useSpring(x, { stiffness: 1000, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 50, mass: 0.2 });

  // Fluid outer halo / badge
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  const reduced = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [state, setState] = useState<{ hover: boolean; label: string | null }>({
    hover: false,
    label: null,
  });

  const enabled = ready && !reduced;

  useEffect(() => {
    const canUseCustomCursor =
      window.matchMedia("(pointer: fine) and (hover: hover)").matches && !reduced;
    if (!canUseCustomCursor) {
      document.documentElement.classList.remove("custom-cursor");
      return;
    }
    const readyFrame = window.requestAnimationFrame(() => {
      document.documentElement.classList.add("custom-cursor");
      setReady(true);
    });

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, [role='button'], input, textarea, select");
      setState({
        label: labelled?.dataset.cursor ?? null,
        hover: !!(labelled || interactive),
      });
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mousedown", down, { passive: true });
    document.addEventListener("mouseup", up, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.cancelAnimationFrame(readyFrame);
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  const hasLabel = Boolean(state.label);
  const ringSize = hasLabel ? 88 : state.hover ? 46 : 28;

  return (
    <>
      {/* Outer spring ring / labelled disc */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-solid backdrop-blur-[4px]"
          animate={{
            width: ringSize,
            height: ringSize,
            scale: pressed ? 0.88 : 1,
            opacity: visible ? 1 : 0,
            backgroundColor: hasLabel
              ? "rgba(244, 12, 63, 0.9)"
              : state.hover
                ? "rgba(244, 12, 63, 0.12)"
                : "rgba(244, 12, 63, 0.03)",
            borderColor: hasLabel
              ? "rgba(255, 179, 193, 0.65)"
              : state.hover
                ? "rgba(244, 12, 63, 0.85)"
                : "rgba(244, 12, 63, 0.35)",
            boxShadow: hasLabel
              ? "0 0 32px rgba(244, 12, 63, 0.55)"
              : state.hover
                ? "0 0 20px rgba(244, 12, 63, 0.25)"
                : "0 0 0px rgba(244, 12, 63, 0)",
          }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
        >
          <AnimatePresence mode="wait">
            {state.label && (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.65 }}
                transition={{ duration: 0.2 }}
                className="px-2 text-center font-robotomedium text-[10px] font-medium uppercase tracking-[0.16em] text-white"
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Crisp inner center dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_#f40c3f]"
          animate={{
            width: hasLabel ? 0 : state.hover ? 6 : 7,
            height: hasLabel ? 0 : state.hover ? 6 : 7,
            opacity: visible && !hasLabel ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
