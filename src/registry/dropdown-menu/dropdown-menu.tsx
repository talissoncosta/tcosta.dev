'use client';

import type { Placement } from '@floating-ui/react';
import type { ReactNode } from 'react';
import { DropdownMenuContext } from './dropdown-menu-context';
import { useDropdownMenu } from './use-dropdown-menu';

type DropdownMenuProps = {
  placement?: Placement;
  children: ReactNode;
};

export function DropdownMenu({ placement = 'bottom-start', children }: DropdownMenuProps) {
  const menu = useDropdownMenu(placement);
  return <DropdownMenuContext value={menu}>{children}</DropdownMenuContext>;
}
