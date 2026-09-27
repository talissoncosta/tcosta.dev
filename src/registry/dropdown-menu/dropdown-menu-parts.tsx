import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PartProps = {
  className?: string;
  children?: ReactNode;
};

export function DropdownMenuLabel({ className, children }: PartProps) {
  return (
    <div className={cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', className)}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className }: PartProps) {
  return <div role="separator" className={cn('-mx-1 my-1 h-px bg-border', className)} />;
}

export function DropdownMenuShortcut({ className, children }: PartProps) {
  return (
    <span className={cn('ml-auto pl-4 text-xs tracking-widest text-muted-foreground', className)}>
      {children}
    </span>
  );
}
