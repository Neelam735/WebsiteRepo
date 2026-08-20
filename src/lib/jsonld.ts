import { hasAddress, hasEmail, hasPhone, hasSocial, site } from "@/content/site";
import type { Product } from "@/content/products";

/**
 * Structured data (schema.org).
 *
 * Fields are omitted when the underlying detail isn't configured — an empty
 * telephone or a blank address in structured data is worse than none, because
 * search engines treat it as a fact about the business.
 */

export function organizationJsonLd() {
  const socials = Object.values(site.social).filter((url) => url.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    ...(hasEmail ? { email: site.contact.email } : {}),
    ...(hasPhone ? { telephone: site.contact.phoneE164 } : {}),
    ...(hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.contact.address.street,
            addressLocality: site.contact.address.city,
            addressRegion: site.contact.address.region,
            postalCode: site.contact.address.postalCode,
            addressCountry: site.contact.address.country,
          },
        }
      : {}),
    ...(hasSocial ? { sameAs: socials } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/**
 * One of our systems, as a software product.
 *
 * No `offers` block: we don't publish prices, and inventing one here to win a
 * rich result would be a claim we can't stand behind.
 */
export function softwareJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    description: product.seo.description,
    url: `${site.url}/${product.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    featureList: product.modules.map((module) => module.name),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, site.url).toString(),
    })),
  };
}
