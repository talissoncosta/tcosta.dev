'use client';

import { useState } from 'react';
import { IconButton } from '@/registry/icon-button';

export default function IconButtonDemo() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <IconButton label="Add" size="sm" variant="outline">
          <PlusIcon />
        </IconButton>
        <IconButton label="Edit" variant="outline">
          <PencilIcon />
        </IconButton>
        <IconButton label="Refresh" variant="ghost" loading={isRefreshing} onClick={refresh}>
          <RefreshIcon />
        </IconButton>
        <IconButton label="Delete" size="lg" variant="destructive">
          <TrashIcon />
        </IconButton>
      </div>
      <p className="max-w-xs text-center text-xs text-muted-foreground">
        <code className="font-mono">label</code> is required by the type, so an unlabeled icon
        button doesn&apos;t compile.
      </p>
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const PlusIcon = () => <Icon d="M12 5v14M5 12h14" />;
const PencilIcon = () => <Icon d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />;
const RefreshIcon = () => <Icon d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />;
const TrashIcon = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
