"use client";

import { FadeUp, Mask, ScrollWords, SectionHead } from "@/components/ui/Reveal";

const STACK = [
  { name: "TypeScript", icon: "/icons/ts.png" },
  { name: "React", icon: "/icons/react.png" },
  { name: "Next.js", icon: "/icons/next.png" },
  { name: "Tailwind", icon: "/icons/tailwind.png" },
  { name: "JavaScript", icon: "/icons/js.png" },
  { name: "Python", icon: "/icons/python.png" },
  { name: "Java", icon: "/icons/java.png" },
  { name: "C++", icon: "/icons/c++.png" },
  { name: "C", icon: "/icons/c.png" },
  { name: "Shell", icon: "/icons/shell.png" },
  { name: "HTML", icon: "/icons/html.png" },
  { name: "CSS", icon: "/icons/css.png" },
];

const CAPABILITIES = [
  { title: "Development", items: ["Full-stack web apps", "APIs & backends", "Performance tuning", "Responsive UI"] },
  { title: "Interaction", items: ["Motion design", "WebGL & shaders", "3D for the web", "Micro-interactions"] },
  { title: "Now exploring", items: ["Distributed systems", "Blender & rendering", "ML-powered products", "Creative engineering"] },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="02" label="Info" meta="About me" />

      <div className="mt-16 grid grid-cols-12 gap-5 md:mt-24">
        <ScrollWords
          className="col-span-12 text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:col-span-10 md:text-6xl"
          text="I'm a developer who cares about the details — the easing of a transition, the weight of a headline, the milliseconds of a load. I blend solid engineering with motion and 3D to build things that feel alive."
        />
      </div>

      <div className="mt-24 grid grid-cols-12 gap-x-5 gap-y-12 md:mt-36">
        <FadeUp className="col-span-12 md:col-span-3">
          <p className="max-w-xs text-sm leading-relaxed text-white/55">
            My immediate focus is mastering 3D web experiences and going deeper into distributed systems —
            eventually leading a creative engineering team.
          </p>
        </FadeUp>
        {CAPABILITIES.map((c, i) => (
          <div key={c.title} className="col-span-6 md:col-span-3">
            <Mask className="mb-5 text-sm text-white/40" delay={i * 0.06}>{c.title}</Mask>
            <ul className="space-y-1.5 text-lg md:text-xl">
              {c.items.map((it, j) => (
                <li key={it}>
                  <Mask delay={0.1 + i * 0.06 + j * 0.05}>{it}</Mask>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Stack marquee */}
      <FadeUp className="mt-28 md:mt-40">
        <p className="mb-6 text-sm text-white/40">Tools I reach for</p>
        <div className="group relative overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-14 group-hover:[animation-play-state:paused]">
            {[...STACK, ...STACK].map((s, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap text-2xl tracking-[-0.02em] text-white/50 transition-colors duration-300 hover:text-white md:text-4xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" className="h-7 w-7 object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-9 md:w-9" />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
