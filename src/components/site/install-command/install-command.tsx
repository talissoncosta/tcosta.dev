import { CopyButton } from '@/registry/copy-button/copy-button';

export function InstallCommand({ command }: { command: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border bg-muted/60 py-1.5 pr-1.5 pl-4">
      <code className="overflow-x-auto font-mono text-[13px] whitespace-nowrap">{command}</code>
      <CopyButton value={command} />
    </div>
  );
}
