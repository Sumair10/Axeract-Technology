import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Axeract Technology",
    short_name: "Axeract",
    description: "We build what comes next.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f6f4",
    theme_color: "#111111",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
