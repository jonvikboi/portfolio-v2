"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ElementType, MouseEvent, ReactNode, useRef, useState } from "react";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

const VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Each line slides up from behind a mask. `play` lets a parent gate it (e.g. until the loader finishes). */
export function SplitLines({
  lines,
  className = "",
  as: Tag = "div",
  play = true,
  delay = 0,
  stagger = 0.08,
}: {
  lines: ReactNode[];
  className?: string;
  as?: ElementType;
  play?: boolean;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, VIEW);
  const reduced = useReducedMotion() ?? false;
  const show = reduced || (play && inView);
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block origin-top-left will-change-transform"
            initial={reduced ? false : { y: "110%", rotate: 2.5 }}
            animate={show ? { y: "0%", rotate: 0 } : undefined}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 1.15, ease: EASE, delay: delay + i * stagger }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Single-line masked slide-up for small labels. */
export function Mask({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={reduced ? false : { y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={VIEW}
        transition={reduced ? { duration: 0 } : { duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={reduced ? { duration: 0 } : { duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Word({
  progress,
  range,
  children,
  reduced,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [4, 0]);
  const highlight =
    children.includes("details") ||
    children.includes("motion") ||
    children.includes("3D") ||
    children.includes("alive.") ||
    children.includes("engineering");

  return (
    <motion.span
      style={{ opacity: reduced ? 1 : opacity, y: reduced ? 0 : y }}
      className={`mr-[0.26em] inline-block ${
        highlight ? "font-heading italic font-normal text-primary" : ""
      }`}
    >
      {children}
    </motion.span>
  );
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrollWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, start + 1 / words.length]}
            reduced={reduced}
          >
            {w}
          </Word>
        );
      })}
    </p>
  );
}

/** Architectural section header with animated crimson rule, index pill, label, and meta tag. */
export function SectionHead({
  index,
  label,
  meta,
}: {
  index: string;
  label: string;
  meta?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="relative">
      <div className="relative flex items-center">
        <span
          aria-hidden
          className="mr-3 h-2 w-2 rotate-45 bg-primary shadow-[0_0_12px_#f40c3f]"
        />
        <motion.div
          className="h-px flex-1 origin-left bg-gradient-to-r from-primary/60 via-white/20 to-white/5"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEW}
          transition={
            reduced ? { duration: 0 } : { duration: 1.35, ease: EASE_IN_OUT }
          }
        />
      </div>
      <div className="mt-5 grid grid-cols-12 items-center gap-4 text-xs uppercase tracking-[0.18em]">
        <Mask className="col-span-4 md:col-span-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-burgundy/50 px-3 py-1 font-robotomedium text-[11px] text-primary shadow-[0_0_20px_rgba(244,12,63,0.15)]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {index}
          </span>
        </Mask>
        <Mask
          className="col-span-5 font-robotomedium text-white/80 md:col-span-7"
          delay={0.05}
        >
          {label}
        </Mask>
        {meta && (
          <Mask
            className="col-span-3 text-right font-robotomedium text-white/45"
            delay={0.1}
          >
            {meta}
          </Mask>
        )}
      </div>
    </div>
  );
}

/** Interactive glassmorphic card with cursor-tracking crimson spotlight and optional 3D tilt. */
export function SpotlightCard({
  children,
  className = "",
  tilt = false,
  cursor,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  cursor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 24 });
  const sry = useSpring(ry, { stiffness: 220, damping: 24 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    setPos({ x: localX, y: localY, opacity: 1 });

    if (tilt && !reduced) {
      const pctX = (localX / rect.width - 0.5) * 2;
      const pctY = (localY / rect.height - 0.5) * 2;
      rx.set(-pctY * 5);
      ry.set(pctX * 5);
    }
  };

  const handleLeave = () => {
    setPos((p) => ({ ...p, opacity: 0 }));
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      data-cursor={cursor}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        tilt && !reduced
          ? {
              rotateX: srx,
              rotateY: sry,
              transformPerspective: 1100,
            }
          : undefined
      }
      className={`glass-panel glass-panel-hover group relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Radial cursor spotlight overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-500"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, rgba(244, 12, 63, 0.16), rgba(110, 4, 25, 0.05) 45%, transparent 80%)`,
        }}
      />
      {/* Border glow highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(244, 12, 63, 0.35), transparent 70%)`,
          maskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/** Magnetic pull wrapper for buttons and interactive badges. */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.3 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
