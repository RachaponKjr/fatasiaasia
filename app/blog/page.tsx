import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroLayout from "../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import destinationhero from "@/assets/images/destination/destination-hero.webp";
import { listBlogPosts, estimateReadTime } from "@/lib/articles-api";
import { getSiteImage } from "@/lib/site-images";

export const metadata = {
  title: "Travel Blog | Fantasia Asia",
  description:
    "Stories, tips and destination guides from the Fantasia Asia team.",
};

export const revalidate = 3600;

const FALLBACK_COVER = "/blog/thailand.webp";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const BlogIndex = async () => {
  const [posts, heroOverride] = await Promise.all([
    listBlogPosts(),
    getSiteImage("blog.hero.image"),
  ]);
  const [featured, ...rest] = posts;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroLayout image={heroOverride?.url || destinationhero.src} title="Travel Blog" />

      <div className="w-full xl:pt-[100px] xl:pb-[140px] py-10 px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#BD3E2B] font-semibold mb-3">
            The Journal
          </span>
          <h3 className="font-bold text-2xl md:text-4xl mb-4">
            Stories &amp; Inspiration
          </h3>
          <p className="font-light text-base md:text-xl text-[#585858] leading-relaxed max-w-3xl">
            Insider tips, cultural deep-dives and travel stories from across
            Asia — written by the Fantasia Asia team.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-[#585858]">
            New articles coming soon.
          </p>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block rounded-3xl overflow-hidden border border-[#E7E6E6] hover:shadow-xl transition mb-12 bg-white"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-[#F5F5F5]">
                    <Image
                      src={featured.coverImageUrl || FALLBACK_COVER}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] uppercase tracking-wide font-semibold text-[#BD3E2B] bg-[#FBEFEC] px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                      {featured.destination && (
                        <span className="text-xs uppercase tracking-wide text-[#888] font-semibold">
                          {featured.destination}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#222] group-hover:text-[#BD3E2B] transition leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-base md:text-lg text-[#585858] leading-relaxed line-clamp-4">
                      {featured.excerpt}
                    </p>
                    <div className="text-xs text-[#888] mt-2">
                      {featured.authorName ? `By ${featured.authorName} · ` : ""}
                      {formatDate(featured.publishedAt || featured.createdAt)}
                      {" · "}
                      {estimateReadTime(featured.content)} min read
                    </div>
                    <span className="text-[#BD3E2B] font-semibold mt-2 inline-flex items-center gap-1">
                      Read article
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((post) => {
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
                          {formatDate(publishedAt)}
                          {" · "}
                          {readTime} min read
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <JoinNewSletter />
    </Suspense>
  );
};

export default BlogIndex;
