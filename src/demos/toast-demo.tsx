"use client";

import type { ReactNode } from "react";
import { Toaster, toast } from "@/registry/toast/toast";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ToastDemo() {
  return (
    <div className="flex max-w-md flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <DemoButton onClick={() => toast("Event created", { description: "Sunday, 12 October at 9:00" })}>Default</DemoButton>
        <DemoButton onClick={() => toast.success("Changes saved")}>Success</DemoButton>
        <DemoButton onClick={() => toast.error("Upload failed", { description: "The file is larger than 10 MB." })}>Error</DemoButton>
        <DemoButton
          onClick={() =>
            toast.promise(wait(1600).then(() => "report.pdf"), {
              loading: "Generating report…",
              success: (file) => `${file} is ready`,
              error: "Couldn't generate the report",
            })
          }
        >
          Promise
        </DemoButton>
        <DemoButton onClick={() => toast("Message archived", { action: { label: "Undo", onClick: () => toast.success("Message restored") } })}>
          With action
        </DemoButton>
      </div>
      <p className="text-center text-xs text-neutral-500">Toasts appear bottom-right. Hover to expand · swipe right or press Esc to dismiss.</p>
      <Toaster />
    </div>
  );
}

function DemoButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium shadow-xs transition-transform hover:bg-neutral-50 active:scale-[0.97] dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900"
    >
      {children}
    </button>
  );
}
