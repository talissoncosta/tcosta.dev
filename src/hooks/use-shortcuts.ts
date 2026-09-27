import { useEffect, useEffectEvent } from 'react';

// Keys typed into a field, or with a modifier, belong to the page, not to the shortcuts.
function isShortcut(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey) return false;
  return !(event.target as HTMLElement).closest('input, textarea, select, [contenteditable]');
}

/** Single-key shortcuts on the window, e.g. `useShortcuts({ r: replay })`. */
export function useShortcuts(shortcuts: Record<string, () => void>) {
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (isShortcut(event)) shortcuts[event.key]?.();
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => onKeyDown(event);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);
}
