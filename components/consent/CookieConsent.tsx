"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "axeract-consent";
type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const readChoice = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

/** Google Analytics loads only after the visitor accepts. Nothing renders unless NEXT_PUBLIC_GA_ID is set. */
function loadAnalytics() {
  if (!GA_ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag expects the arguments object itself
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    const c = readChoice();
    if (c === "granted") loadAnalytics();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    else if (c === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("axeract:cookie-settings", reopen);
    return () => window.removeEventListener("axeract:cookie-settings", reopen);
  }, []);

  // single-page navigations still count as page views once analytics is on
  useEffect(() => {
    if (GA_ID && window.gtag) window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname]);

  if (!GA_ID || !open) return null;

  const decide = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    if (c === "granted") loadAnalytics();
    setOpen(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[420px]">
      <div className="card p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
        <p className="font-display text-[20px] leading-tight">Cookies, only with your okay.</p>
        <p className="t-body mt-2 text-[13.5px]">
          We&apos;d like to use analytics cookies to understand how the site is used. Nothing is set unless you accept.{" "}
          <Link href="/privacy#cookies" className="text-primary underline underline-offset-4">
            Privacy Policy
          </Link>
        </p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => decide("granted")} className={cn("h-10 flex-1 rounded-full bg-brand px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-brand-deep")}>
            Accept
          </button>
          <button type="button" onClick={() => decide("denied")} className="h-10 flex-1 rounded-full border border-line-strong px-4 text-[13.5px] font-medium text-primary transition-colors hover:border-brand">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. Only shown when analytics is configured. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("axeract:cookie-settings"))} className={cn("transition-colors hover:text-white", className)}>
      Cookie settings
    </button>
  );
}
