import type { Transition } from 'motion/react';

export const DEFAULT_DURATION = 4000;

export const GAP = 12; // between toasts when expanded
export const PEEK = 10; // how much each toast behind peeks out when collapsed
export const SCALE_STEP = 0.05;

// Low bounce: the stack should settle, not wobble.
export const stackTransition: Transition = { type: 'spring', duration: 0.45, bounce: 0.12 };
export const swapTransition: Transition = { type: 'spring', duration: 0.3, bounce: 0 };
