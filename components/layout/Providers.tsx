"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ThemeProvider } from "@/lib/theme/theme-context";
import { PageTransitionProvider } from "@/lib/motion/transition-context";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveal } from "@/lib/motion/use-reveal";

function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);
  return null;
}

function RouteEffects() {
  const pathname = usePathname();
  useReveal([pathname]);
  useEffect(() => {
    // new route → new layout heights
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PageTransitionProvider>
        <SmoothScroll />
        <RouteEffects />
        {children}
      </PageTransitionProvider>
    </ThemeProvider>
  );
}
