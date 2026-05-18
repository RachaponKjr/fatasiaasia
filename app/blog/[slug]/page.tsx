import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import HeroLayout from "../../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import destinationhero from "@/assets/images/destination/destination-hero.webp";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <HeroLayout image={destinationhero.src} title={post.title} />
      <article className="container mx-auto max-w-3xl xl:pt-[80px] xl:pb-[120px] py-10 px-4">
        <div className="text-sm text-[#888] mb-6">
          By {post.author} ·{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {post.readTimeMin} min read
        </div>
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className="prose max-w-none text-[#333333] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />
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
