import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { PostBody } from "@/components/post-body";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { getIndustry } from "@/content/industries";
import { getPost, posts, sortedPosts } from "@/content/posts";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const more = sortedPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="border-b border-line bg-surface py-12 sm:py-16">
          <Container className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-500">
              <Link href="/blog" className="transition-colors hover:text-clay-700">
                Blog
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span className="text-ink-800">{post.tag}</span>
            </nav>

            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[42px]">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-ink-600">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500">
              <span className="font-semibold text-ink-800">{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </Container>
        </header>

        <Section className="py-12 sm:py-16">
          <Container className="max-w-3xl px-0 sm:px-0 lg:px-0">
            <PostBody blocks={post.body} />

            {/* Cross-links to the verticals this piece is written for. */}
            {post.industries.length > 0 && post.industries.length < 6 ? (
              <div className="mt-12 border-t border-line pt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                  Relevant if you run
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.industries.map((industrySlug) => {
                    const industry = getIndustry(industrySlug);
                    if (!industry) return null;
                    return (
                      <Link
                        key={industrySlug}
                        href={`/industries/${industrySlug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-clay-300 hover:text-clay-700"
                      >
                        <span aria-hidden="true">{industry.glyph}</span>
                        {industry.shortName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-10 rounded-card bg-ink-950 p-7">
              <h2 className="text-xl font-bold text-white">Want this done for you?</h2>
              <p className="mt-2 text-ink-300">
                We build exactly this for local businesses — fixed price, live in weeks.
              </p>
              <ButtonLink href="/contact" variant="inverse" className="mt-5">
                Get a free consultation
              </ButtonLink>
            </div>
          </Container>
        </Section>
      </article>

      <Section tone="surface" className="py-12 sm:py-14">
        <Container className="max-w-3xl px-0 sm:px-0 lg:px-0">
          <h2 className="text-2xl font-bold">Read next</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {more.map((item) => (
              <article key={item.slug} className="group relative rounded-card border border-line bg-canvas p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-clay-700">
                  {item.tag}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug">
                  <Link href={`/blog/${item.slug}`} className="after:absolute after:inset-0">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{item.excerpt}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />

      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}
