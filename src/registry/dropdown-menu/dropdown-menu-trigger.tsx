'use client';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../button';
import { useDropdownMenuContext } from './dropdown-menu-context';

type DropdownMenuTriggerProps = Omit<ComponentProps<'button'>, 'ref'> &
  VariantProps<typeof buttonVariants>;

export function DropdownMenuTrigger({
  variant = 'outline',
  size,
  className,
  ...props
}: DropdownMenuTriggerProps) {
  const { isOpen, setReference, getReferenceProps } = useDropdownMenuContext();

  return (
    <button
      type="button"
      ref={setReference}
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(buttonVariants({ variant, size }), 'data-[state=open]:bg-accent', className)}
      {...getReferenceProps(props)}
    />
  );
}
