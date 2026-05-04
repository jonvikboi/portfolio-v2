import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import BallpitWrapper from "@/components/BallpitWrapper";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Joshua Zachary Jose | Portfolio",
  description: "Joshua Zachary Jose | Portfolio",
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
    <html lang="en" className={cn("scroll-smooth no-scrollbar", "font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
      <body className="antialiased selection:bg-primary selection:text-white relative bg-background">
        <SmoothScroll>
          <CustomCursor />
          <div className="hollow-frame" />
          <div className="fixed inset-0 z-0 pointer-events-none">
            <BallpitWrapper />
            {/* Dark overlay to mute the ballpit and reduce distraction */}
            <div className="absolute inset-0 bg-background/25 backdrop-blur-[3px] pointer-events-none" />
          </div>
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
