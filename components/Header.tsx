"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState, MouseEvent } from "react";
import { EASE, useLoaded, scrollToId } from "@/lib/motion";
import { SITE } from "@/lib/site";
import CopyEmail from "@/components/ui/CopyEmail";
import LocalTime from "@/components/ui/LocalTime";

function Item({ children, i, show, className = "" }: { children: ReactNode; i: number; show: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "110%" }} animate={show ? { y: "0%" } : undefined} transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.07 }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function Header() {
  const loaded = useLoaded();
  const [ambient, setAmbient] = useState(true);

  useEffect(() => setAmbient(localStorage.getItem("ambient") !== "off"), []);

  const toggle = () => {
    const next = !ambient;
    setAmbient(next);
    localStorage.setItem("ambient", next ? "on" : "off");
    window.dispatchEvent(new CustomEvent("ambient", { detail: next }));
  };

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    if (document.getElementById(id)) scrollToId(id);
    else window.location.href = `/#${id}`;
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/90 via-background/40 to-transparent px-5 pb-12 pt-5 text-[13px] md:px-10 md:pt-7 md:text-sm">
      <div className="pointer-events-auto grid grid-cols-12 items-start gap-5">
        <Item i={0} show={loaded} className="col-span-5 md:col-span-3">
          <a href="#hero" onClick={go("hero")} className="link">
            {SITE.name}
          </a>
        </Item>

        <Item i={1} show={loaded} className="hidden md:col-span-3 md:block">
          <span className="text-white/40">Local time </span>
          <LocalTime />
        </Item>

        <Item i={2} show={loaded} className="hidden md:col-span-3 md:block">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Available for work
          </span>
        </Item>

        <div className="col-span-7 flex items-start justify-end gap-4 md:col-span-3">
          <Item i={3} show={loaded}>
            <nav aria-label="Main navigation" className="flex whitespace-nowrap">
              <a href="#projects" onClick={go("projects")} className="link">Work</a>
              <span className="text-white/40">,&nbsp;</span>
              <a href="#about" onClick={go("about")} className="link">Info</a>
              <span className="text-white/40">,&nbsp;</span>
              <CopyEmail email={SITE.email} label="Contact" />
            </nav>
          </Item>
          <Item i={4} show={loaded}>
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle ambient background"
              aria-pressed={ambient}
              className="grid h-[18px] w-[18px] place-items-center rounded-full border border-white/60 transition-colors hover:border-primary"
            >
              <span className={`h-2 w-2 rounded-full bg-white transition-transform duration-500 ${ambient ? "scale-100" : "scale-0"}`} />
            </button>
          </Item>
        </div>
      </div>
    </header>
  );
}
