"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ArrowUpRight,
  Download,
  Eye,
  LayoutGrid,
  List,
  ShieldCheck,
  X,
} from "lucide-react";
import HoverIndex from "@/components/ui/HoverIndex";
import { FadeUp, SectionHead, SplitLines, SpotlightCard } from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

export const certifications = [
  {
    id: "frontend-dev",
    name: "Frontend UI & UX Developer",
    issuer: "Larsen & Toubro EduTech",
    date: "2025",
    focus: "Interface Architecture, Design Systems & Responsive UX",
    image: "/certs/cert1.png",
    pdf: "/certs/cert1.pdf",
  },
  {
    id: "computer-networks",
    name: "Network Fundamentals",
    issuer: "Infosys Springboard",
    date: "2025",
    focus: "TCP/IP Protocols, Routing, Packet Flow & Network Security",
    image: "/certs/cert2.png",
    pdf: "/certs/cert2.pdf",
  },
  {
    id: "ai-principles",
    name: "Artificial Intelligence",
    issuer: "Udemy",
    date: "2025",
    focus: "Neural Networks, Search Heuristics & Applied Machine Learning",
    image: "/certs/cert3.png",
    pdf: "/certs/cert3.pdf",
  },
  {
    id: "python-programming",
    name: "Python Programming",
    issuer: "Udemy",
    date: "2025",
    focus: "Data Structures, Automation, Scripting & Backend Engineering",
    image: "/certs/cert4.png",
    pdf: "/certs/cert4.pdf",
  },
];

export default function Certifications() {
  const [view, setView] = useState<"vault" | "index">("vault");
  const [selectedCert, setSelectedCert] = useState<
    (typeof certifications)[number] | null
  >(null);

  return (
    <section
      id="certifications"
      className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-28 md:px-10 md:py-40"
    >
      <SectionHead
        index="03"
        label="Certifications"
        meta={`${certifications.length} Verified Credentials`}
      />

      <div className="mt-14 flex flex-col justify-between gap-8 md:mt-20 lg:flex-row lg:items-end">
        <div>
          <SplitLines
            as="h2"
            className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl"
            lines={[
              <>
                Always{" "}
                <span className="font-heading italic font-normal text-primary text-glow">
                  learning
                </span>{" "}
                &amp; verifying
              </>,
            ]}
          />
          <FadeUp
            delay={0.15}
            className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Continuous technical validation across UI/UX engineering, network architecture, artificial intelligence, and core programming.
          </FadeUp>
        </div>

        {/* View Switcher */}
        <FadeUp delay={0.2}>
          <div
            role="group"
            aria-label="Certifications view mode"
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#120004]/80 p-1.5 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setView("vault")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                view === "vault"
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(244,12,63,0.45)]"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Credential Vault</span>
            </button>
            <button
              type="button"
              onClick={() => setView("index")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                view === "index"
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(244,12,63,0.45)]"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Index List</span>
            </button>
          </div>
        </FadeUp>
      </div>

      <div className="mt-16 md:mt-24">
        <AnimatePresence mode="wait">
          {view === "vault" ? (
            <motion.div
              key="vault"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid grid-cols-1 gap-7 md:grid-cols-2"
            >
              {certifications.map((cert, i) => (
                <FadeUp key={cert.id} delay={i * 0.08}>
                  <SpotlightCard className="flex h-full flex-col justify-between p-5 sm:p-7">
                    {/* Top Metadata Bar */}
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-4">
                        <span className="inline-flex items-center gap-2 font-robotomedium text-xs uppercase tracking-[0.18em] text-primary">
                          <ShieldCheck className="h-4 w-4" />
                          CERT {"//"} 0{i + 1}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-robotomedium text-xs text-white/60">
                          {cert.issuer} · {cert.date}
                        </span>
                      </div>

                      {/* Certificate Image Frame */}
                      <div
                        onClick={() => setSelectedCert(cert)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedCert(cert);
                          }
                        }}
                        data-cursor="Preview"
                        className="group/img relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-white/12 bg-black/60"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cert.image}
                          alt={`${cert.name} certificate from ${cert.issuer}`}
                          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0002]/90 via-transparent to-transparent opacity-75 transition-opacity duration-300 group-hover/img:opacity-40" />
                        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-primary/45 bg-[#0a0002]/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-transform duration-300 group-hover/img:scale-105">
                          <Eye className="h-3.5 w-3.5 text-primary" />
                          <span>Quick Inspect</span>
                        </div>
                      </div>

                      {/* Title & Focus */}
                      <div className="mt-5">
                        <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                          {cert.name}
                        </h3>
                        <p className="mt-1.5 text-xs text-white/60 sm:text-sm">
                          {cert.focus}
                        </p>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 transition-colors hover:text-primary"
                      >
                        <Award className="h-3.5 w-3.5 text-primary" />
                        <span>View Lightbox</span>
                      </button>

                      <div className="flex items-center gap-2.5">
                        <a
                          href={cert.pdf}
                          download
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-2 text-xs text-white/75 transition-colors hover:border-primary/40 hover:text-white"
                        >
                          <Download className="h-3.5 w-3.5 text-primary" />
                          <span>PDF</span>
                        </a>
                        <Link
                          href={`/certifications/${cert.id}`}
                          data-cursor="Open"
                          className="inline-flex items-center gap-1.5 rounded-full border border-primary/45 bg-primary/15 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-primary hover:shadow-[0_0_25px_rgba(244,12,63,0.45)]"
                        >
                          <span>Full Credential</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </FadeUp>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="index"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <HoverIndex
                columns={["Credential", "Issuer", "Year"]}
                items={certifications.map((c) => ({
                  title: c.name,
                  meta: [c.issuer, c.focus],
                  year: c.date,
                  href: `/certifications/${c.id}`,
                  image: c.image,
                  cursor: "Open",
                }))}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-primary/40 bg-[#0f0003] p-5 shadow-[0_30px_100px_rgba(244,12,63,0.3)] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="font-robotomedium text-xs uppercase tracking-[0.18em] text-primary">
                    {selectedCert.issuer} · {selectedCert.date}
                  </span>
                  <h3 className="mt-1 text-2xl font-medium text-white sm:text-3xl">
                    {selectedCert.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate preview"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-primary hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-white/60">{selectedCert.focus}</p>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedCert.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-primary/50"
                  >
                    <Download className="h-3.5 w-3.5 text-primary" />
                    <span>Download PDF</span>
                  </a>
                  <Link
                    href={`/certifications/${selectedCert.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-medium text-white shadow-[0_0_25px_rgba(244,12,63,0.5)]"
                  >
                    <span>Open PDF Viewer</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
