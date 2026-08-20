"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { hasPhone, mainNav, phoneLabel, primaryCta, telUrl } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Sticky header with a mobile drawer.
 *
 * Client component because it tracks scroll and menu state. The nav links
 * themselves are plain <Link>s, so navigation works before hydration.
 */
/** Subscribe to scroll position without an effect, so the server render and the
 *  first client render agree (the server can't know the scroll offset: false). */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-shadow duration-200",
        scrolled
          ? "border-b border-line bg-canvas/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-canvas",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-18 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-clay-50 text-clay-700"
                      : "text-ink-700 hover:bg-ink-100 hover:text-ink-950",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {hasPhone ? (
            <a
              href={telUrl}
              className="rounded-full px-2 py-1 text-[15px] font-semibold text-ink-700 transition-colors hover:text-clay-700"
            >
              {phoneLabel}
            </a>
          ) : null}
          <ButtonLink href={primaryCta.href} size="sm">
            {primaryCta.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-800 transition-colors hover:bg-ink-100 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
            {open ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/*
        Mobile drawer. Navigating closes it via onClick rather than an effect
        watching the pathname — the click is the actual event, and same-route
        clicks close it too.
      */}
      <div
        id="mobile-menu"
        hidden={!open}
        onClick={() => setOpen(false)}
        className="border-t border-line bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-4 sm:px-6">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-clay-50 text-clay-700"
                      : "text-ink-800 hover:bg-ink-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-3 border-t border-line pt-4">
            <ButtonLink href={primaryCta.href} size="lg" className="w-full">
              {primaryCta.label}
            </ButtonLink>
            {hasPhone ? (
              <ButtonLink href={telUrl} variant="secondary" size="lg" className="w-full">
                Call {phoneLabel}
              </ButtonLink>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
