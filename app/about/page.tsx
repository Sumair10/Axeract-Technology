import type { Metadata } from "next";
import Image from "next/image";
import { Label, MaskedHeading } from "@/components/typography/Label";
import { Button } from "@/components/ui/Button";
import { PageHero, PhotoBand } from "@/components/sections/Shared";
import { Principles } from "@/components/home/HomeSections";
import { IMG } from "@/lib/constants/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Axeract Technology Ltd is a product-focused technology company creating digital experiences across artificial intelligence, mobile software and emerging technologies.",
  alternates: { canonical: "/about" },
};

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Axeract"
        lines={["We build technology", "people can actually use."]}
        img={IMG.aboutTeam}
        position="50% 40%"
        copy={
          <>
            <p>
              Axeract Technology Ltd is a product-focused technology company creating digital experiences across artificial intelligence, mobile software and
              emerging technologies.
            </p>
            <p className="t-body mt-3">We believe innovation becomes meaningful only when it solves a real problem.</p>
          </>
        }
      >
        <Button href="/products" variant="brand" size="lg" className="rounded-full">
          Explore Our Products
        </Button>
      </PageHero>

      {/* why axeract exists */}
      <section className="rule-b py-16 md:py-28" aria-labelledby="why-heading">
        <div className="container-v grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Label index="01">Why Axeract exists</Label>
              <MaskedHeading
                as="h2"
                id="why-heading"
                lines={["There is no shortage", "of technology."]}
                className="t-title mt-6"
              />
              <p className="font-display t-title mt-4 text-brand-text" data-reveal>
                There is a shortage of technology that feels simple.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:col-span-6 lg:col-start-7">
            {[
              "New technologies appear every day.",
              "AI becomes more capable. Devices become more connected. Software becomes more powerful.",
              "But more capability does not automatically create a better product.",
            ].map((t, i) => (
              <p key={t} className="font-display border-t border-line py-7 text-[clamp(1.35rem,2vw,1.85rem)] font-light leading-[1.2] tracking-[-0.02em]" data-reveal style={delay(i * 80)}>
                {t}
              </p>
            ))}
            <div className="border-t border-line pt-8" data-reveal>
              <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.1]">
                Axeract exists to bridge <span className="text-brand-text">that gap.</span>
              </p>
              <p className="t-body mt-4 max-w-[48ch] text-[16px]">
                We take emerging technologies and turn them into experiences that are understandable, practical and useful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* what we are building */}
      <section className="tone-soft rule-b" aria-labelledby="portfolio-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:min-h-[720px]">
            <Image src={IMG.prototypes.src} alt={IMG.prototypes.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center px-[var(--gutter)] py-16 lg:py-24 lg:pl-24 lg:pr-[max(var(--gutter),calc((100vw-1440px)/2+4rem))]">
            <Label index="02">What we are building</Label>
            <MaskedHeading as="h2" id="portfolio-heading" lines={["A portfolio,", "not a single product."]} className="t-display mt-6" />
            <p className="t-lead mt-6 max-w-[40ch]" data-reveal>
              Axeract is designed as a home for multiple technology products.
            </p>
            <ol className="mt-8 flex flex-col">
              {[
                "Some may improve how people communicate.",
                "Some may make everyday tasks easier.",
                "Others may explore entirely new interactions made possible by artificial intelligence.",
              ].map((s, i) => (
                <li key={s} className="flex items-start gap-5 border-t border-line py-5" data-reveal style={delay(i * 80)}>
                  <span className="tri mt-1.5 shrink-0 !h-[10px] !w-[12px]" aria-hidden />
                  <span className="t-body text-[16px] !text-primary">{s}</span>
                </li>
              ))}
            </ol>
            <div className="border-t border-line pt-6" data-reveal>
              <p className="t-body">Each product can be different. But they share one philosophy:</p>
              <p className="font-display mt-4 text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.12]">
                Technology should make the experience simpler, not become the experience itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* approach */}
      <section className="rule-b py-16 md:py-28" aria-labelledby="approach-heading">
        <div className="container-v grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Label index="03">Our approach</Label>
            <MaskedHeading as="h2" id="approach-heading" lines={["Product first.", <span key="t" className="text-brand-text">Technology second.</span>]} className="t-hero mt-6" />
          </div>
          <div className="flex flex-col gap-0 lg:col-span-4 lg:col-start-9">
            {["We begin by asking what should be easier.", "Then we decide what technology can make that possible.", "This keeps our products focused on outcomes instead of trends."].map(
              (t, i) => (
                <p key={t} className="t-lead border-t border-line py-5" data-reveal style={delay(i * 90)}>
                  <span className="t-mono mr-3 text-[13px] text-brand-text">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      <Principles
        index="04"
        label="Our principles"
        lines={["What guides", "every product."]}
        items={[
          { t: "Useful Before Impressive", d: "A product should solve something before it tries to impress anyone." },
          { t: "Simplicity Is Engineered", d: "Simple experiences often require sophisticated systems underneath." },
          { t: "Stay Adaptable", d: "The technology landscape changes quickly. Our products are built with change in mind." },
          { t: "Keep Exploring", d: "Some of the most useful products begin as experiments." },
        ]}
      />

      <PhotoBand
        img={IMG.heroPrism}
        label="The beginning"
        lines={["Axeract is still", "at the beginning."]}
        copy="We are building, testing and launching products while continuously exploring what should come next."
        actions={[{ label: "Explore Our Products", href: "/products", variant: "white" }]}
      />
    </>
  );
}
