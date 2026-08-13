import Link from "next/link";

import { ArrowIcon } from "@/components/ui/button";
import { Card, PlaceholderBadge } from "@/components/ui/section";
import type { CaseStudy } from "@/content/case-studies";
import type { Industry } from "@/content/industries";
import type { Service } from "@/content/services";
import { cn, formatPrice } from "@/lib/utils";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card
      as="li"
      className="group relative flex h-full flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-clay-200 hover:shadow-[var(--shadow-lift)]"
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay-50 text-2xl"
      >
        {industry.glyph}
      </span>

      <h3 className="mt-4 text-lg font-bold">
        <Link href={`/industries/${industry.slug}`} className="after:absolute after:inset-0">
          {industry.name}
        </Link>
      </h3>

      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{industry.cardLine}</p>

      <ul className="mt-4 flex-1 space-y-2 border-t border-line pt-4">
        {industry.painPoints.slice(0, 2).map((pain) => (
          <li key={pain.title} className="flex gap-2 text-sm text-ink-600">
            <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-clay-400" />
            {pain.title}
          </li>
        ))}
      </ul>

      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-700">
        How we help {industry.shortName.toLowerCase()}
        <ArrowIcon />
      </p>
    </Card>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card
      as="li"
      className="group relative flex h-full flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-clay-200 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold">
          <Link href={`/services#${service.slug}`} className="after:absolute after:inset-0">
            {service.name}
          </Link>
        </h3>
      </div>

      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{service.summary}</p>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="font-semibold text-ink-900">
          {service.priceFrom
            ? `From ${formatPrice(service.priceFrom)}${service.slug === "support-maintenance" ? "/mo" : ""}`
            : "Get a quote"}
        </span>
        <span className="text-ink-500">{service.timeline}</span>
      </div>
    </Card>
  );
}

const toneStyles = {
  clay: "from-clay-700 to-clay-500",
  honey: "from-honey-700 to-honey-500",
  sage: "from-sage-700 to-sage-500",
  ink: "from-ink-900 to-ink-700",
} as const;

export function CaseStudyCard({
  study,
  industryName,
  className,
}: {
  study: CaseStudy;
  industryName?: string;
  className?: string;
}) {
  return (
    <Card
      as="article"
      className={cn(
        "group relative flex h-full flex-col overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {/* Artwork: a gradient panel carrying the headline metric. No image request. */}
      <div className={cn("bg-gradient-to-br p-6", toneStyles[study.tone])}>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white ring-1 ring-white/25">
            {industryName ?? study.industry}
          </span>
          {study.placeholder ? (
            <PlaceholderBadge label="Sample project" className="bg-white/90 ring-white/40" />
          ) : null}
        </div>

        <p className="mt-6 font-display text-4xl font-bold text-white">
          {study.metrics[0]?.value}
        </p>
        <p className="text-sm font-medium text-white/85">{study.metrics[0]?.label}</p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-ink-500">
          {study.client} · {study.location}
        </p>
        <h3 className="mt-1.5 text-lg font-bold leading-snug">
          <Link href={`/work/${study.slug}`} className="after:absolute after:inset-0">
            {study.headline}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-600">{study.summary}</p>

        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-700">
          Read the case study
          <ArrowIcon />
        </p>
      </div>
    </Card>
  );
}

/** Problem → solution → result, the spine of every case study page. */
export function OutcomeBlock({
  problem,
  solution,
  result,
}: {
  problem: string;
  solution: string;
  result: string;
}) {
  const blocks = [
    { label: "The problem", body: problem, tone: "border-clay-300" },
    { label: "What we built", body: solution, tone: "border-honey-300" },
    { label: "The result", body: result, tone: "border-sage-500" },
  ];

  return (
    <div className="space-y-8">
      {blocks.map((block) => (
        <div key={block.label} className={cn("border-l-2 pl-5 sm:pl-6", block.tone)}>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-500">
            {block.label}
          </h2>
          <p className="mt-2.5 text-[17px] leading-relaxed text-ink-800">{block.body}</p>
        </div>
      ))}
    </div>
  );
}
