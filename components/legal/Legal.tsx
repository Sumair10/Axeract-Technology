import { Label } from "@/components/typography/Label";

export const LEGAL_UPDATED = "26 September 2026";

export function LegalPage({ label, title, intro, children }: { label: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <>
      <Label index={label} />
      <h1 className="font-display t-title mt-6">{title}</h1>
      <p className="t-body mt-3">Last updated {LEGAL_UPDATED}</p>
      <p className="t-lead mt-8 max-w-[60ch]">{intro}</p>
      <div className="mt-12 flex flex-col gap-10">{children}</div>
    </>
  );
}

export function LegalSection({ n, title, id, children }: { n: number; title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-6" aria-labelledby={`s${n}`}>
      <h2 id={`s${n}`} className="font-display text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.1]">
        <span className="t-mono mr-3 text-[13px] text-brand-text">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-4 flex max-w-[64ch] flex-col gap-3 text-[15px] leading-relaxed text-secondary [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-primary [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-tertiary">
        {children}
      </div>
    </section>
  );
}
