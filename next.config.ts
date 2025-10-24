import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["tour-space-bucket.sgp1.digitaloceanspaces.com"],
    unoptimized: true,
  },
};

export default nextConfig;
