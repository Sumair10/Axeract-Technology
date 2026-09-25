import { cn } from "@/lib/utils";

/** Tiny technical label: `01 / REAL-TIME`, `PRODUCT / 01`. */
export function Label({
  index,
  children,
  className,
  brand,
}: {
  index?: string;
  children?: React.ReactNode;
  className?: string;
  brand?: boolean;
}) {
  return (
    <span className={cn("t-label inline-flex items-center gap-2", className)}>
      {brand && <span className="dot-brand" aria-hidden />}
      {index && <span className="t-mono text-tertiary">{index}</span>}
      {index && children && <span className="text-tertiary/60">/</span>}
      {children && <span className="text-primary">{children}</span>}
    </span>
  );
}

/** Heading whose lines slide up from behind a mask. Pass lines as an array. */
export function MaskedHeading({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  id,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("font-display", className)} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask" style={{ "--i": i } as React.CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
