import type { ComponentType } from 'react';
import AnimatedTabsDemo from '@/demos/animated-tabs-demo';
import ButtonDemo from '@/demos/button-demo';
import CopyButtonDemo from '@/demos/copy-button-demo';
import DropdownMenuDemo from '@/demos/dropdown-menu-demo';
import IconButtonDemo from '@/demos/icon-button-demo';
import SwitchCardDemo from '@/demos/switch-card-demo';
import SwitchCssDemo from '@/demos/switch-css-demo';
import SwitchDemo from '@/demos/switch-demo';
import ThemeToggleDemo from '@/demos/theme-toggle-demo';
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
  /** Smaller demo for gallery cards, when the full one is too big for them. */
  CardDemo?: ComponentType;
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
    slug: 'button',
    title: 'Button',
    description:
      'Five variants, three sizes, a press that gives, and a loading state that keeps the width.',
    techniques: ['cva', 'active:scale', 'aria-busy', 'CSS-only transitions'],
    addedAt: '2026-09-27',
    Demo: ButtonDemo,
    files: [
      'button/button.tsx',
      'button/button-variants.ts',
      'button/spinner.tsx',
      'button/index.ts',
    ],
  },
  {
    slug: 'icon-button',
    title: 'Icon Button',
    description:
      "Square button for a single icon. Its accessible name is required by the type, so it can't ship unlabeled.",
    techniques: ['required label (types)', 'cva', 'builds on Button'],
    addedAt: '2026-09-27',
    Demo: IconButtonDemo,
    files: [
      'icon-button/icon-button.tsx',
      'icon-button/icon-button-variants.ts',
      'icon-button/index.ts',
    ],
  },
  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    description:
      'Menu that grows out of its trigger, even after flipping, with a quick item cascade, typeahead and full keyboard support.',
    techniques: [
      'transform-origin',
      'staggerChildren',
      'Floating UI',
      'a11y: menu pattern',
      'compound components',
    ],
    addedAt: '2026-09-27',
    Demo: DropdownMenuDemo,
    files: [
      'dropdown-menu/dropdown-menu.tsx',
      'dropdown-menu/dropdown-menu-trigger.tsx',
      'dropdown-menu/dropdown-menu-content.tsx',
      'dropdown-menu/dropdown-menu-item.tsx',
      'dropdown-menu/dropdown-menu-parts.tsx',
      'dropdown-menu/use-dropdown-menu.ts',
      'dropdown-menu/transform-origin.ts',
      'dropdown-menu/dropdown-menu-context.ts',
      'dropdown-menu/index.ts',
    ],
  },
  {
    slug: 'theme-toggle',
    title: 'Theme Toggle',
    description:
      'Light/dark switch where the new theme grows in a circle from the click, with a sun/moon morph.',
    techniques: ['View Transitions API', 'clip-path', 'next-themes', 'reduced motion'],
    addedAt: '2026-09-27',
    Demo: ThemeToggleDemo,
    files: [
      'theme-toggle/theme-toggle.tsx',
      'theme-toggle/use-theme-transition.ts',
      'theme-toggle/icons.tsx',
      'theme-toggle/index.ts',
    ],
  },
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
    CardDemo: SwitchCardDemo,
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
