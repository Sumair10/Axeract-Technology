import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage, LegalSection } from "@/components/legal/Legal";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Axeract Technology Ltd collects, uses and protects personal information submitted through axeract.ai.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Privacy"
      title="Privacy Policy"
      intro={`This policy explains how ${SITE.legalName} ("Axeract", "we") handles personal information collected through axeract.ai. Individual Axeract products, such as Vivra, publish their own privacy notices.`}
    >
      <LegalSection n={1} title="What we collect">
        <p>
          <strong>Contact form.</strong> When you use the contact form we collect the details you provide: your name, email address, company (optional),
          reason for contact and message.
        </p>
        <p>
          <strong>Technical data.</strong> Our hosting provider records standard server logs, such as IP address, browser type and pages requested, for
          security and reliability.
        </p>
        <p>
          <strong>Analytics.</strong> Only if you accept analytics cookies (see below), we collect anonymised usage data such as pages visited, approximate
          location (country or city) and device type.
        </p>
      </LegalSection>
      <LegalSection n={2} title="How we use it">
        <ul>
          <li>To reply to your enquiry and keep a record of the conversation.</li>
          <li>To keep the website secure and working properly.</li>
          <li>With your consent, to understand how the website is used so we can improve it.</li>
        </ul>
        <p>We do not sell personal information, and we do not use it for advertising.</p>
      </LegalSection>
      <LegalSection n={3} title="Cookies" id="cookies">
        <p>
          The website works without cookies. We only use analytics cookies (Google Analytics) if you choose <strong>Accept</strong> in the cookie banner. If
          you decline, no analytics cookies are set.
        </p>
        <p>
          We store your choice in your browser&apos;s local storage so we don&apos;t ask again. You can change it at any time using{" "}
          <strong>Cookie settings</strong> in the footer, or by clearing this site&apos;s data in your browser. We also remember your light or dark theme
          preference the same way; this is not used for tracking.
        </p>
      </LegalSection>
      <LegalSection n={4} title="Who processes your data">
        <p>We use a small number of trusted service providers to run the website:</p>
        <ul>
          <li>
            <strong>Netlify</strong>: website hosting and contact form processing.
          </li>
          <li>
            <strong>Microsoft 365</strong>: our email, where contact form messages are delivered.
          </li>
          <li>
            <strong>Google Analytics</strong>: website analytics, only with your consent.
          </li>
        </ul>
        <p>These providers may process data outside your country, under their own safeguards for international transfers.</p>
      </LegalSection>
      <LegalSection n={5} title="Links to other sites">
        <p>
          Our website links to our social media profiles and product websites. Those sites have their own privacy policies, which apply when you visit
          them.
        </p>
      </LegalSection>
      <LegalSection n={6} title="Retention">
        <p>We keep enquiries for as long as needed to respond and follow up, then delete them unless we have an ongoing relationship with you.</p>
      </LegalSection>
      <LegalSection n={7} title="Your rights">
        <p>
          You can ask us to access, correct or delete the personal information we hold about you, or object to how we use it. Email{" "}
          <a href="mailto:privacy@axeract.ai">privacy@axeract.ai</a> and we will respond as soon as possible.
        </p>
      </LegalSection>
      <LegalSection n={8} title="Changes">
        <p>We may update this policy from time to time. The date at the top of this page shows when it last changed.</p>
      </LegalSection>
    </LegalPage>
  );
}
