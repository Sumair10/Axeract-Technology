import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { BOOT_SCRIPT } from "@/lib/brand";
import { SITE } from "@/lib/constants/site";
import { Providers } from "@/components/layout/Providers";
import { Nav } from "@/components/navigation/Nav";
import { Footer } from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap", weight: ["300", "400", "500"] });

const TITLE = "Axeract | We build what comes next";
const DESCRIPTION =
  "Axeract Technology Ltd creates intelligent digital products that turn emerging technology into simple, useful experiences for everyday life.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s | Axeract" },
  description: DESCRIPTION,
  applicationName: "Axeract",
  openGraph: {
    type: "website",
    siteName: "Axeract",
    locale: "en_GB",
    url: SITE.url,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og/axeract.png", width: 1200, height: 630, alt: "Axeract Technology" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og/axeract.png"] },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${interTight.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
