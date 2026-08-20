import type { MetadataRoute } from "next";

import { products } from "@/content/products";
import { site } from "@/content/site";

/**
 * Generated sitemap at /sitemap.xml. Product routes come from content, so
 * adding a system lists it automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, site.url).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/pricing"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: url(`/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
