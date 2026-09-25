import Image from "next/image";
import { cn } from "@/lib/utils";

const W = 1769;
const H = 320;

/**
 * The supplied Axeract lock-up, keyed out of its flat background.
 * Two inks ship (black for light canvases, off-white for dark); CSS shows the right one.
 */
export function BrandLogo({ className, height = 36, priority, onInk }: { className?: string; height?: number; priority?: boolean; onInk?: boolean }) {
  const width = Math.round((W / H) * height);
  const common = { width, height, priority, sizes: `${width * 2}px`, style: { height } };
  if (onInk) return <Image src="/brand/axeract-logo-light.png" alt="Axeract Technology" {...common} className={cn("w-auto select-none", className)} />;
  return (
    <span className={cn("inline-flex", className)}>
      <Image src="/brand/axeract-logo.png" alt="Axeract Technology" {...common} className="logo-light w-auto select-none" />
      <Image src="/brand/axeract-logo-light.png" alt="" {...common} aria-hidden className="logo-dark w-auto select-none" />
    </span>
  );
}

/** The mark alone, as inline SVG so it stays crisp at any size. */
export function AxeractMark({ className, ink = "currentColor", accent = "var(--brand-primary)" }: { className?: string; ink?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 842 638" className={className} aria-hidden>
      <path fill={ink} d="M216 0h202l424 638H639zM636 0h190L639 255l-92-139zM298 206l84 129-206 303H0z" />
      <path fill={accent} d="M416 397l161 241H244z" />
    </svg>
  );
}
