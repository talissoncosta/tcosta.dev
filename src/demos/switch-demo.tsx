"use client";

import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Switch } from "@/registry/switch/switch";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function SwitchDemo() {
  const [beta, setBeta] = useState(false);
  const [sync] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  // Optimistic: thumb moves at once; state is committed before the promise resolves.
  const saveBeta = async (next: boolean) => {
    await wait(900);
    setBeta(next);
  };

  // Pessimistic + always fails: spinner, then shake and revert.
  const saveSync = async () => {
    setSyncError(null);
    await wait(900);
    setSyncError("Couldn't reach the server. Nothing was changed.");
    throw new Error("offline");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white shadow-xs dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
        <Row id="sw-notifications" title="Notifications" description="With icons. Try dragging the thumb.">
          <Switch id="sw-notifications" aria-describedby="sw-notifications-desc" defaultChecked icons={{ checked: <Check />, unchecked: <Cross /> }} />
        </Row>
        <Row id="sw-beta" title="Beta features" description="Async, optimistic: moves now, saves in the background.">
          <Switch id="sw-beta" aria-describedby="sw-beta-desc" checked={beta} onCheckedChange={saveBeta} />
        </Row>
        <Row
          id="sw-sync"
          title="Cloud sync"
          description={syncError ?? "Async, pessimistic — and the server always fails."}
          tone={syncError ? "error" : undefined}
        >
          <Switch id="sw-sync" aria-describedby="sw-sync-desc" mode="pessimistic" checked={sync} onCheckedChange={saveSync} />
        </Row>
        <Row id="sw-brand" title="Brand color" description="Custom --switch-on color.">
          <Switch id="sw-brand" aria-describedby="sw-brand-desc" defaultChecked style={{ "--switch-on": "#10b981" } as CSSProperties} />
        </Row>
        <Row id="sw-offline" title="Offline mode" description="Disabled on this plan.">
          <Switch id="sw-offline" aria-describedby="sw-offline-desc" size="sm" disabled />
        </Row>
      </div>

      <form onSubmit={onSubmit} onReset={() => setSubmitted(null)} className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-center justify-between gap-6">
          <label htmlFor="sw-terms" className="text-sm font-medium">
            I accept the terms <span className="text-red-500">*</span>
          </label>
          <Switch id="sw-terms" name="terms" value="accepted" required />
        </div>
        <div className="flex items-center justify-between gap-6">
          <label htmlFor="sw-newsletter" className="text-sm font-medium">
            Newsletter
          </label>
          <Switch id="sw-newsletter" name="newsletter" size="sm" />
        </div>
        <div className="flex items-center justify-between gap-3 pt-1">
          <code className="truncate font-mono text-xs text-neutral-500">{submitted ?? "Native form: submit / reset"}</code>
          <div className="flex shrink-0 gap-2">
            <button type="reset" className="rounded-md px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
              Reset
            </button>
            <button type="submit" className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Row(props: { id: string; title: string; description: string; tone?: "error"; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 px-4 py-3">
      <div className="min-w-0">
        <label htmlFor={props.id} className="text-sm font-medium">
          {props.title}
        </label>
        <p id={`${props.id}-desc`} aria-live="polite" className={`text-xs ${props.tone === "error" ? "text-red-600 dark:text-red-400" : "text-neutral-500"}`}>
          {props.description}
        </p>
      </div>
      {props.children}
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
