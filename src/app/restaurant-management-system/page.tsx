import { notFound } from "next/navigation";

import { ProductPage } from "@/components/product-page";
import { getProduct } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

const product = getProduct("restaurant-management-system");

export const metadata = product
  ? buildMetadata({
      title: product.seo.title,
      description: product.seo.description,
      path: `/${product.slug}`,
      keywords: [
        "restaurant management system",
        "online ordering system for restaurants",
        "restaurant POS integration",
        "table reservation software",
        "kitchen display system",
      ],
    })
  : {};

export default function RestaurantSystemPage() {
  if (!product) notFound();
  return <ProductPage product={product} />;
}
