"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "lucide-react";

const certifications = [
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2024" },
  { name: "Meta Front-End Developer", issuer: "Coursera / Meta", date: "2023" },
  { name: "UI/UX Design Specialization", issuer: "CalArts", date: "2023" }
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const listRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      listRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative z-10 bg-burgundy/30 backdrop-blur-md shadow-2xl">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold font-unique mb-12 text-center">Certifications</h2>
        
        <div className="space-y-4">
          {certifications.map((cert, i) => (
            <div 
              key={i}
              ref={(el: any) => listRef.current[i] = el}
              className="flex items-center justify-between p-6 bg-black/40 rounded-2xl border border-crimson/20 hover:border-secondary/50 transition-colors backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-crimson/30 rounded-full text-primary backdrop-blur-md">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{cert.name}</h3>
                  <p className="text-sm text-gray-400">{cert.issuer}</p>
                </div>
              </div>
              <div className="text-secondary font-mono">{cert.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
