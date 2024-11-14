import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ORIGIN_URL: process.env.NEXT_PUBLIC_ORIGIN_URL ?? "",
    MONGODB_URI: process.env.MONGODB_URI ?? "",
  },
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
