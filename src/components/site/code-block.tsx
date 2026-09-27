import { readFile } from "node:fs/promises";
import path from "node:path";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/registry/copy-button/copy-button";

/**
 * Server component: reads a registry source file at build time and renders it highlighted.
 * `file` is relative to src/registry (the path is scoped so the build only traces that folder).
 */
export async function CodeBlock({ file }: { file: string }) {
  const source = await readFile(path.join(process.cwd(), "src", "registry", file), "utf8");
  const html = await codeToHtml(source, {
    lang: "tsx",
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: false,
  });

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 py-1 pr-1 pl-4 dark:border-neutral-800 dark:bg-neutral-900">
        <span className="font-mono text-xs text-neutral-500">{path.basename(file)}</span>
        <CopyButton value={source} />
      </div>
      <div
        className="code max-h-[32rem] overflow-auto text-[13px] leading-relaxed"
        // Shiki output is generated from our own source files at build time.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
