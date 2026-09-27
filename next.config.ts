import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the parent folder otherwise confuses Turbopack.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
