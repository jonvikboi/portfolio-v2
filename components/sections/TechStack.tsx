"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LogoLoop from "@/components/ui/logo-loop";

const webLogos = [
  { src: "/icons/html.png", alt: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { src: "/icons/css.png", alt: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { src: "/icons/js.png", alt: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { src: "/icons/ts.png", alt: "TypeScript", href: "https://www.typescriptlang.org/" },
  { src: "/icons/tailwind.png", alt: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { src: "/icons/react.png", alt: "React", href: "https://react.dev/" },
  { src: "/icons/next.png", alt: "Next.js", href: "https://nextjs.org/" },
];

const progLogos = [
  { src: "/icons/python.png", alt: "Python", href: "https://python.org" },
  { src: "/icons/c.png", alt: "C", href: "https://devdocs.io/c/" },
  { src: "/icons/c++.png", alt: "C++", href: "https://devdocs.io/cpp/" },
  { src: "/icons/java.png", alt: "Java", href: "https://docs.oracle.com/en/java/" },
  { src: "/icons/shell.png", alt: "Shell", href: "https://www.shellscript.sh/" },
];

export default function TechStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-20 relative z-10 bg-black/40 backdrop-blur-lg w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl mx-auto rounded-[2rem] md:rounded-[3rem] border-2 border-primary/50 shadow-[0_0_30px_rgba(244,12,63,0.15)] my-20">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-bold font-unique text-white">Tech Stack</h2>
      </div>
      
      <div className="flex flex-col gap-16 w-full max-w-5xl mx-auto">
        <div>
          <h3 className="text-xl font-mono text-primary text-center mb-8 tracking-widest uppercase text-sm">Web Technologies</h3>
          <div style={{ height: '80px', position: 'relative', overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)'}}>
            <LogoLoop
              logos={webLogos}
              speed={50}
              direction="left"
              logoHeight={60}
              gap={100}
              hoverSpeed={10}
              scaleOnHover
              ariaLabel="Web Technologies"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono text-primary text-center mb-8 tracking-widest uppercase text-sm">Programming Languages</h3>
          <div style={{ height: '80px', position: 'relative', overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)'}}>
            <LogoLoop
              logos={progLogos}
              speed={50}
              direction="right"
              logoHeight={60}
              gap={100}
              hoverSpeed={10}
              scaleOnHover
              ariaLabel="Programming Languages"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
