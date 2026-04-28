"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LogoLoop from "@/components/ui/logo-loop";

const webLogos = [
  { src: "/icons/html.png", alt: "HTML" },
  { src: "/icons/css.png", alt: "CSS" },
  { src: "/icons/js.png", alt: "JavaScript" },
  { src: "/icons/ts.png", alt: "TypeScript" },
  { src: "/icons/tailwind.png", alt: "Tailwind CSS" },
  { src: "/icons/react.png", alt: "React" },
  { src: "/icons/next.png", alt: "Next.js" },
];

const progLogos = [
  { src: "/icons/python.png", alt: "Python" },
  { src: "/icons/c.png", alt: "C" },
  { src: "/icons/c++.png", alt: "C++" },
  { src: "/icons/java.png", alt: "Java" },
  { src: "/icons/shell.png", alt: "Shell" },
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
    <section ref={containerRef} className="py-20 relative overflow-hidden z-10 bg-black/40 backdrop-blur-lg">
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
