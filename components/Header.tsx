"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState, MouseEvent } from "react";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { EASE, useLoaded, scrollToId } from "@/lib/motion";
import { SITE } from "@/lib/site";
import CopyEmail from "@/components/ui/CopyEmail";
import LocalTime from "@/components/ui/LocalTime";

const NAV_ITEMS = [
  { id: "hero", label: "Index" },
  { id: "projects", label: "Work" },
  { id: "about", label: "Craft & Stack" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

function Item({
  children,
  i,
  show,
  reduced,
  className = "",
}: {
  children: ReactNode;
  i: number;
  show: boolean;
  reduced: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={reduced ? false : { y: "115%", opacity: 0 }}
        animate={show ? { y: "0%", opacity: 1 } : undefined}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.95, ease: EASE, delay: 0.2 + i * 0.06 }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Header() {
  const loaded = useLoaded();
  const pathname = usePathname();
  const reduced = useReducedMotion() ?? false;
  const [ambient, setAmbient] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() =>
      setAmbient(localStorage.getItem("ambient") !== "off")
    );
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
      if (pathname !== "/") return;

      const offset = window.innerHeight * 0.38;
      let current = "hero";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const toggle = () => {
    const next = !ambient;
    setAmbient(next);
    localStorage.setItem("ambient", next ? "on" : "off");
    window.dispatchEvent(new CustomEvent("ambient", { detail: next }));
  };

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      scrollToId(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      {/* Top scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-crimson via-primary to-[#ff4d6d] shadow-[0_0_16px_#f40c3f]"
      />

      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-b from-background/95 via-background/70 to-transparent pb-6 pt-3 md:pt-4"
            : "bg-gradient-to-b from-background/85 via-background/35 to-transparent pb-8 pt-4 md:pt-6"
        } px-4 text-[13px] md:px-10`}
      >
        <div className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          {/* Brand Monogram & Name */}
          <Item i={0} show={loaded} reduced={reduced}>
            <a
              href="#hero"
              onClick={go("hero")}
              data-cursor="Home"
              className="group flex items-center gap-3 rounded-full border border-white/10 bg-[#120004]/75 py-1.5 pl-2 pr-4 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(244,12,63,0.2)]"
            >
              <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-burgundy/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/jzj.png"
                  alt=""
                  className="h-5 w-5 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <div className="flex flex-col">
                <span className="font-medium leading-none tracking-tight text-white">
                  {SITE.name}
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/50">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Available · 2026
                </span>
              </div>
            </a>
          </Item>

          {/* Center Floating Glassmorphic Pill Nav (Desktop) */}
          <Item
            i={1}
            show={loaded}
            reduced={reduced}
            className="hidden lg:block"
          >
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-1 rounded-full border border-white/10 bg-[#120004]/75 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === "/" && activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="header-active-nav"
                        className="absolute inset-0 -z-10 rounded-full border border-primary/45 bg-gradient-to-r from-primary/30 via-crimson/40 to-burgundy/60 shadow-[0_0_20px_rgba(244,12,63,0.3)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}
              <span className="mx-1 h-4 w-px bg-white/10" aria-hidden />
              <Link
                href="/resume"
                className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  pathname === "/resume"
                    ? "bg-primary/25 text-primary"
                    : "text-white/70 hover:text-primary"
                }`}
              >
                Resume
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </nav>
          </Item>

          {/* Right Telemetry & Controls */}
          <div className="flex items-center gap-2.5">
            <Item
              i={2}
              show={loaded}
              reduced={reduced}
              className="hidden xl:block"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#120004]/70 px-3.5 py-2 text-xs text-white/65 backdrop-blur-md">
                <span className="text-white/35">IST</span>
                <LocalTime />
              </div>
            </Item>

            <Item
              i={3}
              show={loaded}
              reduced={reduced}
              className="hidden sm:block"
            >
              <div className="rounded-full border border-primary/30 bg-burgundy/40 px-4 py-2 text-xs backdrop-blur-md transition-colors hover:border-primary/60">
                <CopyEmail email={SITE.email} label="Copy Email" />
              </div>
            </Item>

            <Item i={4} show={loaded} reduced={reduced}>
              <button
                type="button"
                onClick={toggle}
                data-cursor={ambient ? "Mute FX" : "Enable FX"}
                aria-label="Toggle ambient WebGL shader background"
                aria-pressed={ambient}
                className={`group flex items-center gap-2 rounded-full border px-3 py-2 text-xs backdrop-blur-md transition-all duration-300 ${
                  ambient
                    ? "border-primary/50 bg-primary/15 text-white shadow-[0_0_20px_rgba(244,12,63,0.2)]"
                    : "border-white/15 bg-[#120004]/75 text-white/50 hover:border-white/35 hover:text-white"
                }`}
              >
                <Sparkles
                  className={`h-3.5 w-3.5 transition-transform duration-500 ${
                    ambient
                      ? "rotate-0 text-primary"
                      : "-rotate-45 text-white/40"
                  }`}
                />
                <span className="hidden font-robotomedium text-[10px] uppercase tracking-[0.14em] md:inline">
                  {ambient ? "Shader On" : "Shader Off"}
                </span>
              </button>
            </Item>

            {/* Mobile Menu Button */}
            <Item i={5} show={loaded} reduced={reduced} className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#120004]/80 text-white backdrop-blur-md transition-colors hover:border-primary"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4 text-primary" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </Item>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="pointer-events-auto mt-3 rounded-2xl border border-primary/30 bg-[#0f0003]/95 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl lg:hidden"
            >
              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className="flex items-center justify-between border-b border-white/5 pb-2.5 text-lg font-medium text-white/85 transition-colors hover:text-primary"
                  >
                    <span>{item.label}</span>
                    <span className="font-robotomedium text-xs text-primary/70">
                      0{idx + 1}
                    </span>
                  </a>
                ))}
                <Link
                  href="/resume"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-white/5 pb-2.5 text-lg font-medium text-primary"
                >
                  <span>Resume PDF</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </nav>
              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <LocalTime />
                <CopyEmail email={SITE.email} label={SITE.email} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
