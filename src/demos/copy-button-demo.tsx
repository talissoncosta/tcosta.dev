"use client";

import { CopyButton } from "@/registry/copy-button/copy-button";

export default function CopyButtonDemo() {
  const command = "npx shadcn add ui-lab/copy-button";
  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white py-1.5 pr-1.5 pl-4 font-mono text-sm text-neutral-700 shadow-xs dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
      <span className="select-all">{command}</span>
      <CopyButton value={command} />
    </div>
  );
}
