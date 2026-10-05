"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CopyEmail from "@/components/ui/CopyEmail";
import LocalTime from "@/components/ui/LocalTime";
import { FadeUp, Mask, SectionHead, SplitLines } from "@/components/ui/Reveal";
import { scrollToId } from "@/lib/motion";
import { SITE } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub", href: SITE.github },
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Resume", href: "/resume" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <footer id="contact" ref={ref} className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden px-5 pt-28 md:px-10 md:pt-40">
      <SectionHead index="04" label="Contact" meta={SITE.available.join(" — ")} />

      <div className="mt-16 md:mt-24">
        <SplitLines
          as="h2"
          className="text-[13vw] font-medium leading-[0.9] tracking-[-0.05em] md:text-[8.5vw]"
          lines={[<>Let&apos;s build</>, <>something <span className="font-heading italic font-normal text-primary">great</span></>]}
        />
        <FadeUp delay={0.2} className="mt-10 text-2xl tracking-[-0.02em] md:text-4xl">
          <CopyEmail email={SITE.email} />
        </FadeUp>
      </div>

      <div className="mt-24 grid grid-cols-12 gap-5 text-sm md:mt-auto md:pt-24">
        <div className="col-span-6 md:col-span-3">
          <Mask className="mb-3 text-white/40">Socials</Mask>
          <ul className="space-y-1">
            {SOCIALS.map((s, i) => (
              <li key={s.label}>
                <Mask delay={0.05 * i}>
                  <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="link">
                    {s.label}
                  </a>
                </Mask>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 md:col-span-3">
          <Mask className="mb-3 text-white/40">Local time</Mask>
          <Mask delay={0.05}><LocalTime /></Mask>
        </div>
        <div className="col-span-6 md:col-span-3">
          <Mask className="mb-3 text-white/40">Version</Mask>
          <Mask delay={0.05}>©{new Date().getFullYear()} Edition</Mask>
        </div>
        <div className="col-span-6 text-right md:col-span-3">
          <Mask className="mb-3 text-white/40">&nbsp;</Mask>
          <Mask delay={0.05}>
            <button type="button" onClick={() => scrollToId("hero")} className="link">
              Back to top ↑
            </button>
          </Mask>
        </div>
      </div>

      {/* Oversized wordmark rising from the bottom edge */}
      <div aria-hidden className="mt-10 overflow-hidden">
        <motion.p
          style={{ y: markY }}
          className="select-none whitespace-nowrap text-center text-[21vw] font-medium leading-[0.78] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(244,12,63,0.55)]"
        >
          Joshua Jose
        </motion.p>
      </div>
    </footer>
  );
}
