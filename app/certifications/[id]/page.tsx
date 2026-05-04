"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { certifications } from "@/components/sections/Certifications";
import { notFound } from "next/navigation";

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const cert = certifications.find(c => c.id === resolvedParams.id);

  if (!cert) {
    notFound();
  }

  return (
    <main className="h-screen w-full flex flex-col bg-background/80 backdrop-blur-sm relative z-10">
      <div className="absolute top-6 left-6 z-50">
        <Link href="/#certifications">
          <motion.div 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-md border border-crimson/30 rounded-full text-white hover:text-primary hover:border-primary transition-colors cursor-pointer hoverable"
          >
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Home</span>
          </motion.div>
        </Link>
      </div>

      <div className="flex-1 w-full h-full pt-24 px-6 pb-6 max-w-6xl mx-auto flex flex-col">
        <h1 className="text-3xl font-bold text-white mb-6 font-unique text-center">{cert.name}</h1>
        <div className="flex-1 w-full bg-black/50 rounded-2xl border border-crimson/30 overflow-hidden shadow-[0_0_50px_rgba(244,12,63,0.15)]">
          <object 
            data={cert.pdf} 
            type="application/pdf" 
            className="w-full h-full"
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
              <p className="mb-4">It appears your browser doesn't support embedded PDFs.</p>
              <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline px-6 py-3 bg-crimson/20 rounded-full">
                Download PDF
              </a>
            </div>
          </object>
        </div>
      </div>
    </main>
  );
}
