import type { KeyboardEvent } from 'react';

function nextIndex(key: string, current: number, count: number) {
  switch (key) {
    case 'ArrowRight':
      return (current + 1) % count;
    case 'ArrowLeft':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
  }
}

/** WAI-ARIA tabs keyboard pattern: ←/→ move (wrapping), Home/End jump. */
export function useTabsKeyboard(onSelect: (value: string) => void) {
  return (event: KeyboardEvent<HTMLElement>) => {
    const tabs = [...event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')];
    const next = nextIndex(event.key, tabs.indexOf(event.target as HTMLElement), tabs.length);
    if (next === undefined) return;

    event.preventDefault();
    tabs[next].focus();
    onSelect(tabs[next].dataset.value!);
  };
}
