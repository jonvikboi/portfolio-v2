"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumePage() {
  return (
    <main className="h-screen w-full flex flex-col bg-background/80 backdrop-blur-sm relative z-10">
      <div className="absolute top-6 left-6 z-50">
        <Link href="/#hero">
          <motion.div 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-md border border-crimson/30 rounded-full text-white hover:text-primary hover:border-primary transition-colors cursor-pointer hoverable"
          >
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Home</span>
          </motion.div>
        </Link>
      </div>

      {/* Built-in PDF Viewer */}
      <div className="flex-1 w-full h-full pt-24 px-6 pb-6 max-w-6xl mx-auto">
        <object 
          data="/resume.pdf" 
          type="application/pdf" 
          className="w-full h-full rounded-2xl shadow-[0_0_50px_rgba(244,12,63,0.15)] border border-crimson/30 bg-black/50"
        >
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="mb-4">It appears you don't have a PDF plugin for this browser.</p>
            <a href="/resume.pdf" className="text-primary hover:underline">
              Click here to download the PDF file.
            </a>
          </div>
        </object>
      </div>
    </main>
  );
}
