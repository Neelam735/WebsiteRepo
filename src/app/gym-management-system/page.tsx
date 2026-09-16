import { notFound } from "next/navigation";

import { ProductPage } from "@/components/product-page";
import { getProduct } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

const product = getProduct("gym-management-system");

// GYM-PAUSED: unpublished products emit no metadata and their route 404s,
// so the page stops being indexed rather than lingering as a thin page for a
// system we are not selling. Flip `published` back and this returns.
export const metadata =
  product?.published
  ? buildMetadata({
      title: product.seo.title,
      description: product.seo.description,
      path: `/${product.slug}`,
      keywords: [
        "gym management system",
        "gym management software",
        "gym membership software",
        "class booking software",
        "fitness studio management software",
        "gym check-in system",
      ],
    })
  : {};

export default function GymSystemPage() {
  if (!product?.published) notFound();
  return <ProductPage product={product} />;
}
