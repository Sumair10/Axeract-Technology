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

export const SOCIAL = [
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/145252968/" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/axeract.ai/" },
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594499683436" },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@axeract" },
  { key: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@axeract.technology" },
  { key: "github", label: "GitHub", href: "https://github.com/Axeract-Technology-Ltd" },
] as const;
