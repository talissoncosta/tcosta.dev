'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/registry/dropdown-menu';

export default function DropdownMenuDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            Actions <ChevronIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Document</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => setSelected('Rename')}>
              Rename <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelected('Duplicate')}>
              Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Move to…</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => setSelected('Delete')}>
              Delete <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger aria-label="More options" className="w-9 justify-center px-0">
            <DotsIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setSelected('Share')}>Share</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelected('Download')}>Download</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelected('Archive')}>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p aria-live="polite" className="h-4 text-xs text-muted-foreground">
        {selected
          ? `Selected: ${selected}`
          : 'Opens from its trigger. Try ↑ ↓, typing a letter, Esc.'}
      </p>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="text-muted-foreground"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="19" cy="12" r="1.75" />
    </svg>
  );
}
