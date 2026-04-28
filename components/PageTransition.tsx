"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect, useRef } from "react";

const columns = 5;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [splashFinished, setSplashFinished] = useState(false);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("splashComplete")) {
      setSplashFinished(true);
      isFirstLoad.current = false;
      return;
    }

    const handleSplash = () => {
      setSplashFinished(true);
      setTimeout(() => {
        isFirstLoad.current = false;
      }, 1000);
    };

    window.addEventListener("splashComplete", handleSplash);
    return () => window.removeEventListener("splashComplete", handleSplash);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {splashFinished && (
        <motion.div 
          key={pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          className="min-h-screen w-full flex flex-col relative"
        >
          {/* Staggered stack overlay */}
          <div className="fixed inset-0 pointer-events-none z-[100] flex">
            {[...Array(columns)].map((_, i) => {
              const stackColors = ["bg-primary", "bg-secondary", "bg-crimson", "bg-burgundy", "bg-background"];
              return (
                <motion.div
                  key={i}
                  variants={{
                    initial: { top: isFirstLoad.current ? "100%" : 0, height: isFirstLoad.current ? 0 : "100%" },
                    enter: { 
                      top: "100%", height: "100%",
                      transition: { duration: 0.6, delay: isFirstLoad.current ? 0 : 0.05 * i, ease: [0.22, 1, 0.36, 1] }
                    },
                    exit: { 
                      top: 0, height: "100%",
                      transition: { duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }
                    }
                  }}
                  className={`w-full relative border-r border-primary/20 shadow-2xl ${stackColors[i]}`}
                />
              );
            })}
          </div>
          
          {/* Content */}
          <motion.div
            custom={pathname}
            variants={{
              initial: { opacity: 0, y: 40 },
              enter: { 
                opacity: 1, y: 0, 
                transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                transitionEnd: { transform: "none", filter: "none" }
              },
              exit: (currentPath: string) => ({ 
                opacity: 0, 
                y: currentPath === "/resume" ? 0 : -40, 
                transition: { 
                  duration: currentPath === "/resume" ? 0.8 : 0.4, 
                  ease: [0.22, 1, 0.36, 1] 
                } 
              })
            }}
            className="flex-grow w-full"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
