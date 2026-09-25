import { Label } from "@/components/typography/Label";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-[72px] md:pt-[100px]">
      <div className="container-v">
        <div className="grid grid-cols-4 rule-t md:grid-cols-12">
          <div className="col-span-4 py-12 md:col-span-3 md:py-20">
            <Label index="Legal" />
          </div>
          <article className="col-span-4 py-12 md:col-span-7 md:col-start-5 md:py-20">{children}</article>
        </div>
      </div>
    </section>
  );
}
