'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTabs } from './tabs-context';
import { useTabsKeyboard } from './use-tabs-keyboard';

type TabsListProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

export function TabsList({ label, className, children }: TabsListProps) {
  const { onValueChange } = useTabs();
  const onKeyDown = useTabsKeyboard(onValueChange);

  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn('inline-flex items-center gap-1 rounded-full bg-muted p-1', className)}
    >
      {children}
    </div>
  );
}
