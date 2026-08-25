import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";

import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    // Every page appends the brand, so tabs and search results stay attributable.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#b9481d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`}>
      <head>
        {/*
          Marks that scroll-reveal can run, before first paint. The reveal
          styles hang off `html.js`, so a visitor without JavaScript — or
          without IntersectionObserver — sees the content immediately instead
          of a page of invisible sections.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('IntersectionObserver' in window)document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-carbon-600 focus:px-4 focus:py-2.5 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />

        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
