'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState, type FocusEvent } from 'react';
import { stackTransition } from './config';
import { ToastItem } from './toast-item';
import { useToasts } from './toast-store';
import { usePageHidden } from './use-page-hidden';
import { useStackLayout } from './use-stack-layout';

export function Toaster({ visibleToasts = 3 }: { visibleToasts?: number }) {
  const toasts = useToasts();
  const isPageHidden = usePageHidden();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isExpanded = (isHovered || isFocused) && toasts.length > 0;
  const { onHeight, stackHeight, layoutOf } = useStackLayout(toasts, visibleToasts, isExpanded);

  const onBlur = (event: FocusEvent<HTMLOListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
  };

  return (
    <section
      data-slot="toaster"
      aria-label="Notifications"
      className="pointer-events-none fixed right-4 bottom-4 z-50 w-[min(356px,calc(100vw-2rem))]"
    >
      <motion.ol
        aria-live="polite"
        initial={false}
        animate={{ height: stackHeight }}
        transition={stackTransition}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={onBlur}
        className="pointer-events-auto relative"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast, index) => {
            const isInStack = index < visibleToasts;
            return (
              <ToastItem
                key={toast.id}
                toast={toast}
                index={index}
                total={toasts.length}
                isInStack={isInStack}
                isExpanded={isExpanded}
                isPaused={isExpanded || isPageHidden || !isInStack}
                layout={layoutOf(index)}
                onHeight={onHeight}
              />
            );
          })}
        </AnimatePresence>
      </motion.ol>
    </section>
  );
}
