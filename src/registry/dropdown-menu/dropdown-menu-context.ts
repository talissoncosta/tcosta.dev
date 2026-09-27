'use client';

import { createContext, useContext } from 'react';
import type { DropdownMenuState } from './use-dropdown-menu';

export const DropdownMenuContext = createContext<DropdownMenuState | null>(null);

export function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenu parts must be rendered inside <DropdownMenu>.');
  return context;
}
