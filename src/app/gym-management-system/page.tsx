import { notFound } from "next/navigation";

import { ProductPage } from "@/components/product-page";
import { getProduct } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

const product = getProduct("gym-management-system");

export const metadata = product
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
  if (!product) notFound();
  return <ProductPage product={product} />;
}
