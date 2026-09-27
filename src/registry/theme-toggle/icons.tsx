import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

function Icon({ className, children }: ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        'transition-[scale,rotate,opacity] duration-300 motion-reduce:transition-none',
        className,
      )}
    >
      {children}
    </svg>
  );
}

// Both icons are always rendered and swapped with `dark:` classes: no hydration mismatch.
export function SunIcon() {
  return (
    <Icon className="scale-100 rotate-0 dark:scale-50 dark:-rotate-90 dark:opacity-0">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Icon>
  );
}

export function MoonIcon() {
  return (
    <Icon className="absolute scale-50 rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
  );
}
