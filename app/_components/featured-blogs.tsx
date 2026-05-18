import React from "react";
import Link from "next/link";
import Image from "next/image";
import { listBlogPosts, estimateReadTime } from "@/lib/articles-api";

const FALLBACK_COVER = "/blog/thailand.webp";

const FeaturedBlogs = async () => {
  const posts = (await listBlogPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 xl:gap-10">
      <div className="flex flex-col items-center text-center gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#BD3E2B] font-semibold">
          From the journal
        </span>
        <h3 className="font-bold text-2xl md:text-4xl">
          Stories &amp; Inspiration
        </h3>
        <p className="font-light text-base md:text-lg text-[#585858] max-w-2xl">
          Insider tips, cultural deep-dives and travel stories from across Asia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {posts.map((post) => {
          const publishedAt = post.publishedAt || post.createdAt;
          const readTime = estimateReadTime(post.content);
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden border border-[#E7E6E6] hover:shadow-lg transition flex flex-col bg-white"
            >
              <div className="relative w-full aspect-[16/10] bg-[#F5F5F5]">
                <Image
                  src={post.coverImageUrl || FALLBACK_COVER}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <span className="text-xs uppercase tracking-wide text-[#BD3E2B] font-semibold">
                  {post.destination || post.tags?.[0] || "Article"}
                </span>
                <h4 className="text-lg font-bold text-[#333333] group-hover:text-[#BD3E2B] transition line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-[#585858] line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="text-xs text-[#888] mt-2">
                  {new Date(publishedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {" · "}
                  {readTime} min read
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 rounded-full border border-[#BD3E2B] text-[#BD3E2B] font-semibold hover:bg-[#BD3E2B] hover:text-white transition"
        >
          View all articles
        </Link>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
