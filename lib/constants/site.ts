export const SITE = {
  name: "Axeract",
  url: "https://axeract.ai",
  legalName: "AXERACT TECHNOLOGY LTD",
  tagline: "Technology, made tangible.",
};

export const VIVRA_URL = "https://vivra-technology.netlify.app";

export const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/#technology" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/** Short brand lines for marquees, loading states and visual moments. */
export const BRAND_LINES = [
  "Technology, made tangible.",
  "We build what comes next.",
  "From possibility to product.",
  "Complex technology. Simple experiences.",
  "Built around what technology makes possible.",
  "Ideas become systems. Systems become products.",
  "Intelligence behind simpler experiences.",
  "Designed for what comes next.",
];

export const CONTACT_REASONS = ["Product Enquiry", "Partnership", "Business", "Press", "Careers", "Other"] as const;
