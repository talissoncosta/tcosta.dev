import type { Transition, Variants } from 'motion/react';

// Grows out of the trigger like the dropdown menu; the parts follow in a short cascade.
export const contentVariants: Variants = {
  closed: { opacity: 0, scale: 0.94, transition: { duration: 0.12, ease: 'easeIn' } },
  open: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 0.3, bounce: 0.1, staggerChildren: 0.03 },
  },
};

/** On a part's root, so it joins the content's cascade. */
export const partVariants: Variants = {
  closed: { opacity: 0, y: 4, filter: 'blur(2px)', transition: { duration: 0.1 } },
  open: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.2, ease: 'easeOut' } },
};

/** A jump (click on the track, a key press) lands with a little overshoot. */
export const thumbJump: Transition = { type: 'spring', duration: 0.35, bounce: 0.25 };
/** While dragging, the thumb stays glued to the pointer, just smoothed. */
export const thumbFollow: Transition = { type: 'spring', stiffness: 1400, damping: 80 };

/** The thumb swells under the finger, so you can see the color you're on. */
export const thumbPress: Transition = { type: 'spring', duration: 0.25, bounce: 0.4 };

export const shakeKeyframes = { x: [0, -5, 5, -3, 3, 0] };
export const shakeTransition: Transition = { duration: 0.4, ease: 'easeInOut' };

export const thumbClassName = [
  'pointer-events-none absolute size-4 -translate-1/2 rounded-full',
  'shadow-[0_0_0_2px_white,0_0_0_3px_rgb(0_0_0/0.2),0_2px_6px_rgb(0_0_0/0.25)]',
  'has-[input:focus-visible]:shadow-[0_0_0_2px_white,0_0_0_5px_var(--color-ring),0_2px_6px_rgb(0_0_0/0.25)]',
].join(' ');
