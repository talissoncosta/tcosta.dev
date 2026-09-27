import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site (every route is SSG) — `next build` writes it to `out/` for Cloudflare Pages.
  output: "export",
  // Pin the workspace root: a stray lockfile in the parent folder otherwise confuses Turbopack.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
