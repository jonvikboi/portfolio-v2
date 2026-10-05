import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: true });
const About = dynamic(() => import("@/components/sections/About"), { ssr: true });
const Certifications = dynamic(() => import("@/components/sections/Certifications"), { ssr: true });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col">
      <Hero />
      <Projects />
      <About />
      <Certifications />
      <Footer />
    </main>
  );
}
