import { HomeHero, Intro, WhatWeBuild, Products, Process, Principles, AboutPreview, Technology } from "@/components/home/HomeSections";
import { BrandMarquee, PhotoBand } from "@/components/sections/Shared";
import { IMG } from "@/lib/constants/images";
import { SITE } from "@/lib/constants/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: "Axeract",
  url: SITE.url,
  logo: `${SITE.url}/brand/axeract-logo.png`,
  slogan: SITE.tagline,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />
      <Intro />
      <BrandMarquee />
      <WhatWeBuild />
      <Products />
      <Process />
      <Principles
        items={[
          { t: "Useful before impressive.", d: "Technology only matters when it improves the experience." },
          { t: "Complex underneath. Simple outside.", d: "The hardest engineering should create the easiest interaction." },
          { t: "Built to evolve.", d: "Products should be ready to change as technology and people change." },
          { t: "Details compound.", d: "Great products are rarely defined by one big idea. They are shaped by hundreds of small decisions made well." },
        ]}
      />
      <AboutPreview />
      <Technology />
      <PhotoBand
        img={IMG.building}
        label="What comes next"
        lines={["The next product", "starts as a possibility."]}
        copy="Axeract is building a growing portfolio of technology products designed for the way people live, communicate and work."
        actions={[
          { label: "Explore Products", href: "/products", variant: "white" },
          { label: "Contact Axeract", href: "/contact", variant: "outline" },
        ]}
      />
    </>
  );
}
