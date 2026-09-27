import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { GAP, PEEK } from './config';
import type { ToastData } from './toast-store';

type OnHeight = (id: number, height: number) => void;

/** Position of each toast in the stack, from their measured heights. */
export function useStackLayout(toasts: ToastData[], visibleToasts: number, isExpanded: boolean) {
  const [heights, setHeights] = useState<Record<number, number>>({});

  const onHeight = useCallback<OnHeight>((id, height) => {
    setHeights((prev) => (prev[id] === height ? prev : { ...prev, [id]: height }));
  }, []);

  const shown = toasts.slice(0, visibleToasts);
  const heightOf = (toast: ToastData) => heights[toast.id] ?? 0;
  const frontHeight = shown[0] ? heightOf(shown[0]) : 0;
  const gaps = Math.max(shown.length - 1, 0);

  const stackHeight = isExpanded
    ? shown.reduce((sum, toast) => sum + heightOf(toast), 0) + GAP * gaps
    : frontHeight + PEEK * gaps;

  // Expanded: stacked above the newer toasts in front. Collapsed: peeking behind the front one.
  const layoutOf = (index: number) => {
    const offset = shown.slice(0, index).reduce((sum, toast) => sum + heightOf(toast) + GAP, 0);
    return {
      y: isExpanded ? -offset : -index * PEEK,
      height: isExpanded || index === 0 ? heights[toasts[index].id] : frontHeight,
    };
  };

  return { onHeight, stackHeight, layoutOf };
}

/** Reports the element's natural height, now and whenever it resizes. */
export function useReportHeight<T extends HTMLElement>(id: number, onHeight: OnHeight) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(() => onHeight(id, element.offsetHeight));
    observer.observe(element);
    onHeight(id, element.offsetHeight);
    return () => observer.disconnect();
  }, [id, onHeight]);

  return ref;
}
