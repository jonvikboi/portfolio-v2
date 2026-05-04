"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, Terminal as TerminalIcon } from "lucide-react";
import { useState, useEffect } from "react";

const TerminalAnimation = () => {
  const [lines, setLines] = useState<{ text: string, color?: string, cursor?: boolean }[]>([]);

  useEffect(() => {
    const sequence = [
      { text: "jzj@arch ~ % npx portfolio-v2", delay: 800, color: "text-white" },
      { text: "Installing portfolio-v2@latest...", delay: 1800, color: "text-gray-400" },
      { text: "✔  Installation complete!", delay: 2400, color: "text-green-400" },
      { text: "Launching interactive experience...", delay: 3000, color: "text-cyan-400" },
      { text: "jzj@arch ~ % ", delay: 3800, color: "text-white", cursor: true }
    ];

    let timeouts: NodeJS.Timeout[] = [];

    sequence.forEach((item) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, item]);
      }, item.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 font-mono text-xs md:text-sm">
      {lines.map((line, i) => (
        <div key={i} className={line.color}>
          {line.text}
          {line.cursor && <span className="animate-pulse ml-1 text-gray-400">█</span>}
        </div>
      ))}
    </div>
  );
};

export default function Hero() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = ["Full-Stack Dev", "Aspiring Software Dev", "Beginner 3D Artist"];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, text.length - 1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 40);
    } else {
      if (text.length < currentRole.length) {
        timeout = setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-10 overflow-hidden">
      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 w-full max-w-6xl mx-auto">

          {/* Left Column - Headshot & Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 relative flex flex-col items-center justify-center min-h-[500px] w-full mt-12 md:mt-0"
            style={{ perspective: "1000px" }}
          >
            {/* Background Glow */}
            <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] z-0"></div>

            {/* Headshot - Rounded Square, 3D tilted */}
            <motion.div
              whileHover={{ rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.05 }}
              initial={{ rotateX: 10, rotateY: -15, rotateZ: 3 }}
              animate={{ rotateX: 10, rotateY: -15, rotateZ: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-[3rem] overflow-hidden border-2 border-primary/40 bg-burgundy/80 flex items-center justify-center shadow-[15px_15px_50px_rgba(244,12,63,0.2)] z-10 relative backdrop-blur-sm cursor-pointer md:mr-[220px] mb-24 md:mb-32"
            >
              <Image 
                src="/headshot.jpg" 
                alt="Joshua Zachary Jose" 
                fill 
                priority
                className="object-cover transition-transform duration-500 hover:scale-110" 
              />
            </motion.div>

            {/* MacOS Terminal Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full max-w-[340px] md:max-w-[420px] h-[220px] md:h-[240px] bg-[#0a0a0c]/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden z-20 absolute bottom-4 md:-bottom-8 right-0 md:-right-8 group"
            >
              {/* Terminal Header */}
              <div className="h-10 bg-[#1a1a1e] flex items-center px-4 gap-2 border-b border-white/5 relative">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-400 text-xs font-semibold">
                  <TerminalIcon size={12} />
                  <span>joshua — bash — 80x24</span>
                </div>
              </div>
              {/* Terminal Body */}
              <div className="p-4 md:p-5 flex-1 overflow-y-auto">
                <TerminalAnimation />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Text Content */}
          <div className="flex-1 text-left flex flex-col items-start space-y-8 z-30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-burgundy/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">Available for Opportunities</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold font-unique text-white mb-2">
                Hi, I'm <br />
                <span 
                  className="bg-gradient-to-r from-primary via-red-300 to-primary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(244,12,63,0.6)]"
                  style={{ backgroundSize: '200% auto', animation: 'gradient-breath 4s ease-in-out infinite' }}
                >
                  Joshua Zachary Jose
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-primary font-mono font-medium flex items-center gap-2 mt-4">
                <span>{">"}</span>
                <span>
                  {text}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] max-w-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
              <p className="text-lg text-white font-productsans leading-relaxed relative z-10">
                I build seamless, full-stack applications with modern web technologies,
                driven by a deep curiosity for software engineering. Recently, I've also
                been exploring the world of 3D modeling and rendering to bring immersive,
                interactive experiences to the browser.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2"
            >
              <Link href="#projects" className="group w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-primary rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(244,12,63,0.4)] hover:shadow-[0_0_30px_rgba(244,12,63,0.6)]">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary via-secondary to-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link href="/resume" className="group w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-burgundy/40 backdrop-blur-md border border-crimson/50 rounded-full hover:bg-crimson/30 transition-all hover:scale-105 active:scale-95">
                <span className="relative flex items-center gap-2">
                  View Resume <FileText size={18} className="group-hover:text-primary transition-colors" />
                </span>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
