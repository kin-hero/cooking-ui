import type { NextConfig } from "next";
import { env } from "@/config/env";

// Extract hostname from S3 URL
const getHostname = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: getHostname(env.s3BucketUrl),
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
