'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { AnimatedTabs, tabPanelProps } from '@/registry/animated-tabs/animated-tabs';

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'settings', label: 'Settings' },
];

const COPY: Record<string, string> = {
  overview: 'A shared layoutId lets the pill travel between tabs instead of blinking.',
  activity: 'Try ← / → — keyboard navigation follows the WAI-ARIA tabs pattern.',
  settings: 'With reduced motion enabled in your OS, the pill jumps instead of sliding.',
};

export default function AnimatedTabsDemo() {
  const [tab, setTab] = useState('overview');
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <AnimatedTabs
        id="demo-tabs"
        label="Demo sections"
        tabs={TABS}
        value={tab}
        onValueChange={setTab}
      />
      <div className="h-12 w-full text-center text-sm text-neutral-500">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={tab}
            {...tabPanelProps('demo-tabs', tab)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="outline-none"
          >
            {COPY[tab]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
