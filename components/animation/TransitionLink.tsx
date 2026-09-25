"use client";

import Link, { type LinkProps } from "next/link";
import { usePageTransition } from "@/lib/motion/transition-context";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

type Props = Omit<LinkProps, "href"> &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode; ref?: React.Ref<HTMLAnchorElement> };

/** A next/link that routes through the brand-colour transition layer. */
export function TransitionLink({ href, onClick, children, ref, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const h = href;
  const external = /^https?:|^mailto:|^tel:/.test(h);

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || external) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(h);
  };

  return (
    <Link href={href} onClick={handle} ref={ref} {...rest}>
      {children}
    </Link>
  );
}
