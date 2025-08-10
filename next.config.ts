import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fsc-projects-static.s3.us-east-1.amazonaws.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
