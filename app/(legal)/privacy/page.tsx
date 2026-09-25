import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/Legal";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Privacy"
      title="Privacy Policy"
      intro={`This policy explains how ${SITE.legalName} ("Axeract", "we") handles personal information collected through this website. Individual Axeract products publish their own privacy notices.`}
    >
      <LegalSection n={1} title="What we collect">
        <p>When you use the contact form we collect the details you provide: your name, email address, company (optional), reason for contact and message.</p>
        <p>Our hosting provider may record standard technical data such as IP address, browser type and pages requested, for security and reliability.</p>
      </LegalSection>
      <LegalSection n={2} title="How we use it">
        <p>We use contact details only to respond to your enquiry and to keep a record of the conversation. We do not sell personal information.</p>
      </LegalSection>
      <LegalSection n={3} title="Retention">
        <p>We keep enquiries for as long as needed to respond and follow up, then delete them unless we have an ongoing relationship with you.</p>
      </LegalSection>
      <LegalSection n={4} title="Your rights">
        <p>You can ask us to access, correct or delete the personal information we hold about you by contacting us through the contact page.</p>
      </LegalSection>
      <LegalSection n={5} title="Changes">
        <p>We may update this policy from time to time. The date at the top of this page shows when it last changed.</p>
      </LegalSection>
    </LegalPage>
  );
}
