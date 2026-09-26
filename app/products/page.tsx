import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { Label, MaskedHeading } from "@/components/typography/Label";
import { Button } from "@/components/ui/Button";
import { Chip, PageHero, PhotoBand } from "@/components/sections/Shared";
import { ChipWall, VIVRA_TAGS } from "@/components/home/HomeSections";
import { TranslatorPhone } from "@/components/products/TranslatorPhone";
import { IMG } from "@/lib/constants/images";
import { VIVRA_URL } from "@/lib/constants/site";

export const metadata: Metadata = pageMeta({
  title: "Products",
  description:
    "Axeract's portfolio brings together artificial intelligence, modern software engineering and thoughtful product design, starting with Vivra, AI-powered real-time translation.",
  path: "/products",
  image: "/og/products.png",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Axeract Products"
        lines={["Products designed around", "possibilities technology", "created only recently."]}
        img={IMG.heroChip}
        copy={
          <>
            <p>Our portfolio brings together artificial intelligence, modern software engineering and thoughtful product design.</p>
            <p className="t-body mt-3">Different products. Different audiences. One philosophy for how technology should feel.</p>
          </>
        }
      >
        <Button href="#vivra" variant="brand" size="lg" className="rounded-full">
          Meet Vivra
        </Button>
      </PageHero>

      {/* vivra */}
      <section id="vivra" className="scroll-mt-20 rule-b py-16 md:py-28" aria-labelledby="vivra-heading">
        <div className="container-v">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Label index="01" brand>
                Vivra
              </Label>
              <MaskedHeading as="h2" id="vivra-heading" lines={["Conversation without", "language barriers."]} className="t-display mt-6" />
            </div>
            <ul className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end" aria-label="Product tags" data-reveal>
              {VIVRA_TAGS.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 lg:grid-cols-12">
            <div className="relative isolate flex min-h-[520px] items-end justify-end overflow-hidden rounded-[20px] p-6 lg:col-span-7" data-reveal>
              <Image src={IMG.vivraCafe.src} alt={IMG.vivraCafe.alt} fill sizes="(min-width:1024px) 55vw, 92vw" className="-z-10 object-cover" />
              <span aria-hidden className="absolute inset-0 -z-[5] bg-gradient-to-t from-[#071a1e]/55 via-transparent to-transparent" />
              <TranslatorPhone />
            </div>
            <div className="card flex flex-col justify-between gap-10 p-6 md:p-10 lg:col-span-5" data-reveal style={delay(100)}>
              <span className="t-label">Product / 01</span>
              <div className="flex flex-col gap-4">
                <p className="font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.12]">
                  Vivra is an AI-powered translation product designed for natural two-way communication.
                </p>
                <p className="t-body text-[16px]">Speak in your language and let the technology handle what happens between.</p>
                <p className="t-body text-[16px]">
                  Vivra combines speech recognition, intelligent translation and voice technology to create conversations that feel faster and more natural.
                </p>
              </div>
              <ul className="grid grid-cols-3 border-t border-line pt-6 text-center">
                {["Speech recognition", "Intelligent translation", "Voice technology"].map((t, i) => (
                  <li key={t} className={i > 0 ? "border-l border-line px-2" : "px-2"}>
                    <span className="t-mono block text-[13px] text-brand-text">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-2 block text-[13px] leading-snug text-primary">{t}</span>
                  </li>
                ))}
              </ul>
              <div>
                <Button href={VIVRA_URL} variant="brand" size="lg" className="rounded-full" aria-label="Visit Vivra (opens the Vivra website)">
                  Visit Vivra
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* future */}
      <section id="future" className="tone-soft scroll-mt-20 rule-b py-16 md:py-28" aria-labelledby="future-heading">
        <div className="container-v grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Label index="02">Future products</Label>
            <MaskedHeading as="h2" id="future-heading" lines={["More is", "being built."]} className="t-display mt-6" />
            <p className="t-lead mt-6 max-w-[40ch]" data-reveal>
              New products will appear here as they move from idea to reality.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="t-label mb-6 text-center">Axeract is exploring products across</p>
            <ChipWall
              label="Areas Axeract is exploring"
              items={[
                { k: "ai", name: "Artificial Intelligence" },
                { k: "comms", name: "Communication" },
                { k: "faith", name: "Faith & Lifestyle" },
                { k: "productivity", name: "Productivity" },
                { k: "utilities", name: "Everyday Utilities" },
                { k: "mobile", name: "Mobile Experiences" },
              ]}
            />
          </div>
        </div>
      </section>

      <PhotoBand
        img={IMG.building}
        label="What comes next"
        lines={["The next product", "starts as a possibility."]}
        copy="Have an idea, a partnership or a question about what we're building? We'd like to hear it."
        actions={[{ label: "Contact Axeract", href: "/contact", variant: "white" }]}
      />
    </>
  );
}
