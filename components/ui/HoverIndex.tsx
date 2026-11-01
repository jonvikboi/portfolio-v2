"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  AnimatePresence,
} from "framer-motion";
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
export default function HoverIndex({
  items,
  columns,
}: {
  items: IndexItem[];
  columns: string[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion() ?? false;
  const wrap = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 22, mass: 0.55 });
  const sy = useSpring(y, { stiffness: 170, damping: 22, mass: 0.55 });

  const move = (e: MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;

    const halfWidth = 185;
    const halfHeight = 130;
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), Math.max(min, max));
    const minX = Math.max(halfWidth, -r.left + halfWidth + 16);
    const maxX = Math.min(
      r.width - halfWidth,
      window.innerWidth - r.left - halfWidth - 16
    );
    const minY = Math.max(halfHeight, -r.top + halfHeight + 16);
    const maxY = Math.min(
      r.height - halfHeight,
      window.innerHeight - r.top - halfHeight - 16
    );
    x.set(clamp(e.clientX - r.left, minX, maxX));
    y.set(clamp(e.clientY - r.top, minY, maxY));
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseMove={move}
      onMouseLeave={() => setActive(null)}
    >
      {/* Column labels */}
      <div className="hidden grid-cols-12 gap-5 pb-4 font-robotomedium text-[11px] uppercase tracking-[0.18em] text-white/45 md:grid">
        <span className="col-span-1">No.</span>
        <span className="col-span-5">{columns[0]}</span>
        <span className="col-span-4">{columns[1]}</span>
        <span className="col-span-2 text-right">{columns[2]}</span>
      </div>

      <ul>
        {items.map((it, i) => {
          const isHovered = active === i;
          const dim = active !== null && active !== i;
          return (
            <li key={it.title} className="relative">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-primary/40 via-white/15 to-white/5"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 1.25, ease: EASE_IN_OUT, delay: i * 0.08 }
                }
              />
              <Link
                href={it.href}
                {...(it.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                data-cursor={it.cursor ?? "View"}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`group relative grid grid-cols-12 items-baseline gap-x-5 gap-y-2 rounded-xl px-3 py-7 transition-all duration-500 focus-visible:z-10 md:px-4 md:py-9 ${
                  dim ? "opacity-30" : "opacity-100"
                } ${isHovered ? "bg-gradient-to-r from-primary/[0.08] via-burgundy/20 to-transparent" : ""}`}
              >
                <motion.span
                  className="col-span-2 font-robotomedium text-xs tabular-nums text-primary/80 md:col-span-1"
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={
                    reduced ? { duration: 0 } : { duration: 1, delay: 0.2 + i * 0.08 }
                  }
                >
                  /{String(i + 1).padStart(2, "0")}
                </motion.span>
                <span className="col-span-10 overflow-hidden md:col-span-5">
                  <motion.span
                    className="block pr-14 text-3xl font-medium tracking-[-0.03em] md:pr-0 md:text-5xl"
                    initial={reduced ? false : { y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.08 }
                    }
                  >
                    <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-4 group-focus-visible:translate-x-4">
                      {it.title}
                    </span>
                    <span className="ml-3 inline-block -translate-x-2 align-middle text-xl text-primary opacity-0 transition-all duration-500 group-hover:translate-x-4 group-hover:opacity-100 group-focus-visible:translate-x-4 group-focus-visible:opacity-100 md:text-3xl">
                      ↗
                    </span>
                  </motion.span>
                </span>
                <span className="col-span-10 col-start-3 flex flex-wrap gap-1.5 pr-14 text-xs text-white/65 md:col-span-4 md:col-start-auto md:pr-0">
                  {it.meta.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 transition-colors group-hover:border-primary/30 group-hover:text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="absolute right-3 top-8 text-right font-robotomedium text-xs tabular-nums text-white/55 md:static md:col-span-2 md:block">
                  {it.year}
                </span>
              </Link>
            </li>
          );
        })}
        <motion.li
          aria-hidden
          className="h-px origin-left bg-gradient-to-r from-primary/40 via-white/15 to-white/5"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 1.3, ease: EASE_IN_OUT, delay: items.length * 0.08 }
          }
        />
      </ul>

      {/* Floating preview (desktop only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              className="-translate-x-1/2 -translate-y-1/2 h-[250px] w-[370px] overflow-hidden rounded-xl border border-primary/45 bg-[#120004] shadow-[0_30px_90px_-15px_rgba(244,12,63,0.35)]"
              initial={{ scale: 0.45, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.45, opacity: 0, rotate: 4 }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.5, ease: EASE }
              }
            >
              <motion.div
                className="flex flex-col"
                animate={{ y: `${-(active ?? 0) * 250}px` }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.65, ease: EASE_IN_OUT }
                }
              >
                {items.map((it) => (
                  <div
                    key={it.title}
                    className="relative h-[250px] w-[370px] shrink-0 overflow-hidden"
                  >
                    {it.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={it.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
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
