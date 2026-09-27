'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownMenuContext } from './dropdown-menu-context';

type DropdownMenuTriggerProps = Omit<ComponentProps<'button'>, 'ref'>;

export function DropdownMenuTrigger({ className, ...props }: DropdownMenuTriggerProps) {
  const { isOpen, setReference, getReferenceProps } = useDropdownMenuContext();

  return (
    <button
      type="button"
      ref={setReference}
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium shadow-xs transition-colors outline-none',
        'hover:bg-accent data-[state=open]:bg-accent',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
      {...getReferenceProps(props)}
    />
  );
}
