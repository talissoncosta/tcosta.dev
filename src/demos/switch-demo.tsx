'use client';

import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/registry/button';
import { Switch } from '@/registry/switch';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SwitchDemo() {
  const [beta, setBeta] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  // Optimistic: the thumb moves at once; state is committed before the promise resolves.
  const saveBeta = async (next: boolean) => {
    await wait(900);
    setBeta(next);
  };

  // Pessimistic and always failing: spinner, then shake and revert.
  const saveSync = async () => {
    setSyncError(null);
    await wait(900);
    setSyncError("Couldn't reach the server. Nothing was changed.");
    throw new Error('offline');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="divide-y rounded-xl border bg-card shadow-xs">
        <Row
          id="sw-notifications"
          title="Notifications"
          description="With icons. Try dragging the thumb."
        >
          <Switch
            id="sw-notifications"
            aria-describedby="sw-notifications-desc"
            defaultChecked
            icons={{ checked: <CheckIcon />, unchecked: <CrossIcon /> }}
          />
        </Row>
        <Row
          id="sw-beta"
          title="Beta features"
          description="Async, optimistic: moves now, saves in the background."
        >
          <Switch
            id="sw-beta"
            aria-describedby="sw-beta-desc"
            checked={beta}
            onCheckedChange={saveBeta}
          />
        </Row>
        <Row
          id="sw-sync"
          title="Cloud sync"
          description={syncError ?? 'Async, pessimistic — and the server always fails.'}
          isError={syncError !== null}
        >
          <Switch
            id="sw-sync"
            aria-describedby="sw-sync-desc"
            mode="pessimistic"
            checked={false}
            onCheckedChange={saveSync}
          />
        </Row>
        <Row id="sw-brand" title="Brand color" description="Custom --switch-on color.">
          <Switch
            id="sw-brand"
            aria-describedby="sw-brand-desc"
            defaultChecked
            style={{ '--switch-on': '#10b981' } as CSSProperties}
          />
        </Row>
        <Row id="sw-offline" title="Offline mode" description="Disabled on this plan.">
          <Switch id="sw-offline" aria-describedby="sw-offline-desc" size="sm" disabled />
        </Row>
      </div>

      <form
        onSubmit={onSubmit}
        onReset={() => setSubmitted(null)}
        className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs"
      >
        <Field id="sw-terms" label="I accept the terms" isRequired>
          <Switch id="sw-terms" name="terms" value="accepted" required />
        </Field>
        <Field id="sw-newsletter" label="Newsletter">
          <Switch id="sw-newsletter" name="newsletter" size="sm" />
        </Field>
        <div className="flex items-center justify-between gap-3 pt-1">
          <code className="truncate font-mono text-xs text-muted-foreground">
            {submitted ?? 'Native form: submit / reset'}
          </code>
          <div className="flex shrink-0 gap-2">
            <Button type="reset" variant="ghost" size="sm">
              Reset
            </Button>
            <Button type="submit" size="sm">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

type RowProps = {
  id: string;
  title: string;
  description: string;
  isError?: boolean;
  children: ReactNode;
};

function Row({ id, title, description, isError = false, children }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-6 px-4 py-3">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-medium">
          {title}
        </label>
        <p
          id={`${id}-desc`}
          aria-live="polite"
          className={cn('text-xs text-muted-foreground', isError && 'text-destructive')}
        >
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  isRequired?: boolean;
  children: ReactNode;
};

function Field({ id, label, isRequired = false, children }: FieldProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <label htmlFor={id} className="text-sm font-medium">
        {label} {isRequired && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
