'use client';

import { useId, type ReactNode } from 'react';
import { TabsContext } from './tabs-context';

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: ReactNode;
};

export function Tabs({ value, onValueChange, className, children }: TabsProps) {
  const id = useId();

  return (
    <TabsContext value={{ id, value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext>
  );
}
