import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Page-width container. One place to change the site's measure. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  containerClassName,
  tone = "canvas",
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  tone?: "canvas" | "surface" | "tinted" | "dark";
  children: ReactNode;
}) {
  const tones = {
    canvas: "bg-canvas",
    surface: "bg-surface",
    tinted: "bg-carbon-50/60",
    dark: "bg-ink-950 text-ink-100",
  } as const;

  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.14em] text-carbon-700",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={tone === "dark" ? "text-chrome-300" : undefined}>{eyebrow}</Eyebrow>
      ) : null}
      <Tag
        className={cn(
          "mt-3 text-3xl font-bold sm:text-4xl",
          Tag === "h1" && "text-4xl sm:text-5xl",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "dark" ? "text-ink-300" : "text-ink-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "article" | "li" | "figure";
}) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-line bg-surface p-6 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Marks content that is template wording rather than a statement of fact —
 * currently the privacy notice and terms of use, which need a lawyer's review.
 * Delete the badge from a page once its content is genuinely yours.
 */
export function PlaceholderBadge({
  label = "Sample",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-chrome-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-chrome-900 ring-1 ring-chrome-200",
        className,
      )}
      title="Placeholder content — replace with a real client before launch"
    >
      <span aria-hidden="true">✱</span>
      {label}
    </span>
  );
}
