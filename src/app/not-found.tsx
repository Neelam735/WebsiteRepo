import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { hasPhone, mainNav, phoneLabel, telUrl } from "@/content/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="font-display text-6xl font-extrabold text-carbon-200">404</p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">We can&rsquo;t find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-600">
        It may have moved, or the link might be wrong. Here&rsquo;s everything else.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
        {hasPhone ? (
          <ButtonLink href={telUrl} variant="secondary" size="lg">
            Call {phoneLabel}
          </ButtonLink>
        ) : (
          <ButtonLink href="/contact#message" variant="secondary" size="lg">
            Contact us
          </ButtonLink>
        )}
      </div>

      <nav aria-label="Site pages" className="mt-12">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-ink-600 underline-offset-4 transition-colors hover:text-carbon-700 hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
