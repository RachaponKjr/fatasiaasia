import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import HeroLayout from "../../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import destinationhero from "@/assets/images/destination/destination-hero.webp";
import { getBlogPostBySlug, estimateReadTime } from "@/lib/articles-api";

export const revalidate = 3600;
export const dynamicParams = true;

const FALLBACK_COVER = "/assets/images/destination/Thai.webp";

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
  };
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const publishedAt = post.publishedAt || post.createdAt;
  const readTime = estimateReadTime(post.content);

  return (
    <>
      <HeroLayout image={destinationhero.src} title={post.title} />
      <article className="container mx-auto max-w-3xl xl:pt-[80px] xl:pb-[120px] py-10 px-4">
        <div className="text-sm text-[#888] mb-6">
          {post.authorName ? `By ${post.authorName} · ` : ""}
          {new Date(publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {readTime} min read
        </div>
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10">
          <Image
            src={post.coverImageUrl || FALLBACK_COVER}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="prose max-w-none text-[#333333] leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
        <div className="mt-12">
          <Link
            href="/blog"
            className="text-[#BD3E2B] font-semibold hover:underline"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
      <JoinNewSletter />
    </>
  );
};

export default BlogPostPage;
