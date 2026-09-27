"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

const FRAMES = [
  { label: "1:1", ratio: 1, size: "1080×1080" },
  { label: "4:5", ratio: 4 / 5, size: "1080×1350" },
  { label: "16:9", ratio: 16 / 9, size: "1920×1080" },
];
const ZOOMS = [1, 1.25, 1.5, 2];

const TOOLBAR =
  "fixed inset-x-0 bottom-4 mx-auto flex w-fit flex-wrap items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white/90 px-3 py-2 text-xs text-neutral-500 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90";
const GROUP = "flex items-center gap-0.5";
const OPTION =
  "rounded-md px-2 py-1 tabular-nums transition-colors hover:bg-neutral-100 hover:text-neutral-900 aria-pressed:bg-neutral-900 aria-pressed:text-white dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:aria-pressed:bg-neutral-100 dark:aria-pressed:text-neutral-900";
const ACTION =
  "rounded-md px-2 py-1 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100";
const KBD = "ml-1 rounded border border-neutral-200 px-1 font-mono text-[10px] dark:border-neutral-700";
const DIVIDER = "h-4 w-px bg-neutral-200 dark:bg-neutral-800";

/** Keys typed into a field (or with a modifier) belong to the demo, not to the stage. */
function isShortcut(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  if (event.metaKey || event.ctrlKey || event.altKey) return false;
  return !target.closest("input, textarea, select, [contenteditable]");
}

/**
 * Clean, fixed-ratio stage for screen-recording a demo.
 * The frame is a containing block, so `position: fixed` pieces (like the toaster) stay inside it.
 * Shortcuts: R replays, H hides the toolbar.
 */
export function RecordStage({ children, backHref }: { children: ReactNode; backHref: string }) {
  const [frame, setFrame] = useState(FRAMES[0]);
  const [zoom, setZoom] = useState(1.5);
  const [run, setRun] = useState(0);
  const [toolbar, setToolbar] = useState(true);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!isShortcut(event)) return;
      if (event.key === "r") setRun((n) => n + 1);
      if (event.key === "h") setToolbar((v) => !v);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Largest frame of the chosen ratio that fits the viewport, leaving room for the toolbar.
  const reserved = toolbar ? "7rem" : "2rem";
  const width = `min(calc(100vw - 2rem), calc((100dvh - ${reserved}) * ${frame.ratio}))`;

  return (
    <div className={`flex h-dvh items-center justify-center p-4 ${toolbar ? "pb-24" : ""}`}>
      <div
        style={{ width, aspectRatio: frame.ratio, contain: "layout paint" }}
        className="relative bg-neutral-50 transition-colors dark:bg-neutral-900"
      >
        <div key={run} style={{ zoom }} className="flex h-full items-center justify-center">
          {children}
        </div>
      </div>

      {toolbar && (
        <div role="toolbar" aria-label="Recording controls" className={TOOLBAR}>
          <Link href={backHref} className={ACTION}>
            ← Exit
          </Link>
          <span aria-hidden className={DIVIDER} />
          <div role="group" aria-label="Frame" className={GROUP}>
            {FRAMES.map((f) => (
              <button key={f.label} type="button" title={f.size} aria-pressed={f === frame} onClick={() => setFrame(f)} className={OPTION}>
                {f.label}
              </button>
            ))}
          </div>
          <span aria-hidden className={DIVIDER} />
          <div role="group" aria-label="Zoom" className={GROUP}>
            {ZOOMS.map((z) => (
              <button key={z} type="button" aria-pressed={z === zoom} onClick={() => setZoom(z)} className={OPTION}>
                {z}×
              </button>
            ))}
          </div>
          <span aria-hidden className={DIVIDER} />
          <button type="button" onClick={() => setRun((n) => n + 1)} className={ACTION}>
            Replay<kbd className={KBD}>R</kbd>
          </button>
          <button type="button" onClick={() => setToolbar(false)} className={ACTION}>
            Hide<kbd className={KBD}>H</kbd>
          </button>
        </div>
      )}
    </div>
  );
}
