"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-in), .line-mask:not(.is-in)";

/**
 * Site-wide scroll reveal. Any element with [data-reveal] (or .line-mask) gets
 * `.is-in` when it enters the viewport. One IntersectionObserver for the page;
 * a MutationObserver keeps it in sync with elements that mount later (route
 * changes, lazy sections, hot reloads) so nothing is ever left hidden.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    };
    scan();

    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
