"use client";

import { useTheme } from "@/lib/theme/theme-context";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-line-strong bg-surface transition-colors duration-300 hover:border-brand",
        className,
      )}
    >
      <span
        className="absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-primary transition-transform duration-400 ease-[var(--ease-out)]"
        style={{ transform: dark ? "translateX(20px)" : "translateX(0)" }}
      />
      <span className="sr-only">{dark ? "Dark" : "Light"} mode</span>
      {/* sun / moon glyphs */}
      <svg viewBox="0 0 16 16" className="absolute left-[7px] h-3 w-3 text-background" aria-hidden style={{ opacity: dark ? 0 : 1 }}>
        <circle cx="8" cy="8" r="2.6" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
        </g>
      </svg>
      <svg viewBox="0 0 16 16" className="absolute right-[7px] h-3 w-3 text-background" aria-hidden style={{ opacity: dark ? 1 : 0 }}>
        <path d="M11.5 10.2A5 5 0 0 1 5.8 4.5a5 5 0 1 0 5.7 5.7z" fill="currentColor" />
      </svg>
    </button>
  );
}
