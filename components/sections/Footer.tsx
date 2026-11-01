"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import CopyEmail from "@/components/ui/CopyEmail";
import LocalTime from "@/components/ui/LocalTime";
import {
  FadeUp,
  Magnetic,
  Mask,
  SectionHead,
  SplitLines,
  SpotlightCard,
} from "@/components/ui/Reveal";
import { scrollToId } from "@/lib/motion";
import { SITE } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub", href: SITE.github, external: true },
  { label: "LinkedIn", href: SITE.linkedin, external: true },
  { label: "Interactive Resume", href: "/resume", external: false },
];

export default function Footer() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], ["38%", "0%"]);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-between overflow-hidden px-5 pt-28 md:px-10 md:pt-40"
    >
      <SectionHead
        index="04"
        label="Contact & Colophon"
        meta={SITE.available.join(" — ")}
      />

      {/* Grand CTA Spotlight Panel */}
      <div className="my-14 md:my-20">
        <SpotlightCard className="p-7 sm:p-10 md:p-14">
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 font-robotomedium text-[11px] uppercase tracking-[0.18em] text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Open for Internships, Freelance &amp; Collaborations
              </div>

              <SplitLines
                as="h2"
                className="text-[11vw] font-medium leading-[0.9] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                lines={[
                  <>Let&apos;s build</>,
                  <>
                    something{" "}
                    <span className="font-heading italic font-normal text-primary text-glow">
                      extraordinary
                    </span>
                  </>,
                ]}
              />

              <FadeUp
                delay={0.18}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <div className="rounded-2xl border border-primary/35 bg-black/50 px-5 py-3.5 text-lg tracking-tight text-white backdrop-blur-md sm:text-2xl">
                  <CopyEmail email={SITE.email} />
                </div>

                <Magnetic>
                  <a
                    href={`mailto:${SITE.email}`}
                    data-cursor="Write"
                    className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary via-secondary to-crimson px-6 py-4 text-xs font-medium uppercase tracking-[0.16em] text-white shadow-[0_0_35px_rgba(244,12,63,0.45)] transition-all hover:shadow-[0_0_50px_rgba(244,12,63,0.7)]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Compose Email</span>
                  </a>
                </Magnetic>
              </FadeUp>
            </div>

            <div className="col-span-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-sm leading-relaxed text-white/65">
                Whether you&apos;re looking for a full-stack intern, a creative engineer for a high-impact web launch, or a collaborator on an AI/3D experiment — my inbox is always open.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIALS.map((s) =>
                  s.external ? (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/85 transition-colors hover:border-primary/50 hover:bg-primary/15 hover:text-white"
                    >
                      <span>{s.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                    </a>
                  ) : (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-primary/25"
                    >
                      <span>{s.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Colophon Metadata Row */}
      <div className="grid grid-cols-12 gap-6 border-t border-white/10 pt-8 text-sm">
        <div className="col-span-12 flex items-center gap-3 sm:col-span-6 md:col-span-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/jzj.png"
            alt=""
            className="h-7 w-7 rounded-full border border-primary/40 bg-burgundy/60 p-1 object-contain"
          />
          <div>
            <Mask className="font-medium text-white">{SITE.name}</Mask>
            <Mask delay={0.05} className="text-xs text-white/45">
              {SITE.role} · {SITE.location}
            </Mask>
          </div>
        </div>

        <div className="col-span-6 sm:col-span-3 md:col-span-3">
          <Mask className="mb-2 font-robotomedium text-[11px] uppercase tracking-[0.16em] text-white/45">
            Local Time
          </Mask>
          <Mask delay={0.05} className="text-white/85">
            <LocalTime />
          </Mask>
        </div>

        <div className="col-span-6 sm:col-span-3 md:col-span-3">
          <Mask className="mb-2 font-robotomedium text-[11px] uppercase tracking-[0.16em] text-white/45">
            Edition &amp; Stack
          </Mask>
          <Mask delay={0.05} className="text-white/85">
            ©{new Date().getFullYear()} · Next.js &amp; WebGL
          </Mask>
        </div>

        <div className="col-span-12 flex items-center justify-between sm:justify-end md:col-span-3">
          <Magnetic>
            <button
              type="button"
              data-cursor="Top"
              onClick={() => scrollToId("hero")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-primary/15 hover:text-white"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Oversized wordmark rising from the bottom edge */}
      <div aria-hidden className="mt-10 overflow-hidden pt-2">
        <motion.p
          style={{ y: reduced ? 0 : markY }}
          className="select-none whitespace-nowrap text-center text-[clamp(4.2rem,20vw,21rem)] font-medium leading-[0.78] tracking-[-0.06em] text-transparent transition-all duration-700 [-webkit-text-stroke:1px_rgba(244,12,63,0.6)] hover:[-webkit-text-stroke:1px_rgba(244,12,63,0.95)] hover:[text-shadow:0_0_80px_rgba(244,12,63,0.28)]"
        >
          Joshua Jose
        </motion.p>
      </div>
    </footer>
  );
}
