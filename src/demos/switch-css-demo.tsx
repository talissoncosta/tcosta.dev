"use client";

import { useRef, useState } from "react";
import { Switch } from "@/registry/switch/switch";
import { SwitchCss } from "@/registry/switch-css/switch-css";

/** Side-by-side: real spring (Motion) vs overshooting bezier (CSS). "Mash" interrupts both mid-flight. */
export default function SwitchCssDemo() {
  const [on, setOn] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const mash = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [0, 90, 180, 270, 360].map((ms) => setTimeout(() => setOn((v) => !v), ms));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-12">
        <Labeled label="Motion spring">
          <Switch checked={on} onCheckedChange={setOn} aria-label="Motion spring switch" />
        </Labeled>
        <Labeled label="CSS bezier">
          <SwitchCss checked={on} onCheckedChange={setOn} aria-label="CSS switch" />
        </Labeled>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={mash}
          className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium shadow-xs hover:bg-neutral-50 active:scale-[0.97] dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900"
        >
          Mash (5 toggles in 360 ms)
        </button>
        <p className="max-w-xs text-center text-xs text-neutral-500">
          The spring keeps its velocity when interrupted; the CSS transition restarts from a standstill each time.
        </p>
      </div>
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {children}
      <span className="text-xs text-neutral-500">{label}</span>
    </div>
  );
}
