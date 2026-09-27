'use client';

import type { ComponentProps, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { IconButton } from '../icon-button';
import { MoonIcon, SunIcon } from './icons';
import { useThemeTransition } from './use-theme-transition';

type ThemeToggleProps = Omit<ComponentProps<typeof IconButton>, 'label' | 'children'>;

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
    <IconButton
      data-slot="theme-toggle"
      label="Toggle theme"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={cn('rounded-full text-muted-foreground', className)}
      {...props}
    >
      <>
        <SunIcon />
        <MoonIcon />
      </>
    </IconButton>
  );
}
