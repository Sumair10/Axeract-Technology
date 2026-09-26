import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants/site";

// fixed date so the sitemap doesn't claim every page changed on every deploy; bump when content changes
const UPDATED = new Date("2026-09-26");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly") => ({ url: `${SITE.url}${path}`, lastModified: UPDATED, changeFrequency, priority });
  return [
    page("/", 1, "monthly"),
    page("/products", 0.9, "monthly"),
    page("/about", 0.7, "yearly"),
    page("/contact", 0.7, "yearly"),
    page("/privacy", 0.3, "yearly"),
    page("/terms", 0.3, "yearly"),
  ];
}
