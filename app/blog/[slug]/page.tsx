import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import HeroLayout from "../../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import destinationhero from "@/assets/images/destination/destination-hero.webp";
import {
  getBlogPostBySlug,
  listBlogPosts,
  estimateReadTime,
} from "@/lib/articles-api";
import { getSiteCms } from "@/lib/site-images";

export const revalidate = 3600;
export const dynamicParams = true;

const FALLBACK_COVER = "/blog/thailand.webp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article not found | Fantasia Asia" };
  return {
    title: `${post.title} | Fantasia Asia`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
      type: "article",
    },
  };
}

// Crude HTML detection — admin now stores rich text (HTML). Old posts may be plain text.
const isHtml = (s: string) =>
  /<\/?(p|h[1-6]|ul|ol|li|img|blockquote|br|strong|em|a)\b/i.test(s || "");

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const [post, siteCms] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteCms(),
  ]);
  if (!post) notFound();
  const { content: siteContent, images: siteImages } = siteCms;

  const publishedAt = post.publishedAt || post.createdAt;
  const readTime = estimateReadTime(post.content);

  const allPosts = await listBlogPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const contentIsHtml = isHtml(post.content);

  return (
    <>
      <HeroLayout image={destinationhero.src} title={post.title} />

      <article className="container mx-auto max-w-3xl xl:pt-[80px] xl:pb-[80px] py-10 px-4">
        {/* Meta strip */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#888] mb-8">
          {post.tags?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[11px] uppercase tracking-wide font-semibold text-[#BD3E2B] bg-[#FBEFEC] px-2.5 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
          {post.authorName && <span>By {post.authorName}</span>}
          <span>·</span>
          <span>
            {new Date(publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>

        {/* Hero cover */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-sm">
          <Image
            src={post.coverImageUrl || FALLBACK_COVER}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Lead / excerpt as drop intro */}
        {post.excerpt && (
          <p className="text-xl md:text-2xl leading-relaxed text-[#333333] font-light mb-10 border-l-4 border-[#BD3E2B] pl-5">
            {post.excerpt}
          </p>
        )}

        {/* Body */}
        {contentIsHtml ? (
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-[#222]
              prose-h2:mt-12 prose-h2:mb-4
              prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[#333] prose-p:leading-[1.85]
              prose-a:text-[#BD3E2B] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:my-8 prose-img:shadow-sm
              prose-blockquote:border-l-4 prose-blockquote:border-[#BD3E2B]
              prose-blockquote:bg-[#FBF7F6] prose-blockquote:py-1 prose-blockquote:rounded-r-lg
              prose-blockquote:not-italic prose-blockquote:text-[#444]
              prose-li:marker:text-[#BD3E2B]
              prose-strong:text-[#222]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="prose prose-lg max-w-none text-[#333] leading-[1.85] whitespace-pre-wrap">
            {post.content}
          </div>
        )}

        {/* Author footer */}
        <div className="mt-16 p-6 rounded-2xl bg-[#FBF7F6] border border-[#F1E5E1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#BD3E2B] font-semibold mb-1">
              About the author
            </div>
            <div className="text-[#333] font-semibold">
              {post.authorName || "Fantasia Asia"}
            </div>
            <p className="text-sm text-[#666] mt-1">
              Travel experts crafting unforgettable journeys across Asia.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-block bg-[#BD3E2B] hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-full text-sm"
          >
            ← All articles
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 pb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Keep reading
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-2xl overflow-hidden border border-[#E7E6E6] hover:shadow-lg transition flex flex-col bg-white"
              >
                <div className="relative w-full aspect-[16/10] bg-[#F5F5F5]">
                  <Image
                    src={r.coverImageUrl || FALLBACK_COVER}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-xs uppercase tracking-wide text-[#BD3E2B] font-semibold">
                    {r.destination || r.tags?.[0] || "Article"}
                  </span>
                  <h4 className="text-base font-bold text-[#333] group-hover:text-[#BD3E2B] transition line-clamp-2">
                    {r.title}
                  </h4>
                  <p className="text-sm text-[#666] line-clamp-2">
                    {r.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <JoinNewSletter
        imageUrl={siteImages["site.newsletter.background"]?.url}
        headline={siteContent["site.newsletter"]?.headline}
        description={siteContent["site.newsletter"]?.description}
      />
    </>
  );
};

export default BlogPostPage;
