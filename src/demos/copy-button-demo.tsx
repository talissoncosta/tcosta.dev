'use client';

import { CopyButton } from '@/registry/copy-button/copy-button';

const command = 'npx shadcn add @tcosta/copy-button';

export default function CopyButtonDemo() {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-background py-1.5 pr-1.5 pl-4 font-mono text-sm shadow-xs">
      <span className="select-all">{command}</span>
      <CopyButton value={command} />
    </div>
  );
}
