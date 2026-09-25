"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BRAND_COLOR } from "@/lib/brand";
import { prefersReducedMotion } from "@/lib/motion/gsap";

type Ctx = { navigate: (href: string) => void; busy: boolean };
const TransitionContext = createContext<Ctx>({ navigate: () => {}, busy: false });
export const usePageTransition = () => useContext(TransitionContext);

const IN_MS = 520;
const OUT_MS = 560;

/**
 * Page transition. A full-screen ink layer carrying the Axeract mark sweeps in, the route changes underneath it, then the layer
 * sweeps out. Total ≈ 1.1s but navigation itself happens at 520ms.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const pending = useRef<string | null>(null);

  // when the route we were waiting for lands, sweep the layer out
  useEffect(() => {
    if (pending.current && pathname === pending.current.split("#")[0].split("?")[0]) {
      const hash = pending.current.split("#")[1];
      pending.current = null;
      window.scrollTo(0, 0);
      if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }), 60);
      setPhase("out");
      const t = setTimeout(() => {
        setPhase("idle");
        setBusy(false);
      }, OUT_MS);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      const target = href.split("#")[0].split("?")[0] || "/";
      if (target === pathname && !busy) {
        // same page: glide to the section (or the top) instead of routing
        const hash = href.split("#")[1];
        const el = hash ? document.getElementById(hash) : null;
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number | HTMLElement, o?: object) => void } }).__lenis;
        if (hash && !el) {
          router.push(href);
          return;
        }
        if (lenis) lenis.scrollTo(el ?? 0, { offset: el ? -72 : 0, duration: 1.1 });
        else if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", hash ? `#${hash}` : pathname);
        return;
      }
      if (busy) {
        router.push(href);
        return;
      }
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }
      setBusy(true);
      setPhase("in");
      pending.current = href;
      router.prefetch(href);
      setTimeout(() => router.push(href), IN_MS - 60);
      // safety: never leave the layer stuck
      setTimeout(() => {
        if (pending.current) {
          pending.current = null;
          setPhase("out");
          setTimeout(() => {
            setPhase("idle");
            setBusy(false);
          }, OUT_MS);
        }
      }, 4000);
    },
    [pathname, busy, router],
  );

  const value = useMemo(() => ({ navigate, busy }), [navigate, busy]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          background: `linear-gradient(160deg, #111 0%, #0b1a1d 55%, ${BRAND_COLOR} 140%)`,
          clipPath:
            phase === "in" ? "inset(0 0 0 0)" : phase === "out" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
          transition:
            phase === "in"
              ? `clip-path ${IN_MS}ms cubic-bezier(0.76,0,0.24,1)`
              : phase === "out"
                ? `clip-path ${OUT_MS}ms cubic-bezier(0.76,0,0.24,1)`
                : "none",
          pointerEvents: busy ? "auto" : "none",
        }}
      >
        <svg
          viewBox="0 0 842 638"
          className="w-[16vw] max-w-[150px] min-w-[84px]"
          style={{
            opacity: phase === "in" ? 1 : 0,
            transform: phase === "in" ? "scale(1)" : "scale(0.92)",
            transition: "opacity 400ms ease 120ms, transform 400ms cubic-bezier(0.16,1,0.3,1) 120ms",
          }}
        >
          <path fill="#f5f5f2" d="M216 0h202l424 638H639zM636 0h190L639 255l-92-139zM298 206l84 129-206 303H0z" />
          <path fill="#2a8fa0" d="M416 397l161 241H244z" />
        </svg>
      </div>
    </TransitionContext.Provider>
  );
}
