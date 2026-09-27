import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '../button';
import { iconButtonVariants } from './icon-button-variants';

type IconButtonProps = Omit<ButtonProps, 'children' | 'aria-label'> & {
  /** Accessible name. Required: an icon alone says nothing to a screen reader. */
  label: string;
  children: ReactElement;
};

export function IconButton({ label, size, className, ...props }: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      size={size}
      className={cn(iconButtonVariants({ size }), className)}
      {...props}
    />
  );
}
