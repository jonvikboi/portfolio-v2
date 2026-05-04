import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const TechStack = dynamic(() => import("@/components/sections/TechStack"), { ssr: true });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: true });
const Certifications = dynamic(() => import("@/components/sections/Certifications"), { ssr: true });
const Goals = dynamic(() => import("@/components/sections/Goals"), { ssr: true });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: true });

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full relative">
      <Navbar />
      <Hero />
      <TechStack />
      <Projects />
      <Certifications />
      <Goals />
      <Footer />
    </main>
  );
}
