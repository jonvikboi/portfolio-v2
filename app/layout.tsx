import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import LightfallWrapper from "@/components/LightfallWrapper";

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Joshua Zachary Jose | Full-stack Developer",
  description: "Portfolio of Joshua Zachary Jose — full-stack developer building fast, motion-rich web experiences.",
  icons: {
    icon: "/icons/jzj.png",
    shortcut: "/icons/jzj.png",
    apple: "/icons/jzj.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("no-scrollbar", "font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
      <body className="antialiased selection:bg-primary selection:text-white relative bg-background">
        <SmoothScroll>
          <Loader />
          <CustomCursor />
          <LightfallWrapper />
          <div aria-hidden className="grain" />
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
