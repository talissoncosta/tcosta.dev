'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/animated-tabs';

const sections = [
  {
    value: 'overview',
    label: 'Overview',
    text: 'A shared layoutId lets the pill travel between tabs instead of blinking.',
  },
  {
    value: 'activity',
    label: 'Activity',
    text: 'Try ← / → — keyboard navigation follows the WAI-ARIA tabs pattern.',
  },
  {
    value: 'settings',
    label: 'Settings',
    text: 'With reduced motion enabled in your OS, the pill jumps instead of sliding.',
  },
];

export default function AnimatedTabsDemo() {
  const [tab, setTab] = useState('overview');

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      className="flex w-full max-w-sm flex-col items-center gap-6"
    >
      <TabsList label="Demo sections">
        {sections.map(({ value, label }) => (
          <TabsTrigger key={value} value={value}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map(({ value, text }) => (
        <TabsContent
          key={value}
          value={value}
          className="h-12 text-center text-sm text-muted-foreground"
        >
          {text}
        </TabsContent>
      ))}
    </Tabs>
  );
}
