'use client';

import { useState } from 'react';
import { Button } from '@/registry/button';

const variants = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;

export default function ButtonDemo() {
  const [isSaving, setIsSaving] = useState(false);

  const save = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant[0].toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button variant="outline">
          <PlusIcon /> New file
        </Button>
        <Button size="lg" loading={isSaving} onClick={save}>
          Save changes
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        &ldquo;Save changes&rdquo; keeps its width while loading.
      </p>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
