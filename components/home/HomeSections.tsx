import Image from "next/image";
import { Label, MaskedHeading } from "@/components/typography/Label";
import { Button } from "@/components/ui/Button";
import { Chip, HeroCard, HeroPhoto, Prism, Rings, SectionHead } from "@/components/sections/Shared";
import { TranslatorPhone } from "@/components/products/TranslatorPhone";
import { TechIcon, type TechKey } from "@/components/products/TechIcon";
import { IMG } from "@/lib/constants/images";
import { cn } from "@/lib/utils";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/* 01 — hero: full-bleed photograph, light headline, frosted panel overlapping the foot */
export function HomeHero() {
  return (
    <section className="panel-bg pb-6 pt-[80px] md:pb-10 md:pt-[96px]" aria-labelledby="hero-heading">
      <div className="container-v">
        <div className="relative isolate flex flex-col overflow-hidden rounded-[24px] shadow-[0_40px_90px_-50px_var(--brand-shadow)]">
          <Image src={IMG.heroPrism.src} alt={IMG.heroPrism.alt} fill priority sizes="(min-width:1440px) 1376px, 96vw" className="-z-10 object-cover object-[50%_60%]" />
          <span aria-hidden className="absolute inset-0 -z-[5] bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

          <div className="px-5 pb-16 pt-14 text-center md:px-10 md:pb-28 md:pt-20 lg:pb-40">
            <Label brand className="justify-center [&_span]:!text-white/80">
              Axeract Technology Ltd
            </Label>
            <h1 id="hero-heading" className="font-display mt-6 text-[clamp(2.75rem,7.2vw,7.5rem)] font-light leading-[1.02] tracking-[-0.04em] text-white">
              <span className="line-mask" style={{ "--i": 0 } as React.CSSProperties}>
                <span>
                  <Rings className="mr-[0.2em] hidden sm:inline-block" />
                  We build
                </span>
              </span>
              <span className="line-mask" style={{ "--i": 1 } as React.CSSProperties}>
                <span>
                  what comes next
                  <Prism className="ml-[0.2em] hidden sm:inline-block" />
                </span>
              </span>
            </h1>
          </div>

          {/* frosted panel */}
          <div className="mx-2 mb-2 rounded-[26px] border border-white/60 bg-white/70 p-2 shadow-[0_30px_60px_-30px_var(--brand-shadow)] backdrop-blur-xl md:mx-3 md:mb-3 md:p-3 [:root[data-theme=dark]_&]:border-white/15 [:root[data-theme=dark]_&]:bg-black/55">
            <div className="grid grid-cols-1 gap-2 md:gap-3 lg:grid-cols-12">
              <div className="flex flex-col justify-between gap-8 p-4 md:p-6 lg:col-span-6">
                <span className="t-label">About Axeract</span>
                <div>
                  <p className="font-display text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[1] tracking-[-0.04em] text-primary">
                    Technology,
                    <br />
                    made tangible.
                  </p>
                  <p className="mt-5 max-w-[44ch] text-[14px] leading-snug text-secondary">
                    Axeract creates intelligent digital products that turn emerging technology into simple, useful experiences for everyday life.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Button href="/products" variant="brand" size="md" className="rounded-full">
                      Explore Our Products
                    </Button>
                    <Button href="/about" variant="ghost" size="md" className="px-0">
                      Discover Axeract
                    </Button>
                  </div>
                </div>
              </div>

              <HeroCard title="Complex technology. Simple experiences." text="The hardest engineering should create the easiest interaction." className="lg:col-span-3" />
              <HeroCard title="Ideas become systems." text="Systems become products, built for the way people live, communicate and work." className="lg:col-span-3" />

              <HeroPhoto
                className="lg:col-span-8"
                img={IMG.heroDesk}
                sizes="(min-width:1024px) 60vw, 92vw"
                title="From possibility to product"
                text="Design, engineering, infrastructure and intelligence as one process."
              />
              <HeroPhoto
                className="lg:col-span-4"
                img={IMG.heroChip}
                sizes="(min-width:1024px) 30vw, 92vw"
                title="Intelligence behind simpler experiences"
                text="Designed for what comes next."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 02 — brand statement */
export function Intro() {
  return (
    <section className="rule-b py-20 md:py-32" aria-labelledby="intro-heading">
      <div className="container-v grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Label index="02">Brand statement</Label>
        </div>
        <div className="lg:col-span-8">
          <MaskedHeading as="h2" id="intro-heading" lines={["Technology should", <>feel <span className="text-brand-text">effortless.</span></>]} className="t-display" />
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <p className="font-display text-[clamp(1.4rem,2.1vw,2rem)] font-light leading-[1.2] tracking-[-0.02em]" data-reveal>
              The most powerful technology does not need to feel complicated.
            </p>
            <div className="t-body flex flex-col gap-4 text-[16px]" data-reveal style={delay(120)}>
              <p>
                Axeract combines artificial intelligence, thoughtful product design and modern engineering to build digital experiences that feel natural from
                the first interaction.
              </p>
              <p className="text-primary">We take complex technology and turn it into products people can actually use.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 03 — what we build: asymmetric capability grid */
const BUILD_ROW = [
  { k: "Real-Time Systems", t: "Experiences that happen now.", d: "From live communication to instant translation, we build systems designed for situations where every second matters.", img: IMG.realtime },
  { k: "Digital Platforms", t: "Products designed to scale.", d: "Reliable digital platforms built around strong architecture, thoughtful interfaces and evolving user needs.", img: IMG.platforms },
  { k: "Automation", t: "Less repetition. More possibility.", d: "We use intelligent automation to reduce unnecessary steps and make digital workflows more efficient.", img: IMG.automation },
];

export function WhatWeBuild() {
  return (
    <section id="build" className="scroll-mt-20 rule-b py-16 md:py-28" aria-labelledby="build-heading">
      <div className="container-v">
        <SectionHead
          index="03"
          label="What we build"
          id="build-heading"
          lines={["Ideas transformed into", "intelligent products."]}
          intro={
            <>
              <p>We explore where technology can remove friction, improve communication and create better everyday experiences.</p>
              <p className="t-body">Our products span multiple areas of digital technology.</p>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 lg:grid-cols-12">
          {/* tall feature */}
          <div className="group relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[20px] p-6 text-white md:p-8 lg:col-span-5 lg:row-span-2 lg:min-h-0" data-reveal>
            <Image
              src={IMG.intelligence.src}
              alt={IMG.intelligence.alt}
              fill
              sizes="(min-width:1024px) 40vw, 92vw"
              className="-z-10 object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
            />
            <span aria-hidden className="absolute inset-0 -z-[5] bg-gradient-to-t from-[#071a1e]/95 via-[#071a1e]/25 to-transparent" />
            <span className="t-label !text-white/70">AI &amp; Intelligence</span>
            <h3 className="font-display mt-3 text-[clamp(1.9rem,3vw,2.75rem)] leading-[1] text-white">Technology that understands more.</h3>
            <p className="mt-4 max-w-[40ch] text-[14.5px] leading-snug text-white/80">
              We use modern AI to create products capable of understanding language, context and user intent, making complex systems feel simpler and more
              human.
            </p>
          </div>

          {[
            { k: "Mobile Products", t: "Built for life in motion.", d: "We design mobile-first experiences that are fast, focused and intuitive across iOS and Android.", img: IMG.mobile },
            { k: "Product Engineering", t: "From concept to working product.", d: "Design, engineering, infrastructure and intelligence come together as one product-building process.", img: IMG.engineering },
          ].map((c, i) => (
            <div key={c.k} className="card grid grid-cols-1 overflow-hidden sm:grid-cols-[2fr_3fr] lg:col-span-7" data-reveal style={delay((i + 1) * 100)}>
              <div className="relative min-h-[200px]">
                <Image src={c.img.src} alt={c.img.alt} fill sizes="(min-width:640px) 22vw, 92vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6">
                <span className="t-label">{c.k}</span>
                <h3 className="font-display mt-3 text-[clamp(1.5rem,2vw,1.9rem)] leading-[1.05]">{c.t}</h3>
                <p className="t-body mt-3 max-w-[40ch]">{c.d}</p>
              </div>
            </div>
          ))}

          {BUILD_ROW.map((c, i) => (
            <div key={c.k} className="card flex flex-col overflow-hidden lg:col-span-4" data-reveal style={delay(i * 90)}>
              <div className="relative aspect-[16/10]">
                <Image src={c.img.src} alt={c.img.alt} fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="t-label">{c.k}</span>
                <h3 className="font-display mt-3 text-[clamp(1.4rem,1.8vw,1.75rem)] leading-[1.05]">{c.t}</h3>
                <p className="t-body mt-3">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 04 — products: Vivra split + what's next */
export const VIVRA_TAGS = ["AI", "Real-Time Translation", "Voice", "Mobile"];

export function Products() {
  return (
    <section id="products" className="scroll-mt-20 rule-b" aria-labelledby="products-heading">
      <div className="container-v py-16 md:py-24">
        <SectionHead
          index="04"
          label="Products by Axeract"
          id="products-heading"
          lines={["Different problems.", "One standard for how", "technology should feel."]}
          intro={<p>Axeract is building a growing portfolio of digital products across communication, artificial intelligence, productivity and everyday technology.</p>}
        />
      </div>

      <div className="tone-soft grid grid-cols-1 rule-t lg:grid-cols-2">
        <div className="relative min-h-[420px] lg:min-h-[720px]">
          <Image src={IMG.vivraCafe.src} alt={IMG.vivraCafe.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#071a1e]/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 lg:-right-14 lg:bottom-12 lg:left-auto">
            <TranslatorPhone />
          </div>
        </div>
        <div className="flex flex-col justify-center px-[var(--gutter)] py-16 lg:py-24 lg:pl-24 lg:pr-[max(var(--gutter),calc((100vw-1440px)/2+4rem))]">
          <Label index="01">Product</Label>
          <p className="t-label mt-8 !text-brand-text">Vivra Translator</p>
          <MaskedHeading as="h3" lines={["Conversation without", "language barriers."]} className="t-title mt-4" />
          <p className="t-body mt-6 max-w-[44ch] text-[16px]" data-reveal>
            Vivra is an AI-powered real-time translation experience designed to make conversations between different languages feel natural.
          </p>
          <ol className="mt-8 flex flex-col">
            {["Speak normally.", "Hear the translation.", "Continue the conversation."].map((s, i) => (
              <li key={s} className="flex items-center gap-5 border-t border-line py-4" data-reveal style={delay(i * 80)}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand text-[12px] font-medium text-brand-text">{i + 1}</span>
                <span className="font-display text-[22px] leading-none">{s}</span>
              </li>
            ))}
          </ol>
          <ul className="flex flex-wrap gap-2 border-t border-line pt-6" aria-label="Product tags">
            {VIVRA_TAGS.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/products#vivra" variant="brand" size="lg" className="rounded-full">
              Discover Vivra
            </Button>
          </div>
        </div>
      </div>

      <div className="container-v py-16 md:py-24">
        <div className="card grid grid-cols-1 overflow-hidden md:grid-cols-12" data-reveal>
          <div className="flex flex-col justify-between gap-10 p-6 md:col-span-6 md:p-10">
            <Label index="Next">Upcoming products</Label>
            <div>
              <h3 className="font-display t-title">And we&apos;re only getting started.</h3>
              <div className="t-body mt-5 flex max-w-[48ch] flex-col gap-3 text-[16px]">
                <p>Axeract is continuously exploring new ideas across AI, communication, productivity, lifestyle and human-centered technology.</p>
                <p>
                  Some products are being built. Others are still ideas. <span className="text-primary">That is exactly where the next chapter begins.</span>
                </p>
              </div>
              <div className="mt-8">
                <Button href="/products#future" variant="ink" size="lg" className="rounded-full">
                  Follow What We&apos;re Building
                </Button>
              </div>
            </div>
          </div>
          <div className="relative min-h-[300px] md:col-span-6">
            <Image src={IMG.prototypes.src} alt={IMG.prototypes.alt} fill sizes="(min-width:768px) 45vw, 92vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 05 — process: sticky heading + editorial rows */
export const PROCESS = [
  { n: "01", t: "Research", d: ["We start with the problem, not the technology.", "We explore what people actually need and where technology can create meaningful improvement."], img: IMG.research },
  { n: "02", t: "Design", d: ["We simplify the experience before adding complexity.", "Every interaction should have a reason to exist."], img: IMG.design },
  { n: "03", t: "Engineering", d: ["We build reliable systems capable of performing beyond the prototype."], img: IMG.datacenter },
  { n: "04", t: "Intelligence", d: ["Where AI adds genuine value, we make it part of the product rather than the marketing."], img: IMG.intelligence },
  { n: "05", t: "Product", d: ["The result should not feel like technology for technology's sake.", "It should simply feel useful."], img: IMG.product },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 rule-b py-16 md:py-28" aria-labelledby="process-heading">
      <div className="container-v grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Label index="05">The Axeract process</Label>
            <MaskedHeading as="h2" id="process-heading" lines={["From possibility", "to product."]} className="t-display mt-6" />
            <p className="t-lead mt-6 max-w-[30ch]" data-reveal>
              Five stages, one standard: the technology should serve the experience.
            </p>
          </div>
        </div>
        <ol className="lg:col-span-8">
          {PROCESS.map((r, i) => (
            <li key={r.n} className="grid grid-cols-1 gap-6 border-t border-line py-8 md:grid-cols-[4.5rem_1fr_220px] md:items-center md:gap-8 md:py-10" data-reveal style={delay(i * 70)}>
              <span className="font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none text-brand-text">{r.n}</span>
              <div>
                <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[1.05]">{r.t}</h3>
                <div className="t-body mt-3 flex max-w-[46ch] flex-col gap-2">
                  {r.d.map((p, j) => (
                    <p key={p} className={j === 0 ? "text-primary" : undefined}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] md:aspect-[4/3]">
                <Image src={r.img.src} alt={r.img.alt} fill sizes="(min-width:768px) 220px, 92vw" className="object-cover" />
              </div>
            </li>
          ))}
          <li className="border-t border-line" aria-hidden />
        </ol>
      </div>
    </section>
  );
}

/* 06 — principles */
export function Principles({
  index = "06",
  label = "Principles",
  lines = ["How we think."],
  items,
}: {
  index?: string;
  label?: string;
  lines?: React.ReactNode[];
  items: { t: string; d: string }[];
}) {
  return (
    <section className="rule-b bg-surface py-16 md:py-28" aria-labelledby="principles-heading">
      <div className="container-v">
        <Label index={index}>{label}</Label>
        <MaskedHeading as="h2" id="principles-heading" lines={lines} className="t-display mt-6" />
        <ol className="mt-12 grid grid-cols-1 border-t border-line sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {items.map((p, i) => (
            <li
              key={p.t}
              className={cn(
                "flex flex-col justify-between gap-6 border-b sm:min-h-[280px] sm:gap-10 border-line py-8 sm:px-6 lg:border-b-0 lg:py-10",
                i % 2 === 1 && "sm:border-l",
                i > 0 && "lg:border-l",
                "sm:first:pl-0 lg:[&:nth-child(3)]:pl-6",
              )}
              data-reveal
              style={delay(i * 90)}
            >
              <span className="flex items-center justify-between">
                <span className="t-mono font-display text-[15px] text-brand-text">{String(i + 1).padStart(2, "0")}</span>
                <span className="tri !h-[10px] !w-[12px]" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.5rem,2vw,1.9rem)] leading-[1.05]">{p.t}</h3>
                <p className="t-body mt-3 max-w-[32ch]">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 07 — about preview */
export function AboutPreview() {
  return (
    <section className="tone-soft rule-b" aria-labelledby="about-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-[var(--gutter)] py-16 lg:order-1 lg:py-24 lg:pl-[max(var(--gutter),calc((100vw-1440px)/2+4rem))] lg:pr-20">
          <Label index="07">About Axeract</Label>
          <MaskedHeading as="h2" id="about-heading" lines={["Building technology", "around real", "human needs."]} className="t-display mt-6" />
          <div className="t-body mt-8 flex max-w-[52ch] flex-col gap-4 text-[16px]" data-reveal>
            <p className="text-primary">Axeract Technology Ltd is a technology company focused on designing, developing and operating digital products.</p>
            <p>We explore emerging technologies, identify meaningful use cases and transform them into experiences designed for real people.</p>
            <p>Our work spans artificial intelligence, mobile software, real-time systems and new categories that continue to emerge.</p>
            <p>We are building for today while staying curious about what comes next.</p>
          </div>
          <div className="mt-10" data-reveal style={delay(120)}>
            <Button href="/about" variant="ink" size="lg" className="rounded-full">
              About Axeract
            </Button>
          </div>
        </div>
        <div className="relative order-1 min-h-[380px] lg:order-2 lg:min-h-[760px]">
          <Image src={IMG.aboutTeam.src} alt={IMG.aboutTeam.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* 08 — technology: staggered chip wall */
export const TECH: { k: TechKey; name: string }[] = [
  { k: "ai", name: "Artificial Intelligence" },
  { k: "rtc", name: "Real-Time Communication" },
  { k: "speech", name: "Speech & Language Technology" },
  { k: "cloud", name: "Cloud Infrastructure" },
  { k: "mobile", name: "Mobile Engineering" },
  { k: "automation", name: "Automation" },
  { k: "data", name: "Data Systems" },
];

export function ChipWall({ items, label }: { items: { k: TechKey; name: string }[]; label: string }) {
  const rows = [items.slice(0, 2), items.slice(2, 4), items.slice(4, 6), items.slice(6)].filter((r) => r.length);
  // staggered rows on wider screens; a plain centred wrap on phones so no chip is cut by the edge fade
  const shift = ["md:-translate-x-6", "md:translate-x-8", "md:-translate-x-2", "md:translate-x-10"];
  return (
    <div className="chip-wall relative py-2 md:overflow-hidden" role="list" aria-label={label}>
      <div className="flex flex-wrap justify-center gap-3 md:flex-col md:flex-nowrap md:gap-4">
        {rows.map((row, r) => (
          <div key={r} className={cn("contents md:flex md:justify-center md:gap-4", shift[r])}>
            {row.map(({ k, name }) => (
              <span
                key={name}
                role="listitem"
                className="flex shrink-0 items-center gap-3 rounded-[12px] border border-line bg-background px-3.5 py-2.5 shadow-[0_10px_26px_-18px_rgba(11,11,12,0.35)]"
                data-reveal
              >
                <span className="grid h-8 w-8 place-items-center rounded-[8px] bg-brand-soft text-brand-text">
                  <TechIcon k={k} />
                </span>
                <span className="whitespace-nowrap text-[15px] text-primary">{name}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Technology() {
  return (
    <section id="technology" className="scroll-mt-20 rule-b bg-surface py-16 md:py-28" aria-labelledby="technology-heading">
      <div className="container-v grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Label index="08">Technology</Label>
          <h2 id="technology-heading" className="font-display mt-6 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.02] tracking-[-0.04em] [text-wrap:balance]">
            Modern technology. <span className="text-brand-text">Purposefully applied.</span>
          </h2>
          <div className="t-lead mt-6 flex max-w-[44ch] flex-col gap-3" data-reveal>
            <p>We do not use technology simply because it is new.</p>
            <p>We use it when it can make a product faster, smarter, easier or more useful.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="t-label mb-6 text-center">Our products may combine technologies such as</p>
          <ChipWall items={TECH} label="Technologies" />
        </div>

        <div className="grid grid-cols-1 gap-6 border-t border-line pt-10 md:grid-cols-12 lg:col-span-12 lg:mt-6">
          <p className="t-lead md:col-span-5" data-reveal>
            The technology changes.
            <br />
            The objective stays the same:
          </p>
          <p className="font-display text-[clamp(2.25rem,5vw,4.75rem)] font-light leading-[1] tracking-[-0.04em] md:col-span-7" data-reveal style={delay(120)}>
            Build a better <span className="text-brand-text">experience.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
