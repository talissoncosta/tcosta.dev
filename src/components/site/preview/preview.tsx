'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { useReplay } from '@/hooks/use-replay';
import { cn } from '@/lib/utils';
import { Button } from '@/registry/button';

const frameClassName = cn(
  'group relative overflow-hidden rounded-xl border bg-muted/60',
  'bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[16px_16px]',
);

const stageVariants = cva('flex items-center justify-center p-8', {
  variants: {
    size: {
      default: 'min-h-80',
      compact: 'min-h-56',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const replayClassName = cn(
  'absolute top-3 right-3 h-7 px-2 text-muted-foreground opacity-0 transition-[opacity,color,background-color,scale]',
  'group-hover:opacity-100 focus-visible:opacity-100',
);

type PreviewProps = VariantProps<typeof stageVariants> & {
  children: ReactNode;
};

export function Preview({ children, size }: PreviewProps) {
  const { key, replay } = useReplay();

  return (
    <div className={frameClassName}>
      <div key={key} className={stageVariants({ size })}>
        {children}
      </div>
      <Button variant="ghost" size="sm" onClick={replay} className={replayClassName}>
        Replay
      </Button>
    </div>
  );
}
