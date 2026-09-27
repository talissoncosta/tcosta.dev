import { cva } from 'class-variance-authority';
import type { Transition, Variants } from 'motion/react';

// Colors are overridable with --switch-on / --switch-thumb.
export const trackVariants = cva(
  [
    'group relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 outline-none',
    'transition-[background-color,box-shadow] duration-200 ease-out',
    'bg-input data-[state=unchecked]:hover:bg-muted-foreground/30',
    'data-[state=checked]:bg-[var(--switch-on,var(--color-primary))]',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'data-error:ring-2 data-error:ring-destructive/60',
    'disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-progress',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
      },
      checked: {
        true: 'justify-end',
        false: 'justify-start',
      },
    },
  },
);

export const thumbClassName = [
  'flex items-center justify-center rounded-full shadow-[0_1px_3px_rgb(0_0_0/0.2)]',
  'bg-[var(--switch-thumb,var(--color-background))]',
  'dark:group-data-[state=unchecked]:bg-[var(--switch-thumb,var(--color-foreground))]',
  'group-data-[state=checked]:bg-[var(--switch-thumb,var(--color-primary-foreground))]',
  'text-muted-foreground group-data-[state=checked]:text-[var(--switch-on,var(--color-primary))]',
].join(' ');

// Pixel sizes drive the motion values (width while pressed, drag distance).
export const thumbSizes = {
  sm: { thumb: 16, stretched: 20, travel: 16 },
  md: { thumb: 20, stretched: 25, travel: 20 },
};

export type SwitchSize = keyof typeof thumbSizes;

// A little overshoot so the thumb "lands" instead of stopping dead.
export const thumbTransition: Transition = { type: 'spring', duration: 0.35, bounce: 0.3 };
export const fadeTransition: Transition = { type: 'spring', duration: 0.25, bounce: 0 };

export const shakeVariants: Variants = {
  idle: { x: 0 },
  error: { x: [0, -5, 5, -3, 3, 0], transition: { duration: 0.4, ease: 'easeInOut' } },
};

export const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, filter: 'blur(2px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
};
