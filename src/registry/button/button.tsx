'use client';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button-variants';
import { Spinner } from './spinner';

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Shows a spinner in place of the content, keeping the button's width. Stays focusable. */
    loading?: boolean;
  };

export function Button({
  variant,
  size,
  loading = false,
  type = 'button',
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      data-slot="button"
      type={type}
      aria-busy={loading || undefined}
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {/* The content stays in the layout while loading, so the width never jumps. */}
      <span
        className={cn(
          'inline-flex items-center gap-[inherit] transition-[opacity,filter] duration-150 motion-reduce:transition-none',
          loading && 'opacity-0 blur-[2px]',
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-[opacity,scale] duration-150 motion-reduce:transition-none',
          loading ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
        )}
      >
        <Spinner />
      </span>
    </button>
  );
}
