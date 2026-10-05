"use client";

import HoverIndex, { IndexItem } from "@/components/ui/HoverIndex";
import { SectionHead, SplitLines } from "@/components/ui/Reveal";

/** Generated cover used until real screenshots are added (set `image` to replace). */
function Cover({ title, hue }: { title: string; hue: string }) {
  return (
    <div className="relative flex h-full w-full items-end overflow-hidden p-5" style={{ background: `radial-gradient(120% 90% at 20% 10%, ${hue}, #140004 70%)` }}>
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      <span className="relative text-4xl font-medium tracking-[-0.04em]">{title}</span>
    </div>
  );
}

const projects: IndexItem[] = [
  {
    title: "Ecipheryx",
    meta: ["Deepfake detection", "Python", "TensorFlow", "FastAPI"],
    year: "2025",
    href: "https://github.com/jonvikboi/ecipheryx",
    external: true,
    fallback: <Cover title="Ecipheryx" hue="#f40c3f" />,
  },
  {
    title: "Recipel",
    meta: ["Recipe discovery", "Next.js", "Zustand", "Framer Motion"],
    year: "2025",
    href: "https://github.com/jonvikboi/recipel",
    external: true,
    fallback: <Cover title="Recipel" hue="#ff6b3d" />,
  },
  {
    title: "Portfolio v2",
    meta: ["This site", "Next.js", "WebGL", "Lenis"],
    year: "2026",
    href: "https://github.com/jonvikboi/portfolio-v2",
    external: true,
    fallback: <Cover title="Portfolio v2" hue="#6e0419" />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="01" label="Selected work" meta={`${projects.length} projects`} />
      <div className="mt-14 grid grid-cols-12 gap-5 md:mt-20">
        <SplitLines
          as="h2"
          className="col-span-12 text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:col-span-8 md:text-7xl"
          lines={[<>Things I&apos;ve</>, <>designed <span className="font-heading italic font-normal text-primary">&amp;</span> built</>]}
        />
      </div>
      <div className="mt-16 md:mt-24">
        <HoverIndex items={projects} columns={["Project", "Focus & stack", "Year"]} />
      </div>
    </section>
  );
}
