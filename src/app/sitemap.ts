import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { posts } from "@/content/posts";
import { site } from "@/content/site";

/**
 * Generated sitemap at /sitemap.xml. Every route is derived from content, so
 * adding an industry or a post lists it automatically — nothing to remember.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, site.url).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/industries"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/pricing"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: url("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: url(`/industries/${industry.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: url(`/work/${study.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...industryRoutes, ...workRoutes, ...postRoutes];
}
