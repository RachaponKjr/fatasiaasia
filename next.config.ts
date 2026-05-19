import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["tour-space-bucket.sgp1.digitaloceanspaces.com"],
    unoptimized: true,
  },
  async headers() {
    // Prevent mobile browsers (and any intermediary) from serving a stale
    // HTML document for dynamic pages after a deploy or data change.
    // Hashed JS/CSS chunks under /_next/static are unaffected and stay
    // long-cached as Next.js intends.
    const noStore = [
      { key: "Cache-Control", value: "no-store, must-revalidate" },
      { key: "Pragma", value: "no-cache" },
      { key: "Expires", value: "0" },
    ];
    return [
      { source: "/", headers: noStore },
      { source: "/tours", headers: noStore },
      { source: "/tours/:id*", headers: noStore },
      { source: "/beach-tours", headers: noStore },
      { source: "/destinations/:path*", headers: noStore },
    ];
  },
};

export default nextConfig;
