"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Fade-and-rise on first scroll into view.
 *
 * Restraint is the point: one small movement, once, and never again. The
 * hidden starting state is applied by CSS scoped to `html.js` (see
 * globals.css), and the root layout adds that class only when scripting *and*
 * IntersectionObserver are both available — so a visitor without either sees
 * the content immediately rather than a page of invisible sections.
 * `prefers-reduced-motion` disables the transition in the same stylesheet.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // min-w-0: this wrapper is usually a grid/flex item, and the default
      // `min-width: auto` lets non-wrapping content inside (truncated names,
      // long words) push a track wider than its container. Zeroing it here
      // keeps the wrapper layout-neutral, which is the whole point of it.
      className={cn("reveal min-w-0", className)}
      data-visible={visible ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
