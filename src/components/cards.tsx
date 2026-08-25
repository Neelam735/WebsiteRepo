import Link from "next/link";

import { ArrowIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/section";
import type { Module, Product } from "@/content/products";

/** The two systems, on the home page. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      as="li"
      className="card-3d group relative flex h-full flex-col hover:border-carbon-200"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-carbon-50 text-2xl"
      >
        {product.glyph}
      </span>

      <h3 className="mt-4 text-xl font-bold">
        <Link href={`/${product.slug}`} className="after:absolute after:inset-0">
          {product.name}
        </Link>
      </h3>

      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{product.tagline}</p>

      <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5">
        {product.modules.slice(0, 5).map((module) => (
          <li key={module.name} className="flex gap-2.5 text-sm text-ink-700">
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="mt-1 h-3.5 w-3.5 shrink-0 text-steel-500"
            >
              <path
                d="m3.5 8.5 3 3 6-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {module.name}
          </li>
        ))}
        <li className="pl-6 text-sm text-ink-400">
          + {product.modules.length - 5} more modules
        </li>
      </ul>

      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-carbon-700">
        Explore the system
        <ArrowIcon />
      </p>
    </Card>
  );
}

/** One module of a system, on its product page. */
export function ModuleCard({ module }: { module: Module }) {
  return (
    <li className="card-3d flex h-full flex-col rounded-card border border-line bg-surface p-5 hover:border-carbon-200">
      <span aria-hidden="true" className="text-xl">
        {module.glyph}
      </span>
      <h3 className="mt-3 font-bold text-ink-950">{module.name}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{module.description}</p>
    </li>
  );
}

/** A problem the system solves, numbered. */
export function ProblemCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <div className="flex h-full gap-4 rounded-card border border-line bg-surface p-6">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-carbon-50 font-display text-sm font-bold text-carbon-700"
      >
        {index + 1}
      </span>
      <div>
        <h3 className="font-bold text-ink-950">{title}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{body}</p>
      </div>
    </div>
  );
}

/** Tick list used for outcomes, inclusions and integrations. */
export function CheckList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 py-1.5 text-[15px] text-ink-700">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="mt-1 h-4 w-4 shrink-0 text-steel-500"
          >
            <path
              d="m3.5 8.5 3 3 6-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
