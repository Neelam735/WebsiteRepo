import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { sortedPosts } from "@/content/posts";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Blog — Practical Advice for Local Business Owners",
  description:
    "Straight advice on online ordering, bookings, no-shows and what software actually costs — written for owners, not developers.",
  path: "/blog",
});

export default function BlogPage() {
  const [lead, ...rest] = sortedPosts;

  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Advice we&rsquo;d give you on the phone
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            No gated PDFs, no jargon. Just what works, what doesn&rsquo;t, and what it costs —
            including the bits that don&rsquo;t involve hiring us.
          </p>
        </Container>
      </header>

      <Section>
        {lead ? (
          <article className="group relative grid gap-8 rounded-card border border-line bg-surface p-7 sm:p-9 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-clay-700">
                Latest · {lead.tag}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
                <Link href={`/blog/${lead.slug}`} className="after:absolute after:inset-0">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-600">{lead.excerpt}</p>
              <p className="mt-5 text-sm text-ink-500">
                {formatDate(lead.date)} · {lead.readingTime} min read · {lead.author}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="hidden rounded-xl bg-gradient-to-br from-clay-700 to-honey-600 p-8 lg:block"
            >
              <p className="font-display text-5xl font-extrabold leading-none text-white/90">
                {lead.readingTime}
              </p>
              <p className="mt-2 text-sm font-medium text-white/70">minute read</p>
            </div>
          </article>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 70} className="h-full">
              <article className="group relative flex h-full flex-col rounded-card border border-line bg-surface p-7">
                <p className="text-xs font-bold uppercase tracking-wide text-clay-700">
                  {post.tag}
                </p>
                <h2 className="mt-2.5 text-xl font-bold leading-snug">
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-600">
                  {post.excerpt}
                </p>
                <p className="mt-5 text-sm text-ink-500">
                  {formatDate(post.date)} · {post.readingTime} min read
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Rather just ask us?"
        description="Most questions take five minutes on the phone. We don't charge for that, and there's no follow-up sequence waiting for you."
      />
    </>
  );
}
