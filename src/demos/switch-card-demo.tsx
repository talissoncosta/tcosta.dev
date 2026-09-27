'use client';

import type { CSSProperties } from 'react';
import { Switch } from '@/registry/switch';

const items = [
  { id: 'card-sw-default', label: 'Default', props: { defaultChecked: true } },
  {
    id: 'card-sw-icons',
    label: 'Icons',
    props: { icons: { checked: <CheckIcon />, unchecked: <CrossIcon /> } },
  },
  {
    id: 'card-sw-brand',
    label: 'Brand',
    props: { defaultChecked: true, style: { '--switch-on': '#10b981' } as CSSProperties },
  },
  { id: 'card-sw-small', label: 'Small', props: { size: 'sm' as const } },
];

// Compact version for the gallery card; the component page shows the full demo.
export default function SwitchCardDemo() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-6">
      {items.map(({ id, label, props }) => (
        <li key={id} className="flex flex-col items-center gap-2">
          <Switch id={id} {...props} />
          <label htmlFor={id} className="text-xs text-muted-foreground">
            {label}
          </label>
        </li>
      ))}
    </ul>
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
