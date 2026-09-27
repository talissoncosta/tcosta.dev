'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { contentId, triggerId, useTabs } from './tabs-context';

type TabsContentProps = {
  value: string;
  className?: string;
  children: ReactNode;
};

export function TabsContent({ value, className, children }: TabsContentProps) {
  const tabs = useTabs();
  if (tabs.value !== value) return null;

  return (
    <motion.div
      data-slot="tabs-content"
      role="tabpanel"
      id={contentId(tabs.id, value)}
      aria-labelledby={triggerId(tabs.id, value)}
      tabIndex={0}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={cn('outline-none', className)}
    >
      {children}
    </motion.div>
  );
}
