import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark. An inline SVG glyph plus text — no image request, and it stays
 * crisp on any display. Replace the <svg> with your own mark when you have one.
 */
export function Logo({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)}
      aria-label={`${site.name} — home`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-clay-600 transition-transform duration-200 group-hover:-rotate-3">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
          {/* Awning over a shopfront — the "storefront" mark. */}
          <path d="M3 8.5 5 4h14l2 4.5" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M3 8.5h18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M4.5 8.5V20h15V8.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9.5 20v-6h5v6" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-[17px] font-bold tracking-tight",
          tone === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
