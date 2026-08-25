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
        "restaurant billing software",
        "restaurant POS software",
        "KOT software",
        "captain ordering app",
        "kitchen display system",
        "restaurant inventory management software",
      ],
    })
  : {};

export default function RestaurantSystemPage() {
  if (!product) notFound();
  return <ProductPage product={product} />;
}
