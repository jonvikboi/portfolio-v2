"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Ecipheryx",
    description: "A deepfake detection product utilizing advanced machine learning models to verify media authenticity in real-time.",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    github: "https://github.com/jonvikboi/ecipheryx", // Replace with your actual github repo link
    live: "https://your-live-link.com",
    image: "/ecipheryx.jpg" // Place ecipheryx.jpg in public/
  },
  {
    title: "Recipel",
    description: "A front-end heavy web application for interactive recipe discovery with complex state management and animations.",
    tech: ["Next.js", "Zustand", "Framer Motion", "Tailwind"],
    github: "https://github.com/jonvikboi/recipel", // Replace with your actual github repo link
    live: "https://your-live-link.com",
    image: "/recipel.jpg" // Place recipel.jpg in public/
  }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold font-unique mb-16 text-center">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <div 
              key={i} 
              ref={(el: any) => cardsRef.current[i] = el}
              className="group bg-black/60 rounded-3xl overflow-hidden border border-crimson/30 hover:border-primary transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl shadow-2xl shadow-crimson/10"
            >
              <div className="relative h-64 w-full bg-crimson/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-burgundy/20">
                  <span className="font-unique text-2xl opacity-30">{project.title} Preview</span>
                </div>
                {/* 
                  When ready, replace above with:
                  <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-xs font-medium px-3 py-1 bg-crimson/20 text-secondary rounded-full backdrop-blur-md">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Code
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
