import type { ComponentType } from "react";
import AnimatedTabsDemo from "@/demos/animated-tabs-demo";
import CopyButtonDemo from "@/demos/copy-button-demo";

export type CatalogEntry = {
  slug: string;
  title: string;
  description: string;
  /** Techniques used — handy to connect each piece to what you were studying. */
  techniques: string[];
  /** YYYY-MM-DD, newest first on the gallery. */
  addedAt: string;
  Demo: ComponentType;
  /** Source files shown on the page, relative to src/registry. Keep in sync with registry.json. */
  files: string[];
};

/**
 * Every component in the lab. To add one:
 * 1. src/registry/<slug>/<slug>.tsx  — the component
 * 2. src/demos/<slug>-demo.tsx       — a default-exported demo
 * 3. an entry here + an item in registry.json
 */
export const catalog: CatalogEntry[] = [
  {
    slug: "copy-button",
    title: "Copy Button",
    description: "Icon morphs from copy to check with a blur-scale crossfade, then the check draws itself.",
    techniques: ["AnimatePresence popLayout", "spring", "pathLength", "blur"],
    addedAt: "2026-09-27",
    Demo: CopyButtonDemo,
    files: ["copy-button/copy-button.tsx"],
  },
  {
    slug: "animated-tabs",
    title: "Animated Tabs",
    description: "Segmented tabs with a pill that slides between items using a shared layout animation.",
    techniques: ["layoutId", "spring", "a11y: tabs pattern"],
    addedAt: "2026-09-27",
    Demo: AnimatedTabsDemo,
    files: ["animated-tabs/animated-tabs.tsx"],
  },
].sort((a, b) => b.addedAt.localeCompare(a.addedAt));

export function getEntry(slug: string) {
  return catalog.find((entry) => entry.slug === slug);
}
