"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PillNav from "./ui/PillNav";

export default function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar when scrolled down 150px
      if (window.scrollY > 150) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto"
        >
          {/* We wrap PillNav in a container to enforce the fixed layout properly */}
          <div className="relative w-max">
            <PillNav
              logo="/icons/jzj.png"
              logoAlt="JZJ Logo"
              items={[
                { label: 'Home', href: '/#hero' },
                { label: 'Projects', href: '/#projects' },
                { label: 'Certifications', href: '/#certifications' },
              ]}
              activeHref="/#hero"
              className="custom-nav shadow-[0_0_30px_rgba(244,12,63,0.2)] border border-crimson/30 rounded-full bg-black/50 backdrop-blur-md"
              ease="power2.easeOut"
              baseColor="#f40c3f" // Crimson Primary
              pillColor="#1a0004" // Deep Burgundy/Black
              hoveredPillTextColor="#ffffff"
              pillTextColor="#e5e5e5"
              initialLoadAnimation={true}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
