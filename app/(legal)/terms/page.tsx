import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage, LegalSection } from "@/components/legal/Legal";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = pageMeta({
  title: "Terms & Conditions",
  description: "The terms that apply to your use of axeract.ai, the website of Axeract Technology Ltd.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      label="Terms"
      title="Terms & Conditions"
      intro={`These terms apply to your use of this website, operated by ${SITE.legalName}. Individual Axeract products have their own terms of service.`}
    >
      <LegalSection n={1} title="Use of this website">
        <p>You may browse and share this website for personal and business information purposes. Please do not misuse it or attempt to disrupt it.</p>
      </LegalSection>
      <LegalSection n={2} title="Content">
        <p>
          All content on this website, including text, graphics and the Axeract name and logo, belongs to {SITE.legalName} unless stated otherwise, and may not be
          reproduced without permission.
        </p>
      </LegalSection>
      <LegalSection n={3} title="No warranty">
        <p>The information on this website is provided for general information. Product details may change as our products evolve.</p>
      </LegalSection>
      <LegalSection n={4} title="Links">
        <p>This website links to product websites and third-party sites. We are not responsible for the content of third-party sites.</p>
      </LegalSection>
      <LegalSection n={5} title="Changes">
        <p>We may update these terms from time to time. The date at the top of this page shows when they last changed.</p>
      </LegalSection>
      <LegalSection n={6} title="Contact">
        <p>
          Questions about these terms can be sent to <a href="mailto:legal@axeract.ai">legal@axeract.ai</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
