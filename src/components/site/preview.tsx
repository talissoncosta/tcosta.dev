"use client";

import { useState, type ReactNode } from "react";

/** Framed stage for a demo. "Replay" remounts it so entrance animations run again. */
export function Preview({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  const [run, setRun] = useState(0);
  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 bg-[radial-gradient(var(--color-neutral-200)_1px,transparent_1px)] [background-size:16px_16px] dark:border-neutral-800 dark:bg-neutral-900 dark:bg-[radial-gradient(var(--color-neutral-800)_1px,transparent_1px)]">
      <div key={run} className={`flex items-center justify-center p-8 ${compact ? "min-h-48" : "min-h-80"}`}>
        {children}
      </div>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="absolute top-3 right-3 rounded-md px-2 py-1 text-xs text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-neutral-200/60 hover:text-neutral-900 focus-visible:opacity-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      >
        Replay
      </button>
    </div>
  );
}
