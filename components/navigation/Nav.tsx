"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/animation/TransitionLink";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { Button, Arrow } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the sheet on route change (state adjusted during render, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  // lock scroll while the sheet is open
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // current item: route on inner pages, scroll-spy for the Technology anchor on the homepage
  const [spy, setSpy] = useState(false);
  useEffect(() => {
    if (pathname !== "/") return;
    const el = document.getElementById("technology");
    const onScroll = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      setSpy(r.top <= window.innerHeight * 0.35 && r.bottom > window.innerHeight * 0.35);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  const isActive = (href: string) => (href === "/#technology" ? pathname === "/" && spy : pathname.startsWith(href));

  const pill = (on: boolean) =>
    cn(
      "rounded-full px-4 py-1.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-300",
      on ? "bg-primary text-background" : "text-primary/80 hover:bg-surface-alt hover:text-primary",
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-line bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
            : "border-b border-transparent",
        )}
      >
        <div className="container-v flex h-[72px] items-center justify-between md:h-[88px]">
          <TransitionLink href="/" aria-label="Axeract home" className="flex items-center">
            <BrandLogo height={46} priority className="max-md:[&_img]:!h-[34px]" />
          </TransitionLink>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-line bg-surface/70 p-1 shadow-[0_8px_24px_-16px_rgba(11,11,12,0.3)] backdrop-blur-md lg:flex"
          >
            {NAV_LINKS.map((l) => (
              <TransitionLink key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={pill(isActive(l.href))}>
                {l.label}
              </TransitionLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button href="/products" size="sm" variant="ink" className="hidden rounded-full md:inline-flex">
              Explore Products
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className={cn("absolute h-px w-5 bg-primary transition-transform duration-400 ease-[var(--ease-out)]", open ? "rotate-45" : "-translate-y-[3.5px]")} />
              <span className={cn("absolute h-px w-5 bg-primary transition-transform duration-400 ease-[var(--ease-out)]", open ? "-rotate-45" : "translate-y-[3.5px]")} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background pt-[72px] transition-[clip-path] duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="container-v flex flex-1 flex-col overflow-y-auto pb-8 pt-6">
          <span className="t-label">Menu</span>
          <div className="mt-3 border-t border-line">
            <TransitionLink href="/" className="font-display flex items-center justify-between border-b border-line py-5 text-[32px] leading-none">
              Home
              <Arrow className="h-3.5 w-3.5 text-tertiary" />
            </TransitionLink>
            {NAV_LINKS.map((l) => (
              <TransitionLink key={l.href} href={l.href} className="font-display flex items-center justify-between border-b border-line py-5 text-[32px] leading-none">
                {l.label}
                <Arrow className="h-3.5 w-3.5 text-tertiary" />
              </TransitionLink>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-10">
            <Button href="/products" variant="ink" size="lg" className="rounded-full">
              Explore Products
            </Button>
            <div className="flex items-center gap-3">
              <span className="t-label">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
