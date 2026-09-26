import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";

/**
 * Per-page metadata. Next.js replaces (not merges) the root openGraph/twitter objects,
 * so each page must restate them or it inherits the homepage's title, URL and image.
 */
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const full = `${title} | Axeract`;
  const og = image ?? "/og/axeract.png";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Axeract",
      locale: "en_GB",
      url: `${SITE.url}${path}`,
      title: full,
      description,
      images: [{ url: og, width: 1200, height: 630, alt: full }],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [og] },
  };
}
