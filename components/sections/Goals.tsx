"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target } from "lucide-react";

export default function Goals() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="inline-flex items-center justify-center p-4 bg-crimson/20 rounded-full text-primary mb-6 backdrop-blur-md shadow-lg">
          <Target size={32} />
        </div>
        <h2 className="text-3xl font-bold font-unique mb-6">Current Goals & Ambitions</h2>
        <p className="text-xl text-gray-300 leading-relaxed bg-black/40 p-8 rounded-3xl border border-crimson/20 backdrop-blur-md shadow-xl shadow-crimson/5">
          My immediate focus is on mastering 3D web experiences and deepening my knowledge in distributed systems. 
          I am actively looking for opportunities to build cutting-edge user interfaces that blend high performance with stunning visual aesthetics, 
          eventually aiming to lead a creative engineering team.
        </p>
      </div>
    </section>
  );
}
