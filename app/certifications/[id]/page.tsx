"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { certifications } from "@/components/sections/Certifications";
import { notFound } from "next/navigation";

export default function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const cert = certifications.find((c) => c.id === resolvedParams.id);

  if (!cert) {
    notFound();
  }

  return (
    <main className="relative z-10 flex min-h-svh w-full flex-col bg-background/90 px-4 pb-6 pt-[calc(5.25rem+env(safe-area-inset-top))] backdrop-blur-sm sm:px-8">
      <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col">
        {/* Top Credential Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-[#120004]/85 p-4 backdrop-blur-xl sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#certifications"
              data-cursor="Back"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-primary hover:text-primary"
            >
              <motion.span
                whileHover={{ x: -3 }}
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft size={15} aria-hidden />
                <span>Back to Credentials</span>
              </motion.span>
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <h1 className="font-unique text-lg font-bold text-white sm:text-xl">
                  {cert.name}
                </h1>
              </div>
              <p className="font-robotomedium text-[11px] uppercase tracking-[0.14em] text-white/50">
                {cert.issuer} · {cert.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/85 transition-colors hover:border-primary/50 hover:text-white"
            >
              <span>Open in New Tab</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
            </a>
            <a
              href={cert.pdf}
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-xs font-medium text-white shadow-[0_0_25px_rgba(244,12,63,0.4)] transition-all hover:shadow-[0_0_35px_rgba(244,12,63,0.65)]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Certificate</span>
            </a>
          </div>
        </div>

        {/* Certificate Viewer */}
        <div className="mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl border border-primary/30 bg-black/60 shadow-[0_0_60px_rgba(244,12,63,0.16)]">
          <object
            data={cert.pdf}
            type="application/pdf"
            aria-label={`${cert.name} certificate`}
            className="h-full min-h-[70svh] w-full"
          >
            <div className="flex h-full min-h-[70svh] flex-col items-center justify-center p-8 text-center text-white/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.image}
                alt={cert.name}
                className="mb-6 max-h-[50vh] rounded-xl border border-white/10 object-contain"
              />
              <p className="mb-4 text-sm">
                Embedded PDF preview is unavailable in this browser.
              </p>
              <a
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-[0_0_30px_rgba(244,12,63,0.45)]"
              >
                Download Certificate PDF
              </a>
            </div>
          </object>
        </div>
      </div>
    </main>
  );
}
