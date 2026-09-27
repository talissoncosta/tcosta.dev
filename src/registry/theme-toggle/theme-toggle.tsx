'use client';

import type { ComponentProps, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from './icons';
import { useThemeTransition } from './use-theme-transition';

type ThemeToggleProps = Omit<ComponentProps<'button'>, 'children'>;

export function ThemeToggle({ className, onClick, ...props }: ThemeToggleProps) {
  const toggleTheme = useThemeTransition();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // Keyboard clicks have no pointer position: grow from the button's center instead.
    const rect = event.currentTarget.getBoundingClientRect();
    const fromPointer = event.clientX !== 0 || event.clientY !== 0;
    toggleTheme({
      x: fromPointer ? event.clientX : rect.left + rect.width / 2,
      y: fromPointer ? event.clientY : rect.top + rect.height / 2,
    });
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={handleClick}
      className={cn(
        'relative inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
}
