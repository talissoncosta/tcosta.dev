'use client';

import { createContext, useContext } from 'react';

type TabsContextValue = {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
};

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs parts must be rendered inside <Tabs>.');
  return context;
}

export const triggerId = (id: string, value: string) => `${id}-tab-${value}`;
export const contentId = (id: string, value: string) => `${id}-panel-${value}`;
