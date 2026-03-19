import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ksp-delta-v",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
