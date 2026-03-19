import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/ksp-delta-v" : "",
  images: {
    unoptimized: isGithubPages,
  },
};

export default nextConfig;
