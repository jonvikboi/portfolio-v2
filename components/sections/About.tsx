"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Sparkles,
  Compass,
  Terminal,
  Workflow,
  Milestone,
} from "lucide-react";
import {
  FadeUp,
  Mask,
  ScrollWords,
  SectionHead,
  SpotlightCard,
} from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

type TechCategory = "all" | "frontend" | "backend" | "systems";

type StackItem = {
  name: string;
  icon: string;
  category: Exclude<TechCategory, "all">;
  role: string;
};

const STACK: StackItem[] = [
  { name: "TypeScript", icon: "/icons/ts.png", category: "frontend", role: "Type-safe architecture" },
  { name: "React", icon: "/icons/react.png", category: "frontend", role: "Interactive UI systems" },
  { name: "Next.js", icon: "/icons/next.png", category: "frontend", role: "Full-stack React framework" },
  { name: "Tailwind", icon: "/icons/tailwind.png", category: "frontend", role: "Design tokens & styling" },
  { name: "JavaScript", icon: "/icons/js.png", category: "frontend", role: "DOM, WebGL & runtime" },
  { name: "Python", icon: "/icons/python.png", category: "backend", role: "AI, ML & FastAPI backends" },
  { name: "Java", icon: "/icons/java.png", category: "backend", role: "Object-oriented systems" },
  { name: "C++", icon: "/icons/c++.png", category: "systems", role: "High-performance computing" },
  { name: "C", icon: "/icons/c.png", category: "systems", role: "Low-level memory & OS" },
  { name: "Shell", icon: "/icons/shell.png", category: "systems", role: "Automation & DevOps" },
  { name: "HTML", icon: "/icons/html.png", category: "frontend", role: "Semantic web structure" },
  { name: "CSS", icon: "/icons/css.png", category: "frontend", role: "Shaders, grid & keyframes" },
];

const CAPABILITIES = [
  {
    index: "01",
    title: "Full-Stack Architecture",
    subtitle: "Scalable Web & API Systems",
    description:
      "Designing resilient end-to-end applications with clean data flow, fast server-rendered routes, and responsive glassmorphic interfaces.",
    items: ["Full-stack web apps", "APIs & backends", "Performance tuning", "Responsive UI"],
    icon: Code2,
  },
  {
    index: "02",
    title: "Interaction & Shaders",
    subtitle: "60fps Motion & WebGL Craft",
    description:
      "Choreographing custom GLSL fragment shaders, spring-physics cursors, and scroll-bound reveals that make digital products feel tactile.",
    items: ["Motion design", "WebGL & shaders", "3D for the web", "Micro-interactions"],
    icon: Sparkles,
  },
  {
    index: "03",
    title: "Now Exploring",
    subtitle: "AI Systems, 3D & Distributed Tech",
    description:
      "Pushing deeper into neural inference pipelines, Blender 3D workflows, and distributed systems to bridge creative direction with deep tech.",
    items: ["Distributed systems", "Blender & rendering", "ML-powered products", "Creative engineering"],
    icon: Compass,
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "System Design & Architecture",
    summary: "Defining data models, API contracts, and visual grid hierarchies before writing a single line of component code.",
    deliverables: ["Type-safe schemas", "Component topology", "REST / async pipeline specs"],
  },
  {
    step: "02",
    title: "Full-Stack & AI Implementation",
    summary: "Building deterministic client state (Zustand/React 19) paired with fast Next.js server routes or Python/FastAPI inference backends.",
    deliverables: ["Next.js App Router", "FastAPI & TensorFlow", "Clean state management"],
  },
  {
    step: "03",
    title: "Motion & Shader Choreography",
    summary: "Layering custom OGL/GLSL shaders, Lenis inertial scroll, and spring-physics micro-interactions that respond to user intent.",
    deliverables: ["Custom GLSL shaders", "Spring cursor physics", "Scroll-linked reveals"],
  },
  {
    step: "04",
    title: "Performance & Accessibility QA",
    summary: "Profiling frame budgets, optimizing asset delivery, and ensuring full keyboard navigation and reduced-motion parity.",
    deliverables: ["60fps frame budget", "Reduced-motion support", "Semantic accessibility"],
  },
];

const TIMELINE = [
  {
    year: "2023",
    title: "Systems & Algorithmic Foundations",
    detail: "Deepened core computer science fundamentals in C, C++, Java, and shell scripting.",
  },
  {
    year: "2024",
    title: "Full-Stack Web & Modern React Ecosystem",
    detail: "Transitioned into TypeScript, React, Next.js, and Tailwind CSS for end-to-end web applications.",
  },
  {
    year: "2025",
    title: "Applied AI (Ecipheryx), Recipel & Credentials",
    detail: "Built deepfake detection pipelines with TensorFlow/FastAPI, shipped Recipel, and earned 4 technical certifications.",
  },
  {
    year: "2026",
    title: "WebGL Shaders, 3D Web & Creative Engineering",
    detail: "Combining GLSL shaders, 3D web graphics, and distributed backend engineering — available for internships & freelance.",
  },
];

const FILTER_TABS: { id: TechCategory; label: string }[] = [
  { id: "all", label: "All Stack (12)" },
  { id: "frontend", label: "Frontend & Motion" },
  { id: "backend", label: "Backend & AI" },
  { id: "systems", label: "Systems & Core" },
];

export default function About() {
  const [filter, setFilter] = useState<TechCategory>("all");
  const [activeStep, setActiveStep] = useState(0);

  const filteredStack =
    filter === "all" ? STACK : STACK.filter((item) => item.category === filter);

  return (
    <section
      id="about"
      className="relative z-10 mx-auto w-full max-w-400 px-5 py-28 md:px-10 md:py-40"
    >
      <SectionHead index="02" label="Craft & Architecture" meta="Philosophy & Stack" />

      {/* Scroll-Illuminated Manifesto */}
      <div className="mt-16 grid grid-cols-12 gap-6 md:mt-24">
        <div className="col-span-12 lg:col-span-3">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-burgundy/40 px-3.5 py-1.5 font-robotomedium text-[11px] uppercase tracking-[0.18em] text-primary">
              <Cpu className="h-3.5 w-3.5" />
              Engineering Manifesto
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              My immediate focus is mastering 3D web experiences and going deeper into distributed systems — eventually leading a creative engineering team.
            </p>
          </FadeUp>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <ScrollWords
            className="text-3xl font-medium leading-[1.14] tracking-[-0.03em] sm:text-4xl md:text-6xl"
            text="I'm a developer who cares about the details — the easing of a transition, the weight of a headline, the milliseconds of a load. I blend solid engineering with motion and 3D to build things that feel alive."
          />
        </div>
      </div>

      {/* Core Architecture Pillars (3 Interactive Spotlight Bento Cards) */}
      <div className="mt-20 grid grid-cols-1 gap-6 md:mt-28 lg:grid-cols-3">
        {CAPABILITIES.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <FadeUp key={cap.title} delay={i * 0.08}>
              <SpotlightCard className="flex h-full flex-col justify-between p-7 sm:p-8">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="font-robotomedium text-xs uppercase tracking-[0.2em] text-primary">
                      PILLAR {"//"} {cap.index}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/35 bg-primary/15 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                    {cap.title}
                  </h3>
                  <p className="mt-1 font-heading italic text-base text-primary/90">
                    {cap.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    {cap.description}
                  </p>
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-5 text-xs sm:text-sm">
                  {cap.items.map((it, j) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 text-white/85"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <Mask delay={0.08 + i * 0.05 + j * 0.04}>{it}</Mask>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </FadeUp>
          );
        })}
      </div>

      {/* Interactive Engineering Workflow + Progression Timeline Bento */}
      <div className="mt-12 grid grid-cols-12 gap-6">
        {/* Left: Interactive 4-Step Engineering Workflow */}
        <FadeUp className="col-span-12 lg:col-span-7">
          <SpotlightCard className="h-full p-7 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="inline-flex items-center gap-2 font-robotomedium text-xs uppercase tracking-[0.2em] text-primary">
                <Workflow className="h-4 w-4" />
                Engineering Methodology
              </span>
              <span className="font-robotomedium text-xs text-white/45">
                0{activeStep + 1} / 0{PROCESS_STEPS.length}
              </span>
            </div>

            {/* Step Selector Pills */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {PROCESS_STEPS.map((st, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={st.step}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-primary/60 bg-primary/15 text-white shadow-[0_0_25px_rgba(244,12,63,0.2)]"
                        : "border-white/10 bg-white/2 text-white/55 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <span className="block font-robotomedium text-[10px] text-primary">
                      STEP {st.step}
                    </span>
                    <span className="mt-1 block truncate text-xs font-medium">
                      {st.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-6 rounded-xl border border-white/10 bg-black/40 p-5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-xl font-medium text-white sm:text-2xl">
                    {PROCESS_STEPS[activeStep].title}
                  </h4>
                  <span className="font-unique text-2xl text-primary/70">
                    /{PROCESS_STEPS[activeStep].step}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                  {PROCESS_STEPS[activeStep].summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {PROCESS_STEPS[activeStep].deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-primary/30 bg-burgundy/50 px-3 py-1 font-robotomedium text-[11px] text-white/90"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </FadeUp>

        {/* Right: Progression Timeline (2023 - 2026) */}
        <FadeUp delay={0.1} className="col-span-12 lg:col-span-5">
          <SpotlightCard className="h-full p-7 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="inline-flex items-center gap-2 font-robotomedium text-xs uppercase tracking-[0.2em] text-primary">
                <Milestone className="h-4 w-4" />
                Progression Log
              </span>
              <span className="font-robotomedium text-xs text-white/45">
                2023 — 2026
              </span>
            </div>

            <ol className="relative mt-6 space-y-5 border-l border-primary/35 pl-5">
              {TIMELINE.map((item, idx) => (
                <li key={item.year} className="relative group/tl">
                  <span
                    className={`absolute -left-6.5 top-1.5 h-3 w-3 rounded-full border transition-all ${
                      idx === TIMELINE.length - 1
                        ? "border-primary bg-primary shadow-[0_0_12px_#f40c3f]"
                        : "border-primary/60 bg-[#0a0002] group-hover/tl:bg-primary"
                    }`}
                  />
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-robotomedium text-xs text-primary">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-medium text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </SpotlightCard>
        </FadeUp>
      </div>

      {/* Interactive Filterable Tech Arsenal */}
      <FadeUp className="mt-24 md:mt-36">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 font-robotomedium text-xs uppercase tracking-[0.2em] text-primary">
              <Terminal className="h-3.5 w-3.5" />
              Technical Arsenal
            </span>
            <h3 className="mt-2 text-3xl font-medium tracking-[-0.03em] text-white md:text-4xl">
              Languages, frameworks{" "}
              <span className="font-heading italic font-normal text-primary">
                &amp;
              </span>{" "}
              tools I reach for
            </h3>
          </div>

          {/* Filter Pills */}
          <div
            role="group"
            aria-label="Filter technologies by category"
            className="flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-[#120004]/80 p-1.5 backdrop-blur-md"
          >
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`relative rounded-xl px-3.5 py-2 text-xs font-medium transition-colors ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="stack-filter-pill"
                      className="absolute inset-0 -z-10 rounded-xl border border-primary/45 bg-linear-to-r from-primary/35 to-crimson/50 shadow-[0_0_20px_rgba(244,12,63,0.3)]"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Tech Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredStack.map((item) => (
              <motion.div
                layout
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <SpotlightCard
                  cursor={item.name}
                  className="p-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/50 p-2 transition-colors group-hover:border-primary/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="h-7 w-7 object-contain opacity-80 grayscale-30 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/3 px-2 py-0.5 font-robotomedium text-[9px] uppercase tracking-[0.14em] text-white/45 group-hover:border-primary/30 group-hover:text-primary">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-medium text-white">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/45">
                    {item.role}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </FadeUp>

      {/* Infinite Kinetic Marquee Ribbon */}
      <FadeUp className="mt-20 md:mt-28">
        <div
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0003]/70 py-6 backdrop-blur-md mask-[linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
          aria-label="Technologies and tools marquee"
        >
          <div className="animate-marquee flex w-max gap-14 group-hover:[animation-play-state:paused]">
            {[...STACK, ...STACK].map((s, i) => (
              <span
                key={i}
                aria-hidden={i >= STACK.length}
                className="flex items-center gap-3.5 whitespace-nowrap text-2xl tracking-[-0.02em] text-white/60 transition-colors duration-300 hover:text-white md:text-3xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt=""
                  className="h-7 w-7 object-contain opacity-70 grayscale-25 transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-8 md:w-8"
                />
                <span>{s.name}</span>
                <span className="ml-4 text-sm text-primary/50">✦</span>
              </span>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
