'use client';

import { ThemeToggle } from '@/registry/theme-toggle';

export default function ThemeToggleDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ThemeToggle className="size-12 [&_svg]:size-6" />
      <p className="max-w-xs text-center text-xs text-muted-foreground">
        The new theme grows from where you click. With reduced motion, it just switches. Uses{' '}
        <code className="font-mono">next-themes</code> with{' '}
        <code className="font-mono">{'attribute="class"'}</code>, the shadcn/ui default.
      </p>
    </div>
  );
}
