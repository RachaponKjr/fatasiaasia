import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroLayout from "../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import destinationhero from "@/assets/images/destination/destination-hero.webp";
import { listBlogPosts, estimateReadTime } from "@/lib/articles-api";

export const metadata = {
  title: "Travel Blog | Fantasia Asia",
  description:
    "Stories, tips and destination guides from the Fantasia Asia team.",
};

// Revalidate hourly so newly-published admin posts appear without redeploy.
export const revalidate = 3600;

const FALLBACK_COVER = "/assets/images/destination/Thai.webp";

const BlogIndex = async () => {
  const posts = await listBlogPosts();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroLayout image={destinationhero.src} title="Travel Blog" />
      <div className="container mx-auto xl:pt-[120px] xl:pb-[160px] py-10 px-4 xl:px-0">
        <div className="flex flex-col items-center mb-12">
          <h3 className="font-bold text-xl md:text-4xl mb-6 text-center">
            Stories &amp; Inspiration
          </h3>
          <p className="font-light text-lg md:text-xl text-[#585858] leading-relaxed text-center max-w-3xl">
            Insider tips, cultural deep-dives and travel stories from across Asia.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-[#585858]">
            New articles coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const publishedAt = post.publishedAt || post.createdAt;
              const readTime = estimateReadTime(post.content);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl overflow-hidden border border-[#E7E6E6] hover:shadow-lg transition"
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
                  <div className="p-5 flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wide text-[#BD3E2B] font-semibold">
                      {post.tags?.join(" · ") || "Article"}
                    </span>
                    <h4 className="text-lg font-bold text-[#333333] group-hover:text-[#BD3E2B] transition">
                      {post.title}
                    </h4>
                    <p className="text-sm text-[#585858] line-clamp-3">
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
        )}
      </div>
      <JoinNewSletter />
    </Suspense>
  );
};

export default BlogIndex;
