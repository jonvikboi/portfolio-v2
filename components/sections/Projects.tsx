"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Layers,
  Sparkles,
  LayoutGrid,
  List,
  Eye,
  X,
  CheckCircle2,
  GitBranch,
  Activity,
} from "lucide-react";
import HoverIndex, { IndexItem } from "@/components/ui/HoverIndex";
import { FadeUp, SectionHead, SplitLines, SpotlightCard } from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

/** Bespoke visual artwork for Ecipheryx (Deepfake Detection System) */
function EcipheryxVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[radial-gradient(120%_100%_at_15%_10%,#4a0212_0%,#0c0003_70%)] p-5">
      <div className="crimson-grid absolute inset-0 opacity-40" />
      {/* Top HUD */}
      <div className="relative z-10 flex items-center justify-between font-robotomedium text-[10px] uppercase tracking-[0.18em]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-primary">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
          NEURAL SCAN {"//"} ACTIVE
        </span>
        <span className="text-white/50">TENSORFLOW · FASTAPI</span>
      </div>

      {/* Center Biometric Mesh & Frequency Waves */}
      <div className="relative z-10 my-auto flex items-center justify-between gap-4 py-3">
        <svg viewBox="0 0 220 110" className="h-28 w-full overflow-visible">
          <defs>
            <linearGradient id="eciph-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6e0419" />
              <stop offset="50%" stopColor="#f40c3f" />
              <stop offset="100%" stopColor="#ff4d6d" />
            </linearGradient>
          </defs>
          <line x1="0" y1="25" x2="220" y2="25" stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
          <line x1="0" y1="55" x2="220" y2="55" stroke="rgba(244,12,63,0.25)" strokeDasharray="2 4" />
          <line x1="0" y1="85" x2="220" y2="85" stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
          <path
            d="M 0 55 Q 18 20, 36 55 T 72 55 Q 90 10, 108 55 T 144 55 Q 162 22, 180 55 T 220 55"
            fill="none"
            stroke="url(#eciph-line)"
            strokeWidth="2.5"
          />
          <path
            d="M 0 55 Q 18 85, 36 55 T 72 55 Q 90 95, 108 55 T 144 55 Q 162 82, 180 55 T 220 55"
            fill="none"
            stroke="rgba(244,12,63,0.35)"
            strokeWidth="1.2"
          />
          <circle cx="99" cy="32" r="4" fill="#f40c3f" />
          <circle cx="99" cy="32" r="10" fill="none" stroke="rgba(244,12,63,0.45)" />
          <circle cx="153" cy="38" r="3.5" fill="#ff4d6d" />
        </svg>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
        <div>
          <span className="block font-robotomedium text-[10px] uppercase tracking-[0.15em] text-white/45">
            Classifier Confidence
          </span>
          <span className="font-unique text-lg text-white">99.2% REAL-TIME</span>
        </div>
        <span className="rounded-md border border-primary/40 bg-burgundy/80 px-2.5 py-1 font-robotomedium text-[10px] text-primary">
          CNN + FRAME ANALYSIS
        </span>
      </div>
    </div>
  );
}

/** Bespoke visual artwork for Recipel (Recipe Discovery Platform) */
function RecipelVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[radial-gradient(120%_100%_at_80%_15%,#590918_0%,#0c0003_72%)] p-5">
      <div className="crimson-grid absolute inset-0 opacity-35" />
      <div className="relative z-10 flex items-center justify-between font-robotomedium text-[10px] uppercase tracking-[0.18em]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff6b3d]/45 bg-[#ff6b3d]/15 px-2.5 py-1 text-[#ff8c66]">
          CULINARY ENGINE {"//"} UI
        </span>
        <span className="text-white/50">NEXT.JS · ZUSTAND</span>
      </div>

      {/* Mock Interactive Recipe Cards */}
      <div className="relative z-10 my-auto grid grid-cols-2 gap-3 py-3">
        <div className="rounded-xl border border-white/12 bg-black/55 p-3 backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="h-2 w-12 rounded-full bg-primary/70" />
            <span className="font-robotomedium text-[9px] text-primary">★ 4.9</span>
          </div>
          <div className="h-2 w-24 rounded-full bg-white/80" />
          <div className="mt-1.5 h-1.5 w-16 rounded-full bg-white/35" />
          <div className="mt-3 flex gap-1.5">
            <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[9px] text-primary">
              15m
            </span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-white/70">
              High Protein
            </span>
          </div>
        </div>
        <div className="translate-y-2 rounded-xl border border-primary/30 bg-burgundy/40 p-3 backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="h-2 w-10 rounded-full bg-[#ff6b3d]/80" />
            <span className="font-robotomedium text-[9px] text-white/60">SYNCED</span>
          </div>
          <div className="h-2 w-20 rounded-full bg-white/85" />
          <div className="mt-1.5 h-1.5 w-14 rounded-full bg-white/40" />
          <div className="mt-3 flex gap-1.5">
            <span className="rounded bg-[#ff6b3d]/20 px-1.5 py-0.5 text-[9px] text-[#ff8c66]">
              Zustand Store
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
        <div>
          <span className="block font-robotomedium text-[10px] uppercase tracking-[0.15em] text-white/45">
            State &amp; Motion
          </span>
          <span className="font-unique text-lg text-white">INSTANT FILTERING</span>
        </div>
        <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-robotomedium text-[10px] text-white/80">
          FRAMER MOTION
        </span>
      </div>
    </div>
  );
}

/** Bespoke visual artwork for Portfolio v2 (WebGL & Motion System) */
function PortfolioVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#6e0419_0%,#090002_75%)] p-5">
      <div className="crimson-grid absolute inset-0 opacity-45" />
      <div className="relative z-10 flex items-center justify-between font-robotomedium text-[10px] uppercase tracking-[0.18em]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/45 bg-primary/20 px-2.5 py-1 text-white">
          GLSL RAYMARCH SHADER
        </span>
        <span className="text-primary">60 FPS LOCKED</span>
      </div>

      <div className="relative z-10 my-auto py-3">
        <svg viewBox="0 0 220 96" className="h-24 w-full overflow-visible">
          <defs>
            <linearGradient id="curve-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#6e0419" />
              <stop offset="50%" stopColor="#f40c3f" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <line x1="16" y1="84" x2="64" y2="12" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
          <line x1="204" y1="12" x2="100" y2="12" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
          <path
            d="M 16 84 C 64 12, 100 12, 204 12"
            fill="none"
            stroke="url(#curve-grad)"
            strokeWidth="3"
          />
          <circle cx="64" cy="12" r="4" fill="#f40c3f" />
          <circle cx="100" cy="12" r="4" fill="#ff4d6d" />
          <circle cx="16" cy="84" r="4" fill="#fff" />
          <circle cx="204" cy="12" r="4" fill="#fff" />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
        <div>
          <span className="block font-robotomedium text-[10px] uppercase tracking-[0.15em] text-white/45">
            Easing Signature
          </span>
          <span className="font-unique text-lg text-white">
            cubic-bezier(.22,1,.36,1)
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-4 w-4 rounded-full border border-white/20 bg-[#f40c3f]" />
          <span className="h-4 w-4 rounded-full border border-white/20 bg-[#6e0419]" />
          <span className="h-4 w-4 rounded-full border border-white/20 bg-[#0a0002]" />
        </div>
      </div>
    </div>
  );
}

type ProjectCaseStudy = IndexItem & {
  id: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  architecture: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  icon: typeof Cpu;
};

const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "01",
    title: "Ecipheryx",
    category: "Applied AI & Media Forensics",
    tagline: "Deepfake detection & neural authenticity verification pipeline",
    description:
      "An end-to-end deepfake forensics platform combining convolutional neural networks with a high-throughput FastAPI inference engine to detect synthetic facial manipulation and frame-level artifacts.",
    challenge:
      "Modern generative models leave subtle spatial and frequency-domain anomalies that standard image classifiers miss. Ecipheryx isolates facial regions, extracts multi-frame features, and serves low-latency authenticity scores over an async REST pipeline.",
    architecture: [
      "Frame Extraction & Face Crop",
      "Spectral + Spatial CNN TensorFlow Model",
      "Async FastAPI Inference Worker",
      "Diagnostic Confidence Telemetry UI",
    ],
    highlights: [
      "Frame-by-frame spatial & frequency artifact detection",
      "Low-latency asynchronous REST API built with FastAPI",
      "Real-time confidence scoring & visual diagnostic breakdown",
    ],
    metrics: [
      { label: "Domain", value: "AI Forensics" },
      { label: "Inference", value: "Async FastAPI" },
      { label: "Engine", value: "TensorFlow CNN" },
    ],
    meta: ["Deepfake detection", "Python", "TensorFlow", "FastAPI"],
    year: "2025",
    href: "https://github.com/jonvikboi/ecipheryx",
    external: true,
    icon: Cpu,
    fallback: <EcipheryxVisual />,
  },
  {
    id: "02",
    title: "Recipel",
    category: "Full-Stack Product & Interaction",
    tagline: "Motion-rich culinary discovery & reactive ingredient engine",
    description:
      "A modern culinary discovery web application engineered for speed and tactile delight—featuring instant multi-faceted filtering, persistent Zustand state orchestration, and choreographed Framer Motion transitions.",
    challenge:
      "Recipe platforms often suffer from cluttered layouts and sluggish page reloads when filtering by ingredients or macros. Recipel pairs a reactive Zustand store with layout-projected Framer Motion animations for zero-lag exploration.",
    architecture: [
      "Next.js App Router Views",
      "Zustand Reactive Filter & Bookmark Store",
      "Multi-Tag Query & Macro Engine",
      "Framer Motion Shared-Layout Choreography",
    ],
    highlights: [
      "Zero-lag search & multi-tag dietary filtering architecture",
      "Deterministic client state management powered by Zustand",
      "Fluid shared-layout card transitions & responsive glass UI",
    ],
    metrics: [
      { label: "State", value: "Zustand Store" },
      { label: "Motion", value: "Layout Projection" },
      { label: "UX", value: "Zero-Lag Filter" },
    ],
    meta: ["Recipe discovery", "Next.js", "Zustand", "Framer Motion"],
    year: "2025",
    href: "https://github.com/jonvikboi/recipel",
    external: true,
    icon: Layers,
    fallback: <RecipelVisual />,
  },
  {
    id: "03",
    title: "Portfolio v2",
    category: "Creative Engineering & WebGL",
    tagline: "Custom GLSL lightfall shaders, Lenis physics & editorial motion",
    description:
      "This bespoke digital flagship—combining a custom raymarched OGL/GLSL ambient shader with spring-driven cursor physics, kinetic typography, and a dark crimson architectural design system.",
    challenge:
      "Achieving a cinema-grade WebGL + motion experience without sacrificing accessibility, text legibility, or frame rate. Built with custom OGL shaders, damped pointer uniforms, and full reduced-motion support.",
    architecture: [
      "OGL Raymarched Fragment Shader",
      "Lenis Inertial Scroll Loop",
      "Framer Motion Spring & Scroll Transforms",
      "Crimson Obsidian Design Token System",
    ],
    highlights: [
      "Custom OGL fragment shader with real-time pointer luminescence",
      "Lenis inertial scroll coupled with Framer Motion scroll transforms",
      "Accessible reduced-motion fallbacks & 60fps rendering budget",
    ],
    metrics: [
      { label: "Shader", value: "Custom GLSL" },
      { label: "Frame Rate", value: "60fps Target" },
      { label: "Scroll", value: "Lenis Physics" },
    ],
    meta: ["This site", "Next.js", "WebGL / OGL", "Lenis"],
    year: "2026",
    href: "https://github.com/jonvikboi/portfolio-v2",
    external: true,
    icon: Sparkles,
    fallback: <PortfolioVisual />,
  },
];

export default function Projects() {
  const [view, setView] = useState<"showcase" | "index">("showcase");
  const [inspected, setInspected] = useState<ProjectCaseStudy | null>(null);

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto w-full max-w-400 px-5 py-28 md:px-10 md:py-40"
    >
      <SectionHead
        index="01"
        label="Selected Work"
        meta={`${PROJECTS.length} Flagship Systems`}
      />

      {/* Section Title + View Mode Switcher */}
      <div className="mt-14 flex flex-col justify-between gap-8 md:mt-20 lg:flex-row lg:items-end">
        <div>
          <SplitLines
            as="h2"
            className="text-5xl font-medium leading-[0.93] tracking-[-0.04em] md:text-7xl"
            lines={[
              <>Systems I&apos;ve</>,
              <>
                architected{" "}
                <span className="font-heading italic font-normal text-primary text-glow">
                  &amp;
                </span>{" "}
                shipped
              </>,
            ]}
          />
          <FadeUp
            delay={0.15}
            className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Every project is treated as an exercise in both systems engineering and sensory craft — click any project to inspect its architecture or explore the source on GitHub.
          </FadeUp>
        </div>

        {/* Interactive View Toggle */}
        <FadeUp delay={0.2}>
          <div
            role="group"
            aria-label="Project layout view mode"
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#120004]/80 p-1.5 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setView("showcase")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                view === "showcase"
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(244,12,63,0.45)]"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Showcase Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setView("index")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                view === "index"
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(244,12,63,0.45)]"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Interactive Index</span>
            </button>
          </div>
        </FadeUp>
      </div>

      {/* Main Content Area */}
      <div className="mt-16 md:mt-24">
        <AnimatePresence mode="wait">
          {view === "showcase" ? (
            <motion.div
              key="showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col gap-10 md:gap-14"
            >
              {PROJECTS.map((project, idx) => {
                const Icon = project.icon;
                const isEven = idx % 2 === 1;
                return (
                  <FadeUp key={project.id} delay={idx * 0.08}>
                    <SpotlightCard className="p-6 sm:p-8 md:p-10">
                      <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
                        {/* Visual Preview Column */}
                        <div
                          className={`col-span-12 lg:col-span-6 ${
                            isEven ? "lg:order-2" : ""
                          }`}
                        >
                          <div
                            onClick={() => setInspected(project)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setInspected(project);
                              }
                            }}
                            data-cursor="Inspect"
                            className="group/preview relative block h-67.5 w-full overflow-hidden rounded-xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.75)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.015] sm:h-80"
                          >
                            {project.fallback}
                            <div className="absolute right-3.5 bottom-3.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-[#0a0002]/90 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/preview:opacity-100">
                              <Eye className="h-3.5 w-3.5 text-primary" />
                              <span>Architecture Deep-Dive</span>
                            </div>
                          </div>
                        </div>

                        {/* Case Study Details Column */}
                        <div
                          className={`col-span-12 flex flex-col justify-between lg:col-span-6 ${
                            isEven ? "lg:order-1" : ""
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/40 bg-primary/15 text-primary">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="font-robotomedium text-xs uppercase tracking-[0.18em] text-primary">
                                {project.id} {"//"} {project.category}
                              </span>
                            </div>
                            <span className="rounded-full border border-white/10 bg-white/3 px-3 py-1 font-robotomedium text-xs text-white/60">
                              {project.year}
                            </span>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
                              {project.title}
                            </h3>
                            <p className="mt-2 font-heading italic text-lg text-primary/90 sm:text-xl">
                              {project.tagline}
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                              {project.description}
                            </p>
                          </div>

                          {/* Engineering Highlights */}
                          <ul className="mt-6 space-y-2 border-l-2 border-primary/40 pl-4 text-xs text-white/75 sm:text-sm">
                            {project.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Stack Pills & CTAs */}
                          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-2">
                            <div className="flex flex-wrap gap-2">
                              {project.meta.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-primary/25 bg-burgundy/45 px-3.5 py-1.5 font-robotomedium text-[11px] tracking-wide text-white/85"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5">
                              <button
                                type="button"
                                onClick={() => setInspected(project)}
                                data-cursor="Specs"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/4 px-4 py-2.5 text-xs font-medium text-white/85 transition-colors hover:border-primary/50 hover:text-white"
                              >
                                <Eye className="h-3.5 w-3.5 text-primary" />
                                <span>Inspect Specs</span>
                              </button>

                              <a
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="GitHub"
                                className="group/btn inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/15 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-primary hover:shadow-[0_0_30px_rgba(244,12,63,0.5)]"
                              >
                                <span>Repository</span>
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </FadeUp>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="index"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <HoverIndex
                items={PROJECTS}
                columns={["Project", "Focus & Stack", "Year"]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Case Study Architecture Modal */}
      <AnimatePresence>
        {inspected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspected(null)}
            className="fixed inset-0 z-9000 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-primary/40 bg-[#0d0003] p-6 shadow-[0_30px_100px_rgba(244,12,63,0.3)] sm:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="font-robotomedium text-xs uppercase tracking-[0.2em] text-primary">
                    CASE STUDY {"//"} {inspected.id} · {inspected.year}
                  </span>
                  <h3 className="mt-1 text-3xl font-medium text-white sm:text-4xl">
                    {inspected.title}
                  </h3>
                  <p className="mt-1 font-heading italic text-lg text-primary/90">
                    {inspected.tagline}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setInspected(null)}
                  aria-label="Close case study modal"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-primary hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Metrics Row */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {inspected.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/3 p-3.5"
                  >
                    <span className="block font-robotomedium text-[10px] uppercase tracking-[0.16em] text-white/45">
                      {m.label}
                    </span>
                    <span className="mt-1 block font-unique text-base text-white sm:text-lg">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Engineering Challenge */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-burgundy/25 p-5">
                <div className="flex items-center gap-2 font-robotomedium text-xs uppercase tracking-[0.16em] text-primary">
                  <Activity className="h-3.5 w-3.5" />
                  <span>Problem &amp; Engineering Approach</span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-white/80">
                  {inspected.challenge}
                </p>
              </div>

              {/* System Pipeline Flow */}
              <div className="mt-6">
                <div className="flex items-center gap-2 font-robotomedium text-xs uppercase tracking-[0.16em] text-white/60">
                  <GitBranch className="h-3.5 w-3.5 text-primary" />
                  <span>System Pipeline &amp; Architecture</span>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {inspected.architecture.map((step, i) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/2 px-4 py-3 text-xs text-white/85"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15 font-robotomedium text-[10px] text-primary">
                        0{i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mt-6">
                <span className="font-robotomedium text-xs uppercase tracking-[0.16em] text-white/60">
                  Key Capabilities
                </span>
                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  {inspected.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {inspected.meta.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/4 px-3 py-1 font-robotomedium text-[11px] text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={inspected.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-[0_0_25px_rgba(244,12,63,0.5)] transition-all hover:shadow-[0_0_40px_rgba(244,12,63,0.75)]"
                >
                  <span>View Source on GitHub</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
