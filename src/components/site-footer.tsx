import Link from "next/link";

import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/section";
import {
  footerNav,
  hasAddress,
  hasEmail,
  hasPhone,
  hasWhatsapp,
  mailtoUrl,
  phoneLabel,
  site,
  telUrl,
  whatsappUrl,
} from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const socials = [
    ["LinkedIn", site.social.linkedin],
    ["Instagram", site.social.instagram],
    ["Facebook", site.social.facebook],
  ].filter(([, url]) => url) as [string, string][];

  return (
    <footer className="border-t border-line bg-ink-950 text-ink-300">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400">
              {site.description}
            </p>

            {/* Contact details render only when they exist — an unset value is
                hidden rather than shown as an empty or dead link. */}
            {hasPhone || hasEmail || hasWhatsapp ? (
              <div className="mt-6 space-y-2 text-sm">
                {hasPhone ? (
                  <a
                    href={telUrl}
                    className="block font-semibold text-white transition-colors hover:text-chrome-300"
                  >
                    {phoneLabel}
                  </a>
                ) : null}
                {hasEmail ? (
                  <a
                    href={mailtoUrl}
                    className="block text-ink-300 transition-colors hover:text-chrome-300"
                  >
                    {site.contact.email}
                  </a>
                ) : null}
                {hasWhatsapp ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink-300 transition-colors hover:text-chrome-300"
                  >
                    Message us on WhatsApp
                    <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </div>
            ) : null}

            {hasAddress || site.contact.hours ? (
              <address className="mt-6 text-sm not-italic leading-relaxed text-ink-400">
                {hasAddress ? (
                  <>
                    {site.contact.address.street}
                    <br />
                    {site.contact.address.city}
                    {site.contact.address.region ? `, ${site.contact.address.region}` : ""}{" "}
                    {site.contact.address.postalCode}
                    <br />
                  </>
                ) : null}
                {site.contact.hours ? (
                  <span className="text-ink-500">{site.contact.hours}</span>
                ) : null}
              </address>
            ) : null}
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-chrome-300">
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
            {socials.map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
