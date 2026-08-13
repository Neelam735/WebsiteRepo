import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/**
 * Generated /robots.txt.
 *
 * Preview deployments set NEXT_PUBLIC_NOINDEX=true so staging copies never
 * compete with production in search results.
 */
export default function robots(): MetadataRoute.Robots {
  const blockAll = process.env.NEXT_PUBLIC_NOINDEX === "true";

  if (blockAll) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing useful to crawl in the API surface.
        disallow: ["/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
