import type { Metadata } from "next";

import { site } from "@/content/site";

/**
 * Build page metadata: title, description, canonical, Open Graph and Twitter
 * cards in one call, so no page can forget half of them.
 *
 * The OG image is generated at /opengraph-image (see src/app/opengraph-image.tsx)
 * and inherited by every route, so pages only override it deliberately.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  type = "website",
  publishedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
