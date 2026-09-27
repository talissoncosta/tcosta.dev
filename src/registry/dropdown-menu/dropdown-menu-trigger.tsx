'use client';

import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '../button';
import { useDropdownMenuContext } from './dropdown-menu-context';

type DropdownMenuTriggerProps = Omit<ButtonProps, 'ref'>;

export function DropdownMenuTrigger({
  variant = 'outline',
  size,
  loading,
  className,
  ...props
}: DropdownMenuTriggerProps) {
  const { isOpen, setReference, getReferenceProps } = useDropdownMenuContext();

  // Button's `size`/`loading` are variants, not DOM attributes, so they skip Floating UI's props.

  return (
    <Button
      data-slot="dropdown-menu-trigger"
      ref={setReference}
      variant={variant}
      size={size}
      loading={loading}
      data-state={isOpen ? 'open' : 'closed'}
      className={cn('data-[state=open]:bg-accent', className)}
      {...getReferenceProps(props)}
    />
  );
}
