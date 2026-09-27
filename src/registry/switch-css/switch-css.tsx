'use client';

import { useState, type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type SwitchCssProps = Omit<ComponentProps<'button'>, 'onChange' | 'value' | 'children'> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

// Colors are overridable with --switch-on / --switch-thumb.
const trackClassName = cn(
  'group inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 outline-none',
  'transition-colors duration-200 ease-out',
  'bg-input data-[state=unchecked]:hover:bg-muted-foreground/30',
  'data-[state=checked]:bg-[var(--switch-on,var(--color-primary))]',
  'focus-visible:ring-[3px] focus-visible:ring-ring/50',
  'disabled:cursor-not-allowed disabled:opacity-50',
);

const thumbClassName = cn(
  'block size-5 rounded-full shadow-[0_1px_3px_rgb(0_0_0/0.2)]',
  'bg-[var(--switch-thumb,var(--color-background))]',
  'dark:group-data-[state=unchecked]:bg-[var(--switch-thumb,var(--color-foreground))]',
  'group-data-[state=checked]:bg-[var(--switch-thumb,var(--color-primary-foreground))]',
  // An overshooting bezier approximates a spring, but restarts from zero velocity when interrupted.
  'transition-[translate,width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none',
  'group-data-[state=checked]:translate-x-5',
  // Squash while pressed; when on, shift left so it stretches toward where it will go.
  'group-active:w-[25px] group-data-[state=checked]:group-active:translate-x-[15px]',
);

/** The same switch with zero JavaScript animation: CSS transitions only. */
export function SwitchCss({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  className,
  onClick,
  ...props
}: SwitchCssProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const checked = checkedProp ?? uncontrolled;

  return (
    <button
      type="button"
      data-slot="switch"
      role="switch"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (checkedProp === undefined) setUncontrolled(!checked);
        onCheckedChange?.(!checked);
      }}
      className={cn(trackClassName, className)}
      {...props}
    >
      <span data-slot="switch-thumb" className={thumbClassName} />
    </button>
  );
}
