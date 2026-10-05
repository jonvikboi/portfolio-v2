"use client";

import HoverIndex from "@/components/ui/HoverIndex";
import { SectionHead, SplitLines } from "@/components/ui/Reveal";

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
  return (
    <section id="certifications" className="relative z-10 px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="03" label="Certifications" meta={`${certifications.length} credentials`} />
      <SplitLines
        as="h2"
        className="mt-14 text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:mt-20 md:text-7xl"
        lines={[<>Always <span className="font-heading italic font-normal text-primary">learning</span></>]}
      />
      <div className="mt-16 md:mt-24">
        <HoverIndex
          columns={["Credential", "Issuer", "Year"]}
          items={certifications.map((c) => ({
            title: c.name,
            meta: [c.issuer],
            year: c.date,
            href: `/certifications/${c.id}`,
            image: c.image,
            cursor: "Open",
          }))}
        />
      </div>
    </section>
  );
}
