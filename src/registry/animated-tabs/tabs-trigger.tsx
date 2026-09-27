'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { contentId, triggerId, useTabs } from './tabs-context';

type TabsTriggerProps = {
  value: string;
  className?: string;
  children: ReactNode;
};

export function TabsTrigger({ value, className, children }: TabsTriggerProps) {
  const tabs = useTabs();
  const isSelected = tabs.value === value;

  return (
    <button
      type="button"
      role="tab"
      id={triggerId(tabs.id, value)}
      data-value={value}
      aria-selected={isSelected}
      aria-controls={contentId(tabs.id, value)}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => tabs.onValueChange(value)}
      className={cn(
        'relative rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 outline-none',
        'hover:text-foreground aria-selected:text-foreground',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
    >
      {isSelected && (
        <motion.span
          layoutId={`${tabs.id}-indicator`}
          transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
          className="absolute inset-0 rounded-full bg-background shadow-sm ring-1 ring-border"
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}
