"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

export default function ResumePage() {
  return (
    <main className="relative z-10 flex min-h-svh w-full flex-col bg-background/90 px-4 pb-6 pt-[calc(5.25rem+env(safe-area-inset-top))] backdrop-blur-sm sm:px-8">
      <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-[#120004]/85 p-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/#hero"
              data-cursor="Back"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-primary hover:text-primary"
            >
              <motion.span
                whileHover={{ x: -3 }}
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft size={15} aria-hidden />
                <span>Back to Portfolio</span>
              </motion.span>
            </Link>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <FileText className="h-4 w-4 text-primary" />
                <span>{SITE.name} — Curriculum Vitae</span>
              </div>
              <p className="font-robotomedium text-[10px] uppercase tracking-[0.16em] text-white/45">
                {SITE.role} · {SITE.available.join(" · ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/85 transition-colors hover:border-primary/50 hover:text-white"
            >
              <span>Open in New Tab</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-xs font-medium text-white shadow-[0_0_25px_rgba(244,12,63,0.4)] transition-all hover:shadow-[0_0_35px_rgba(244,12,63,0.65)]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Built-in PDF Viewer */}
        <div className="mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl border border-primary/30 bg-black/60 shadow-[0_0_60px_rgba(244,12,63,0.16)]">
          <object
            data="/resume.pdf"
            type="application/pdf"
            aria-label="Joshua Zachary Jose resume"
            className="h-full min-h-[72svh] w-full"
          >
            <div className="flex h-full min-h-[72svh] flex-col items-center justify-center p-8 text-center text-white/60">
              <p className="mb-4">
                It appears your browser doesn&apos;t support embedded PDFs.
              </p>
              <a
                href="/resume.pdf"
                download
                className="rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-[0_0_30px_rgba(244,12,63,0.45)]"
              >
                Download the resume PDF
              </a>
            </div>
          </object>
        </div>
      </div>
    </main>
  );
}
