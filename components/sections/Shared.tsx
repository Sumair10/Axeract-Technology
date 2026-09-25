import Image from "next/image";
import { Label, MaskedHeading } from "@/components/typography/Label";
import { Button } from "@/components/ui/Button";
import { BRAND_LINES } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

type Img = { src: string; alt: string };

/* small typographic ornaments that sit inline with display headlines */
export function Hatch({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block h-[0.62em] w-[1.7em] align-[0.04em]", className)}
      style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.75) 0 1.5px, transparent 1.5px 9px)" }}
    />
  );
}
export function Rings({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 260 90" className={cn("inline-block h-[0.66em] w-[1.9em] align-[0.02em]", className)} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5">
      {[0, 9, 18, 27].map((i) => (
        <rect key={i} x={2 + i} y={2 + i} width={256 - i * 2} height={86 - i * 2} rx={43 - i} />
      ))}
    </svg>
  );
}
/** The logo's triangle, drawn as three nested outlines. */
export function Prism({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 90" className={cn("inline-block h-[0.66em] w-[0.9em] align-[0.02em]", className)} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5">
      {[0, 12, 24].map((i) => (
        <path key={i} d={`M60 ${4 + i * 1.2} L${116 - i} 88 L${4 + i} 88 Z`} strokeLinejoin="round" />
      ))}
    </svg>
  );
}

export function HeroCard({ title, text, className }: { title: string; text: string; className?: string }) {
  return (
    <div className={cn("flex min-h-[170px] flex-col justify-between gap-10 rounded-[18px] bg-surface p-5 shadow-[0_14px_30px_-24px_var(--brand-shadow)] md:min-h-[250px] md:p-6", className)}>
      <span className="tri" aria-hidden />
      <div>
        <h2 className="font-display text-[clamp(1.4rem,2vw,1.85rem)] font-light leading-[1.05] tracking-[-0.03em]">{title}</h2>
        <p className="mt-3 max-w-[28ch] text-[13px] leading-snug text-secondary">{text}</p>
      </div>
    </div>
  );
}

export function HeroPhoto({ img, sizes, title, text, className }: { img: Img; sizes: string; title: string; text: string; className?: string }) {
  return (
    <div className={cn("relative isolate flex min-h-[230px] flex-col justify-between overflow-hidden rounded-[18px] p-5 text-white md:min-h-[280px] md:p-6", className)}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className="-z-10 object-cover" />
      <span aria-hidden className="absolute inset-0 -z-[5] bg-gradient-to-b from-[#071a1e]/70 via-transparent to-[#071a1e]/75" />
      <h2 className="font-display text-[clamp(1.4rem,2vw,1.85rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">{title}</h2>
      <p className="max-w-[32ch] text-[13px] leading-snug text-white/85">{text}</p>
    </div>
  );
}

/** Inner-page hero: the homepage's full-bleed photograph card, with a frosted copy panel along its foot. */
export function PageHero({
  eyebrow,
  lines,
  copy,
  img,
  children,
  position = "50% 50%",
}: {
  eyebrow: string;
  lines: React.ReactNode[];
  copy: React.ReactNode;
  img: Img;
  children?: React.ReactNode;
  position?: string;
}) {
  return (
    <section className="panel-bg pb-6 pt-[80px] md:pb-10 md:pt-[96px]" aria-labelledby="hero-heading">
      <div className="container-v">
        <div className="relative isolate flex min-h-[640px] flex-col justify-between overflow-hidden rounded-[24px] shadow-[0_40px_90px_-50px_var(--brand-shadow)] md:min-h-[720px]">
          <Image src={img.src} alt={img.alt} fill priority sizes="(min-width:1440px) 1376px, 96vw" className="-z-10 object-cover" style={{ objectPosition: position }} />
          <span aria-hidden className="absolute inset-0 -z-[5] bg-gradient-to-b from-black/55 via-black/15 to-black/10" />

          <div className="px-5 pb-12 pt-14 md:px-10 md:pt-20">
            <Label brand className="[&_span]:!text-white/80">
              {eyebrow}
            </Label>
            <MaskedHeading
              as="h1"
              id="hero-heading"
              lines={lines}
              className="mt-6 max-w-[18ch] text-[clamp(2.5rem,6vw,6.25rem)] font-light leading-[1.02] tracking-[-0.04em] text-white"
            />
          </div>

          <div className="mx-2 mb-2 rounded-[22px] border border-white/60 bg-white/75 p-5 shadow-[0_30px_60px_-30px_var(--brand-shadow)] backdrop-blur-xl md:mx-3 md:mb-3 md:p-7 [:root[data-theme=dark]_&]:border-white/15 [:root[data-theme=dark]_&]:bg-black/60">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="t-lead !text-primary lg:col-span-7">{copy}</div>
              {children && <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">{children}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Full-bleed photograph with a closing statement and optional actions. */
export function PhotoBand({
  img,
  label,
  lines,
  copy,
  actions,
  id,
}: {
  img: Img;
  label: string;
  lines: React.ReactNode[];
  copy?: string;
  actions?: { label: string; href: string; variant?: "white" | "outline" | "brand" }[];
  id?: string;
}) {
  return (
    <section id={id} className="on-ink relative isolate scroll-mt-20 overflow-hidden bg-ink" aria-label={label}>
      <Image src={img.src} alt={img.alt} fill sizes="100vw" className="-z-10 object-cover opacity-75" />
      <span aria-hidden className="absolute inset-0 -z-[5] bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
      <div className="container-v flex min-h-[70vh] flex-col justify-end py-16 md:min-h-[86vh] md:py-24">
        <div className="grid grid-cols-4 gap-x-8 md:grid-cols-12">
          <div className="col-span-4 md:col-span-3">
            <Label brand className="[&_span]:text-white/60">
              {label}
            </Label>
          </div>
          <div className="col-span-4 mt-6 md:col-span-8 md:col-start-5 md:mt-0">
            <MaskedHeading as="h2" lines={lines} className="t-display text-white" />
            {copy && (
              <p className="mt-6 max-w-[46ch] text-[17px] leading-snug text-white/75" data-reveal>
                {copy}
              </p>
            )}
            {actions && (
              <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                {actions.map((a) => (
                  <Button
                    key={a.label}
                    href={a.href}
                    size="lg"
                    variant={a.variant === "outline" ? "outline" : a.variant === "brand" ? "brand" : "white"}
                    className={cn("rounded-full", a.variant === "outline" && "!border-white/35 !text-white hover:!border-white")}
                  >
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Slow ticker of the short brand lines. */
export function BrandMarquee({ className }: { className?: string }) {
  const items = [...BRAND_LINES, ...BRAND_LINES];
  return (
    <div className={cn("marquee overflow-hidden rule-t rule-b py-6 md:py-8", className)} aria-hidden>
      <div className="marquee-track">
        {items.map((l, i) => (
          <span key={i} className="font-display flex items-center gap-8 whitespace-nowrap px-4 text-[clamp(1.5rem,2.6vw,2.5rem)] font-light md:gap-10 md:px-5">
            {l}
            <span className="tri !h-[0.4em] !w-[0.46em] opacity-80" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Heading block used at the top of most sections. */
export function SectionHead({
  index,
  label,
  lines,
  id,
  intro,
  className,
}: {
  index?: string;
  label: string;
  lines: React.ReactNode[];
  id: string;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-7">
        <Label index={index}>{label}</Label>
        <MaskedHeading as="h2" id={id} lines={lines} className="t-display mt-6" />
      </div>
      {intro && (
        <div className="t-lead flex flex-col gap-4 lg:col-span-4 lg:col-start-9" data-reveal>
          {intro}
        </div>
      )}
    </div>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={cn("inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13.5px] text-primary", className)}>
      <span className="dot-brand !h-[5px] !w-[5px] !shadow-none" aria-hidden />
      {children}
    </li>
  );
}
