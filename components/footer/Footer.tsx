import { TransitionLink } from "@/components/animation/TransitionLink";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { Arrow } from "@/components/ui/Button";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { CookieSettingsLink } from "@/components/consent/CookieConsent";
import { FOOTER_LINKS, SITE } from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="on-ink relative overflow-hidden bg-ink">
      <div className="container-v">
        <div className="grid grid-cols-4 gap-y-12 border-b border-line py-16 md:grid-cols-12 md:py-24">
          <div className="col-span-4 md:col-span-6">
            <BrandLogo onInk height={40} />
            <p className="font-display mt-10 max-w-[14ch] text-[clamp(2rem,3.6vw,3.5rem)] font-light text-white">{SITE.tagline}</p>
            <span className="t-label mt-6 block">{SITE.legalName}</span>
            <a href="mailto:info@axeract.ai" className="mt-6 inline-block text-[15px] text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline">
              info@axeract.ai
            </a>
            <SocialLinks className="mt-6" itemClassName="!text-white/85 hover:!text-white" />
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <span className="t-label">Navigation</span>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <TransitionLink href={l.href} className="group inline-flex items-center gap-2 text-[15px] text-white/85 transition-colors hover:text-white">
                    {l.label}
                    <Arrow className="h-2.5 w-2.5 text-tertiary transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-[12px] text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* rendered at build time; every deploy refreshes it */}
            <span>
              © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
            </span>
            <CookieSettingsLink />
          </span>
          <span className="t-label">We build what comes next.</span>
        </div>
      </div>

      {/* giant wordmark, cut by the bottom edge like a printed page */}
      <div aria-hidden className="pointer-events-none relative h-[17vw] max-h-[250px] min-h-[80px] select-none overflow-hidden">
        {[
          { color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.14)" },
          {
            backgroundImage: "linear-gradient(180deg, var(--brand-accent) 0%, transparent 78%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            opacity: 0.5,
          },
        ].map((style, i) => (
          <span
            key={i}
            className="font-display absolute left-1/2 top-[8%] -translate-x-1/2 whitespace-nowrap text-[21vw] font-medium leading-none tracking-[-0.06em]"
            style={style as React.CSSProperties}
          >
            AXERACT
          </span>
        ))}
      </div>
    </footer>
  );
}
