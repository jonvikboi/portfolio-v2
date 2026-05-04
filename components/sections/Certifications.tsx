"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const certifications = [
  {
    id: "frontend-dev",
    name: "Frontend UI & UX Developer",
    issuer: "Larsen & Toubro EduTech",
    date: "2025",
    image: "/certs/cert1.png",
    pdf: "/certs/cert1.pdf"
  },
  {
    id: "computer-networks",
    name: "Network Fundamentals",
    issuer: "Infosys Springboard",
    date: "2025",
    image: "/certs/cert2.png",
    pdf: "/certs/cert2.pdf"
  },
  {
    id: "ai-principles",
    name: "Artificial Intelligence",
    issuer: "Udemy",
    date: "2025",
    image: "/certs/cert3.png",
    pdf: "/certs/cert3.pdf"
  },
  {
    id: "python-programming",
    name: "Python Programming",
    issuer: "Udemy",
    date: "2025",
    image: "/certs/cert4.png",
    pdf: "/certs/cert4.pdf"
  }
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
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
    <section id="certifications" ref={sectionRef} className="py-20 relative z-10 bg-burgundy/30 backdrop-blur-md shadow-2xl w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-6xl mx-auto rounded-[2rem] md:rounded-[3rem] border-2 border-primary/50 shadow-[0_0_30px_rgba(244,12,63,0.15)] my-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold font-unique mb-12 text-center">Certifications</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {certifications.map((cert, i) => (
            <div
              key={i}
              ref={(el: any) => cardsRef.current[i] = el}
              className="group flex flex-col bg-black/60 rounded-3xl overflow-hidden border border-crimson/20 hover:border-secondary/50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-md shadow-lg"
            >
              <div className="relative h-64 w-full bg-crimson/10 overflow-hidden">
                <img src={cert.image} alt={cert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{cert.name}</h3>
                <p className="text-gray-400 mb-6">{cert.issuer}</p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-crimson/20">
                  <span className="text-secondary font-mono text-sm px-3 py-1 bg-crimson/20 rounded-full">{cert.date}</span>
                  <Link href={`/certifications/${cert.id}`} className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                    <ExternalLink size={18} /> View PDF
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
