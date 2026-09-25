import type { Metadata } from "next";
import Image from "next/image";
import { Label, MaskedHeading } from "@/components/typography/Label";
import { ContactForm } from "@/components/forms/ContactForm";
import { IMG } from "@/lib/constants/images";
import { CONTACT_REASONS } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "For product enquiries, partnerships, business opportunities, press or general questions, get in touch with Axeract.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="panel-bg pb-6 pt-[80px] md:pb-10 md:pt-[96px]" aria-labelledby="hero-heading">
      <div className="container-v">
        <div className="grid grid-cols-1 gap-2 md:gap-3 lg:grid-cols-12">
          {/* photo + headline */}
          <div className="relative isolate flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[24px] p-6 text-white md:p-10 lg:col-span-5 lg:min-h-[760px]">
            <Image src={IMG.contact.src} alt={IMG.contact.alt} fill priority sizes="(min-width:1024px) 40vw, 96vw" className="-z-10 object-cover" />
            <span aria-hidden className="absolute inset-0 -z-[5] bg-gradient-to-b from-black/55 via-black/10 to-black/55" />
            <Label brand className="[&_span]:!text-white/80">
              Contact Axeract
            </Label>
            <div>
              <MaskedHeading
                as="h1"
                id="hero-heading"
                lines={["Start a", "conversation."]}
                className="text-[clamp(2.75rem,5.6vw,5.5rem)] font-light leading-[1.02] tracking-[-0.04em] text-white"
              />
              <p className="mt-6 max-w-[40ch] text-[15px] leading-snug text-white/85" data-reveal>
                For product enquiries, partnerships, business opportunities, press or general questions, get in touch with Axeract.
              </p>
            </div>
          </div>

          {/* form */}
          <div className="rounded-[24px] bg-surface p-6 shadow-[0_30px_60px_-40px_var(--brand-shadow)] md:p-10 lg:col-span-7">
            <div className="flex items-center justify-between">
              <span className="t-label">Send a message</span>
              <span className="tri !h-[10px] !w-[12px]" aria-hidden />
            </div>
            <div className="mt-10">
              <ContactForm reasons={[...CONTACT_REASONS]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
