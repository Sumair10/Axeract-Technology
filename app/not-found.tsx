import { Button } from "@/components/ui/Button";
import { Label, MaskedHeading } from "@/components/typography/Label";

export default function NotFound() {
  return (
    <section className="pt-[72px] md:pt-[100px]">
      <div className="container-v grid grid-cols-4 rule-t md:grid-cols-12">
        <div className="col-span-4 py-24 md:col-span-8 md:py-40">
          <Label index="404" brand>
            Not found
          </Label>
          <MaskedHeading as="h1" lines={["This page", "isn't here yet."]} className="t-hero mt-8" />
          <div className="mt-10">
            <Button href="/" size="lg" className="rounded-full">
              Back to Axeract
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
