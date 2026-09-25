"use client";

import { useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/animation/TransitionLink";
import { prefersReducedMotion } from "@/lib/motion/gsap";

type Variant = "ink" | "brand" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
};

const variants: Record<Variant, string> = {
  ink: "bg-ink text-white hover:bg-brand",
  brand: "bg-brand text-white hover:bg-brand-deep",
  outline: "border border-line-strong text-primary hover:border-brand hover:text-brand-text",
  ghost: "text-primary hover:text-brand-text",
  white: "bg-white text-ink hover:bg-brand hover:text-white",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-[15px]",
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={cn("h-[11px] w-[11px]", className)} aria-hidden>
      <path d="M2 10 L10 2 M4 2 H10 V8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Minimal button with arrow drift + light magnetic pull on desktop. */
export function Button({
  href,
  variant = "ink",
  size = "md",
  arrow = true,
  className,
  children,
  type = "button",
  onClick,
  disabled,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    el.style.transform = `translate3d(${x}px,${y}px,0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const cls = cn(
    "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius-sm)] font-medium tracking-[-0.01em]",
    "transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out)] will-change-transform",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Arrow className="transition-transform duration-300 ease-[var(--ease-out)] group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]" />
      )}
    </>
  );

  if (href) {
    return (
      <TransitionLink
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={cls}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...rest}
      >
        {inner}
      </TransitionLink>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={cls}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {inner}
    </button>
  );
}
