import { Button, Arrow } from "@/components/ui/Button";
import { TransitionLink } from "@/components/animation/TransitionLink";
import { Label, MaskedHeading } from "@/components/typography/Label";

const LINKS = [
  { label: "Products", href: "/products", text: "Vivra and what we're building next." },
  { label: "About", href: "/about", text: "Why Axeract exists and how we work." },
  { label: "Contact", href: "/contact", text: "Ask us anything, we'll reply." },
];

export default function NotFound() {
  return (
    <section className="pt-[72px] md:pt-[100px]">
      <div className="container-v grid grid-cols-4 rule-t md:grid-cols-12">
        <div className="col-span-4 py-20 md:col-span-7 md:py-32">
          <Label index="404" brand>
            Not found
          </Label>
          <MaskedHeading as="h1" lines={["This page", "isn't here yet."]} className="t-hero mt-8" />
          <p className="t-lead mt-8 max-w-[40ch]">The link may be old or mistyped. Here are the places people usually look for.</p>
          <div className="mt-10">
            <Button href="/" size="lg" className="rounded-full">
              Back to Axeract
            </Button>
          </div>
        </div>
        <ul className="col-span-4 self-end pb-20 md:col-span-4 md:col-start-9 md:pb-32">
          {LINKS.map((l) => (
            <li key={l.href}>
              <TransitionLink href={l.href} className="group flex items-start justify-between gap-6 border-t border-line py-5">
                <span>
                  <span className="font-display block text-[26px] leading-none">{l.label}</span>
                  <span className="t-body mt-2 block">{l.text}</span>
                </span>
                <Arrow className="mt-2 h-3.5 w-3.5 text-tertiary transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
