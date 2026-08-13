import Link from "next/link";

import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/section";
import { footerNav, mailtoUrl, site, telUrl, whatsappUrl } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-950 text-ink-300">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400">
              {site.description}
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href={telUrl}
                className="block font-semibold text-white transition-colors hover:text-honey-300"
              >
                {site.contact.phoneDisplay}
              </a>
              <a
                href={mailtoUrl}
                className="block text-ink-300 transition-colors hover:text-honey-300"
              >
                {site.contact.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-300 transition-colors hover:text-honey-300"
              >
                Message us on WhatsApp
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <address className="mt-6 text-sm not-italic leading-relaxed text-ink-400">
              {site.contact.address.street}
              <br />
              {site.contact.address.city}, {site.contact.address.region}{" "}
              {site.contact.address.postalCode}
              <br />
              <span className="text-ink-500">{site.contact.hours}</span>
            </address>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-honey-300">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink-300 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-800 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
