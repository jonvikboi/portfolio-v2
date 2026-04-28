"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("splashComplete")) {
      // If already shown in this session, don't show again.
      // But we still need to make sure the app knows it's complete immediately.
      window.dispatchEvent(new Event("splashComplete"));
      return;
    }

    setIsVisible(true);
    let current = 0;
    const interval = setInterval(() => {
      // Fast fake loading
      current += Math.floor(Math.random() * 20) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          // Wait for the fade out to finish before signalling the page to load
          setTimeout(() => {
            sessionStorage.setItem("splashComplete", "true");
            window.dispatchEvent(new Event("splashComplete"));
          }, 800); 
        }, 500); // pause at 100%
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background pointer-events-none"
        >
          <motion.div
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-64 mb-8">
              <div className="h-1 w-full bg-crimson/30 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
            </div>
            <div className="text-5xl font-unique text-white font-bold tracking-widest">
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
