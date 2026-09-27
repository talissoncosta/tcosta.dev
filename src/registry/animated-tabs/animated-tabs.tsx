'use client';

import { motion, type Transition } from 'motion/react';
import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';

export type AnimatedTab = { value: string; label: ReactNode };

type AnimatedTabsProps = {
  tabs: AnimatedTab[];
  value: string;
  onValueChange: (value: string) => void;
  /** Accessible name for the tab list. */
  label: string;
  /** Base id used to link tabs and panels. Pass one if you render panels (see `tabPanelProps`). */
  id?: string;
  className?: string;
};

/** Props for a panel so it is correctly linked to its tab. */
export function tabPanelProps(id: string, value: string) {
  return {
    role: 'tabpanel' as const,
    id: `${id}-panel-${value}`,
    'aria-labelledby': `${id}-tab-${value}`,
    tabIndex: 0,
  };
}

// Snappy with a hint of overshoot, so the pill feels physical when it lands.
const indicatorTransition: Transition = { type: 'spring', duration: 0.35, bounce: 0.2 };

/**
 * Segmented tabs whose active pill slides between items (shared layout animation).
 * Implements the WAI-ARIA tabs keyboard pattern: ←/→ move, Home/End jump.
 * Link panels with `tabPanelProps(id, value)`.
 */
export function AnimatedTabs({
  tabs,
  value,
  onValueChange,
  label,
  id: idProp,
  className = '',
}: AnimatedTabsProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = tabs.findIndex((t) => t.value === value);
    const last = tabs.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? current === last
          ? 0
          : current + 1
        : event.key === 'ArrowLeft'
          ? current === 0
            ? last
            : current - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1;
    if (next === -1) return;
    event.preventDefault();
    onValueChange(tabs[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`inline-flex items-center gap-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800 ${className}`}
    >
      {tabs.map((tab, i) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${tab.value}`}
            aria-selected={selected}
            aria-controls={`${id}-panel-${tab.value}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(tab.value)}
            className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 ${
              selected
                ? 'text-neutral-900 dark:text-neutral-50'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            {selected && (
              <motion.span
                layoutId={`${id}-indicator`}
                transition={indicatorTransition}
                className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-black/5 dark:bg-neutral-950 dark:ring-white/10"
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
