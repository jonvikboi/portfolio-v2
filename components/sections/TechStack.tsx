"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const technologies = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Node.js", "PostgreSQL", "MongoDB", "GraphQL", "Python"
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
      <div className="container mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl font-bold font-unique text-white">Tech Stack</h2>
      </div>
      
      {/* Marquee effect */}
      <div className="flex space-x-8 overflow-hidden w-full relative">
        <motion.div
          className="flex space-x-8 whitespace-nowrap py-4"
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {/* Double the array for seamless loop */}
          {[...technologies, ...technologies, ...technologies].map((tech, i) => (
            <div 
              key={i} 
              className="px-6 py-3 bg-crimson/20 border border-crimson/50 rounded-full text-lg font-medium text-gray-200 hover:text-primary hover:border-primary transition-colors cursor-default backdrop-blur-md shadow-lg"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
