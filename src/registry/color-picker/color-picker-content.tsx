'use client';

import { FloatingFocusManager } from '@floating-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useColorPickerContext } from './color-picker-context';
import { transformOrigin } from './transform-origin';
import { contentVariants } from './variants';

type ColorPickerContentProps = {
  /** Accessible name of the dialog. */
  label?: string;
  className?: string;
  children: ReactNode;
};

export function ColorPickerContent({
  label = 'Color picker',
  className,
  children,
}: ColorPickerContentProps) {
  const { isOpen, placement, floatingContext, floatingStyles, setFloating, getFloatingProps } =
    useColorPickerContext();

  return (
    <AnimatePresence>
      {isOpen && (
        // Not modal: the page stays reachable, and Tab out or Esc closes it. Focus goes to the area.
        <FloatingFocusManager context={floatingContext} modal={false}>
          <div
            data-slot="color-picker-content"
            ref={setFloating}
            style={floatingStyles}
            aria-label={label}
            className="z-50 outline-none"
            {...getFloatingProps()}
          >
            <motion.div
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ transformOrigin: transformOrigin(placement) }}
              className={cn(
                'flex w-64 flex-col gap-3 rounded-xl border bg-popover p-3 text-popover-foreground shadow-lg',
                className,
              )}
            >
              {children}
            </motion.div>
          </div>
        </FloatingFocusManager>
      )}
    </AnimatePresence>
  );
}
