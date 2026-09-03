"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A highlighter pen drawing across the text when it scrolls into view.
 *
 * The effect needs the marker and the inverted text to appear together along
 * one moving edge, which one element cannot do — so the line is rendered
 * twice, stacked. The base copy carries the marker geometry with a
 * transparent background; the fill copy sits exactly on top with the solid
 * marker and the inverted text, and is clipped from full-width to nothing.
 * Widening that clip sweeps both at once, exactly like a pen stroke.
 *
 * Both copies use identical padding so they wrap on the same words. If you
 * change the marker's padding, change it in one place below — split them and
 * the two layers drift apart mid-sentence.
 *
 * The fill copy is aria-hidden: it is the same sentence, and a screen reader
 * announcing it twice is the cost of a visual effect nobody using one can see.
 */
export function TrialHighlight({
  text,
  tone = "light",
  className,
}: {
  text: string;
  /** The surface behind the line, not the marker: dark pages get a white pen. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Matches Reveal's behaviour: fire once, then stop watching. A highlight
    // that redraws every time you scroll past is a distraction, not an accent.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const marker = "box-decoration-clone rounded px-2 py-1";

  return (
    <span
      ref={ref}
      className={cn("trial-highlight relative block", className)}
      data-visible={visible ? "true" : "false"}
    >
      <span className={cn(marker, tone === "dark" ? "text-white" : "text-ink-950")}>{text}</span>

      <span aria-hidden="true" className="trial-highlight__fill absolute inset-0">
        <span
          className={cn(
            marker,
            tone === "dark" ? "bg-white text-carbon-950" : "bg-carbon-950 text-white",
          )}
        >
          {text}
        </span>
      </span>
    </span>
  );
}
