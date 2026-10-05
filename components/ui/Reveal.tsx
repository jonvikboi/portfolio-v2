"use client";

import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { ElementType, ReactNode, useRef } from "react";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

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
  const show = play && inView;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className="block origin-top-left will-change-transform"
            initial={{ y: "110%", rotate: 3 }}
            animate={show ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Single-line masked slide-up for small labels. */
export function Mask({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={VIEW}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FadeUp({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

/** Hairline that draws itself + "(01)  Label  meta" row. */
export function SectionHead({ index, label, meta }: { index: string; label: string; meta?: string }) {
  return (
    <div>
      <motion.div
        className="h-px w-full origin-left bg-white/15"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.4, ease: EASE_IN_OUT }}
      />
      <div className="mt-4 grid grid-cols-12 gap-5 text-sm">
        <Mask className="col-span-3 md:col-span-2 text-white/40">({index})</Mask>
        <Mask className="col-span-6 md:col-span-7" delay={0.05}>{label}</Mask>
        {meta && <Mask className="col-span-3 text-right text-white/40" delay={0.1}>{meta}</Mask>}
      </div>
    </div>
  );
}
