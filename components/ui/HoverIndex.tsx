"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef, useState, MouseEvent } from "react";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

export type IndexItem = {
  title: string;
  meta: string[];
  year: string;
  href: string;
  external?: boolean;
  image?: string;
  /** Rendered in the preview when there is no image. */
  fallback?: ReactNode;
  cursor?: string;
};

/**
 * Index-style list. Rows draw in on scroll; hovering a row dims its siblings and shows a
 * floating preview that trails the cursor and slides vertically between items.
 */
export default function HoverIndex({ items, columns }: { items: IndexItem[]; columns: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

  const move = (e: MouseEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div ref={wrap} className="relative" onMouseMove={move} onMouseLeave={() => setActive(null)}>
      {/* Column labels */}
      <div className="hidden grid-cols-12 gap-5 pb-4 text-xs uppercase tracking-[0.12em] text-white/35 md:grid">
        <span className="col-span-1">No.</span>
        <span className="col-span-5">{columns[0]}</span>
        <span className="col-span-4">{columns[1]}</span>
        <span className="col-span-2 text-right">{columns[2]}</span>
      </div>

      <ul>
        {items.map((it, i) => {
          const dim = active !== null && active !== i;
          return (
            <li key={it.title} className="relative">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-white/15"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.3, ease: EASE_IN_OUT, delay: i * 0.08 }}
              />
              <Link
                href={it.href}
                {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-cursor={it.cursor ?? "View"}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group grid grid-cols-12 items-baseline gap-x-5 gap-y-1 py-6 transition-opacity duration-500 md:py-8 ${dim ? "opacity-30" : "opacity-100"}`}
              >
                <motion.span
                  className="col-span-2 text-sm tabular-nums text-white/40 md:col-span-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <span className="col-span-10 overflow-hidden md:col-span-5">
                  <motion.span
                    className="block text-3xl font-medium tracking-[-0.03em] md:text-5xl"
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.08 }}
                  >
                    <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-4">
                      {it.title}
                    </span>
                    <span className="ml-3 inline-block -translate-x-2 align-middle text-xl text-primary opacity-0 transition-all duration-500 group-hover:translate-x-4 group-hover:opacity-100 md:text-3xl">
                      ↗
                    </span>
                  </motion.span>
                </span>
                <span className="col-span-10 col-start-3 text-sm text-white/55 md:col-span-4 md:col-start-auto">
                  {it.meta.join(", ")}
                </span>
                <span className="hidden text-right text-sm tabular-nums text-white/55 md:col-span-2 md:block">{it.year}</span>
              </Link>
            </li>
          );
        })}
        <motion.li
          aria-hidden
          className="h-px origin-left bg-white/15"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: EASE_IN_OUT, delay: items.length * 0.08 }}
        />
      </ul>

      {/* Floating preview (desktop only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              className="-translate-x-1/2 -translate-y-1/2 h-[240px] w-[340px] overflow-hidden rounded-sm bg-burgundy shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              initial={{ scale: 0.4, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 6 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <motion.div
                className="flex flex-col"
                animate={{ y: `${-(active ?? 0) * 240}px` }}
                transition={{ duration: 0.7, ease: EASE_IN_OUT }}
              >
                {items.map((it) => (
                  <div key={it.title} className="relative h-[240px] w-[340px] shrink-0">
                    {it.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      it.fallback
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
