"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SplitLines } from "@/components/ui/Reveal";
import { EASE, EASE_IN_OUT, useLoaded, scrollToId } from "@/lib/motion";

const ROLES = ["Full-stack developer", "Aspiring software engineer", "Beginner 3D artist"];

function RoleTicker({ play }: { play: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, [play]);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          className="block whitespace-nowrap"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const loaded = useLoaded();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const fadeIn = (d: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: loaded ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, ease: EASE, delay: d },
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 pb-6 pt-28 md:px-10 md:pb-8 md:pt-36"
    >
      {/* Top row: portrait + intro */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div style={{ y: imgY }} className="col-span-5 md:col-span-3">
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={loaded ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 1.4, ease: EASE_IN_OUT, delay: 0.2 }}
            data-cursor="Hi!"
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.4 }}
              animate={loaded ? { scale: 1 } : undefined}
              transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
            >
              <Image src="/headshot.jpg" alt="Portrait of Joshua Zachary Jose" fill priority sizes="(min-width:768px) 25vw, 40vw" className="object-cover grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 to-transparent mix-blend-multiply" />
          </motion.div>
        </motion.div>

        <div className="col-span-7 flex flex-col justify-end md:col-span-4 md:col-start-7">
          <motion.p {...fadeIn(0.45)} className="max-w-sm text-base leading-snug text-white/80 md:text-lg">
            I build seamless, full-stack applications with modern web tech — and lately, immersive 3D
            experiences that live right in the browser.
          </motion.p>
          <motion.div {...fadeIn(0.55)} className="mt-6 flex gap-5 text-sm">
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToId("projects"); }} className="link">
              Selected work ↓
            </a>
            <Link href="/resume" className="link text-white/60 hover:text-white">
              Resume ↗
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Giant name */}
      <motion.div style={{ y: nameY, opacity: fade }} className="mt-16 md:mt-0">
        <SplitLines
          as="h1"
          play={loaded}
          delay={0.15}
          stagger={0.1}
          className="font-medium leading-[0.86] tracking-[-0.045em] text-[17vw] md:text-[13.5vw]"
          lines={[
            <>Joshua</>,
            <>
              <span className="font-heading italic font-normal tracking-[-0.02em] text-primary">Zachary</span> Jose
            </>,
          ]}
        />
      </motion.div>

      {/* Bottom meta row */}
      <motion.div {...fadeIn(0.8)} className="mt-8 grid grid-cols-12 gap-5 text-sm">
        <div className="col-span-6 md:col-span-3 flex items-center gap-3 text-white/50">
          <span className="relative block h-8 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-white"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: EASE_IN_OUT }}
            />
          </span>
          Scroll to explore
        </div>
        <div className="col-span-6 md:col-span-4 md:col-start-7 text-right md:text-left">
          <span className="text-white/40">Currently — </span>
          <RoleTicker play={loaded} />
        </div>
        <div className="hidden md:col-span-2 md:col-start-11 md:block text-right text-white/40">
          Based in India
        </div>
      </motion.div>
    </section>
  );
}
