import type { ComponentType } from 'react';
import AnimatedTabsDemo from '@/demos/animated-tabs-demo';
import CopyButtonDemo from '@/demos/copy-button-demo';
import SwitchCssDemo from '@/demos/switch-css-demo';
import SwitchDemo from '@/demos/switch-demo';
import ToastDemo from '@/demos/toast-demo';

export type CatalogEntry = {
  slug: string;
  title: string;
  description: string;
  /** Techniques used — handy to connect each piece to what you were studying. */
  techniques: string[];
  /** YYYY-MM-DD, newest first on the gallery. */
  addedAt: string;
  Demo: ComponentType;
  /** Source files shown on the page, relative to src/registry. Keep in sync with registry.json. */
  files: string[];
};

/**
 * Every component in the lab. To add one:
 * 1. src/registry/<slug>/<slug>.tsx  — the component
 * 2. src/demos/<slug>-demo.tsx       — a default-exported demo
 * 3. an entry here + an item in registry.json
 */
export const catalog: CatalogEntry[] = [
  {
    slug: 'toast',
    title: 'Toast',
    description:
      'Stacked toasts that fan out on hover, swipe to dismiss, pause while you read, and morph from loading to done.',
    techniques: [
      'AnimatePresence',
      'drag',
      'useAnimate',
      'useSyncExternalStore',
      'ResizeObserver',
      'aria-live',
    ],
    addedAt: '2026-09-27',
    Demo: ToastDemo,
    files: [
      'toast/toaster.tsx',
      'toast/toast-item.tsx',
      'toast/toast-content.tsx',
      'toast/toast-store.ts',
      'toast/use-stack-layout.ts',
      'toast/use-toast-timer.ts',
      'toast/use-page-hidden.ts',
      'toast/config.ts',
      'toast/icons.tsx',
      'toast/index.ts',
    ],
  },
  {
    slug: 'switch',
    title: 'Switch',
    description:
      'Springy, draggable thumb that stretches while pressed. Async (optimistic or pessimistic) with shake-on-error, icons, custom color and native form support.',
    techniques: [
      'layout',
      'drag',
      'whileTap variants',
      'keyframes',
      'AnimatePresence popLayout',
      'a11y: switch role',
      'forms',
    ],
    addedAt: '2026-09-27',
    Demo: SwitchDemo,
    files: [
      'switch/switch.tsx',
      'switch/use-switch-state.ts',
      'switch/use-thumb-drag.ts',
      'switch/switch-thumb.tsx',
      'switch/switch-input.tsx',
      'switch/variants.ts',
      'switch/spinner.tsx',
      'switch/index.ts',
    ],
  },
  {
    slug: 'switch-css',
    title: 'Switch (CSS-only)',
    description:
      'The same switch with zero JS animation. Mash it next to the Motion version to feel spring vs bezier.',
    techniques: ['CSS transitions', 'overshoot bezier', 'group-active', 'spring vs bezier'],
    addedAt: '2026-09-27',
    Demo: SwitchCssDemo,
    files: ['switch-css/switch-css.tsx'],
  },
  {
    slug: 'copy-button',
    title: 'Copy Button',
    description:
      'Icon morphs from copy to check with a blur-scale crossfade, then the check draws itself.',
    techniques: ['AnimatePresence popLayout', 'spring', 'pathLength', 'blur'],
    addedAt: '2026-09-27',
    Demo: CopyButtonDemo,
    files: [
      'copy-button/copy-button.tsx',
      'copy-button/use-copy-to-clipboard.ts',
      'copy-button/icons.tsx',
    ],
  },
  {
    slug: 'animated-tabs',
    title: 'Animated Tabs',
    description:
      'Segmented tabs with a pill that slides between items using a shared layout animation.',
    techniques: ['layoutId', 'spring', 'a11y: tabs pattern'],
    addedAt: '2026-09-27',
    Demo: AnimatedTabsDemo,
    files: [
      'animated-tabs/tabs.tsx',
      'animated-tabs/tabs-list.tsx',
      'animated-tabs/tabs-trigger.tsx',
      'animated-tabs/tabs-content.tsx',
      'animated-tabs/tabs-context.ts',
      'animated-tabs/use-tabs-keyboard.ts',
      'animated-tabs/index.ts',
    ],
  },
].sort((a, b) => b.addedAt.localeCompare(a.addedAt));

export function getEntry(slug: string) {
  return catalog.find((entry) => entry.slug === slug);
}
