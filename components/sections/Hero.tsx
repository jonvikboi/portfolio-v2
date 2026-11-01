"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Terminal } from "lucide-react";
import { Magnetic, SplitLines, SpotlightCard } from "@/components/ui/Reveal";
import { EASE, EASE_IN_OUT, useLoaded, scrollToId } from "@/lib/motion";
import { SITE } from "@/lib/site";

function RoleTicker({ play, reduced }: { play: boolean; reduced: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!play || reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % SITE.roles.length), 2700);
    return () => clearInterval(id);
  }, [play, reduced]);
  return (
    <span className="relative inline-flex h-[1.35em] max-w-full min-w-0 overflow-hidden align-bottom text-primary">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.75, ease: EASE_IN_OUT }}
          className="block whitespace-nowrap font-medium"
        >
          {SITE.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const loaded = useLoaded();
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  const fadeIn = (d: number) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: reduced || loaded ? { opacity: 1, y: 0 } : undefined,
    transition: reduced ? { duration: 0 } : { duration: 1.05, ease: EASE, delay: d },
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-between px-5 pb-10 pt-28 md:px-10 md:pb-12 md:pt-32"
    >
      {/* Top Telemetry Status Row */}
      <motion.div
        {...fadeIn(0.2)}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 text-xs"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-burgundy/60 px-3.5 py-1.5 font-robotomedium text-[11px] uppercase tracking-[0.16em] text-white/90 shadow-[0_0_24px_rgba(244,12,63,0.18)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {SITE.available.join(" · ")}
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-robotomedium text-[11px] tracking-[0.12em] text-white/55 sm:inline-flex">
            <Terminal className="h-3 w-3 text-primary" />
            {SITE.coordinates}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="text-white/45">Role {"//"}</span>
          <RoleTicker play={loaded} reduced={reduced} />
        </div>
      </motion.div>

      {/* Main Centerpiece Grid */}
      <div className="my-auto grid grid-cols-12 items-center gap-8 py-10 lg:gap-10 lg:py-14">
        {/* Left: Monumental Display Headline + Manifesto + CTAs */}
        <motion.div
          style={{ y: reduced ? 0 : nameY, opacity: reduced ? 1 : fade }}
          className="col-span-12 lg:col-span-8"
        >
          <motion.div
            {...fadeIn(0.28)}
            className="mb-4 inline-flex items-center gap-2 font-robotomedium text-xs uppercase tracking-[0.22em] text-primary/90"
          >
            <span className="h-px w-8 bg-primary" />
            CREATIVE SOFTWARE ENGINEER &amp; FULL-STACK DEVELOPER
          </motion.div>

          <SplitLines
            as="h1"
            play={loaded}
            delay={0.12}
            stagger={0.09}
            className="font-medium leading-[0.88] tracking-[-0.045em] text-[clamp(3.3rem,11vw,8.8rem)]"
            lines={[
              <span key="l1" className="flex items-baseline gap-4">
                <span>Joshua</span>
                <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-robotomedium text-xs uppercase tracking-[0.2em] text-primary md:inline-block">
                  v2.6
                </span>
              </span>,
              <span key="l2">
                <span className="font-heading italic font-normal tracking-[-0.02em] text-primary text-glow">
                  Zachary
                </span>{" "}
                Jose
              </span>,
            ]}
          />

          <motion.p
            {...fadeIn(0.42)}
            className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl"
          >
            I architect high-performance{" "}
            <span className="text-white font-medium">full-stack applications</span>,{" "}
            <span className="text-white font-medium">applied AI systems</span>, and{" "}
            <span className="font-heading italic text-primary">
              immersive 3D &amp; WebGL experiences
            </span>{" "}
            that live right in the browser — blending surgical engineering with fluid motion.
          </motion.p>

          {/* Action CTA Row */}
          <motion.div
            {...fadeIn(0.54)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                data-cursor="Explore"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("projects");
                }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary via-secondary to-crimson px-7 py-4 text-sm font-medium text-white shadow-[0_0_35px_rgba(244,12,63,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(244,12,63,0.65)]"
              >
                <span>Selected Work</span>
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>

            <Magnetic>
              <Link
                href="/resume"
                data-cursor="Resume"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-primary/10"
              >
                <span>Interactive Resume</span>
                <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>

            <div className="flex items-center gap-2.5 pl-1">
              <Magnetic strength={0.35}>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GitHub"
                  aria-label="GitHub profile"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/75 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-primary/15 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic strength={0.35}>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LinkedIn"
                  aria-label="LinkedIn profile"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/75 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-primary/15 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Interactive 3D-Tilt Portrait Dossier Card */}
        <motion.div
          style={{ y: reduced ? 0 : imgY }}
          className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9"
        >
          <SpotlightCard tilt cursor="Hi!" className="p-3 sm:p-4">
            {/* Corner HUD Reticles */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-2.5 top-2.5 z-20 h-3 w-3 border-l-2 border-t-2 border-primary/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-2.5 top-2.5 z-20 h-3 w-3 border-r-2 border-t-2 border-primary/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-2.5 left-2.5 z-20 h-3 w-3 border-b-2 border-l-2 border-primary/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 h-3 w-3 border-b-2 border-r-2 border-primary/70"
            />

            <motion.div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10 bg-burgundy/40"
              initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={
                reduced || loaded
                  ? { clipPath: "inset(0% 0% 0% 0%)" }
                  : undefined
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 1.35, ease: EASE_IN_OUT, delay: 0.18 }
              }
            >
              <motion.div
                className="absolute inset-0"
                initial={reduced ? false : { scale: 1.35 }}
                animate={reduced || loaded ? { scale: 1 } : undefined}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 1.8, ease: EASE, delay: 0.18 }
                }
              >
                <Image
                  src="/headshot.jpg"
                  alt="Portrait of Joshua Zachary Jose"
                  fill
                  priority
                  sizes="(min-width:1024px) 28vw, (min-width:640px) 60vw, 90vw"
                  className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </motion.div>

              {/* Atmospheric Crimson Duotone & Bottom Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0002] via-burgundy/25 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,12,63,0.22),transparent_60%)]" />

              {/* Top HUD Tag inside portrait */}
              <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between text-[10px] font-robotomedium uppercase tracking-[0.18em]">
                <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-white/80 backdrop-blur-md">
                  ID {"//"} JZJ-01
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/20 px-2.5 py-1 text-primary backdrop-blur-md">
                  INDIA · IST
                </span>
              </div>

              {/* Bottom Dossier Overlay inside portrait */}
              <div className="absolute inset-x-3.5 bottom-3.5 rounded-xl border border-white/10 bg-[#0a0002]/80 p-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white">
                      {SITE.name}
                    </p>
                    <p className="mt-0.5 font-robotomedium text-[10px] uppercase tracking-[0.14em] text-primary">
                      Full-Stack · WebGL · AI
                    </p>
                  </div>
                  {/* Animated equalizer bars */}
                  <div className="flex items-end gap-1 h-4" aria-hidden>
                    <span className="w-1 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="w-1 h-4 rounded-full bg-primary/80 animate-pulse [animation-delay:150ms]" />
                    <span className="w-1 h-2 rounded-full bg-primary/60 animate-pulse [animation-delay:300ms]" />
                    <span className="w-1 h-3.5 rounded-full bg-primary animate-pulse [animation-delay:450ms]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Bottom Telemetry & Metrics Strip */}
      <motion.div
        {...fadeIn(0.68)}
        className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-12 md:items-center md:gap-4"
      >
        {/* Scroll Indicator */}
        <div className="col-span-2 flex items-center gap-3.5 text-xs uppercase tracking-[0.18em] text-white/55 md:col-span-4">
          <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-primary/40 bg-burgundy/30 p-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-primary"
              animate={reduced ? { y: 0 } : { y: [0, 12, 0] }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 1.8, repeat: Infinity, ease: EASE_IN_OUT }
              }
            />
          </span>
          <div>
            <span className="block font-robotomedium text-white/80">
              Scroll to explore
            </span>
            <span className="text-[10px] text-white/40">
              SMOOTH LENIS ENGINE ACTIVE
            </span>
          </div>
        </div>

        {/* 4 Metric Pills */}
        <div className="col-span-2 grid grid-cols-2 gap-3 sm:grid-cols-4 md:col-span-8">
          {SITE.stats.map((st) => (
            <div
              key={st.label}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 backdrop-blur-sm transition-colors hover:border-primary/35 hover:bg-primary/[0.04]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-unique text-xl text-white md:text-2xl">
                  {st.value}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
              </div>
              <p className="mt-1 text-xs font-medium text-white/80">
                {st.label}
              </p>
              <p className="text-[11px] text-white/40">{st.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
