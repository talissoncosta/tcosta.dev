'use client';

import { FloatingFocusManager, FloatingList } from '@floating-ui/react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownMenuContext } from './dropdown-menu-context';
import { transformOrigin } from './transform-origin';

// Opens a touch slower than it closes; items follow in a short cascade.
const menuVariants: Variants = {
  closed: { opacity: 0, scale: 0.96, transition: { duration: 0.1, ease: 'easeIn' } },
  open: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 0.25, bounce: 0, staggerChildren: 0.02 },
  },
};

type DropdownMenuContentProps = {
  className?: string;
  children: ReactNode;
};

export function DropdownMenuContent({ className, children }: DropdownMenuContentProps) {
  const {
    isOpen,
    placement,
    floatingContext,
    floatingStyles,
    setFloating,
    getFloatingProps,
    elementsRef,
    labelsRef,
  } = useDropdownMenuContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <FloatingFocusManager context={floatingContext} modal={false}>
          <div
            ref={setFloating}
            style={floatingStyles}
            className="z-50 outline-none"
            {...getFloatingProps()}
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ transformOrigin: transformOrigin(placement) }}
              className={cn(
                'min-w-48 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg',
                className,
              )}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
              </FloatingList>
            </motion.div>
          </div>
        </FloatingFocusManager>
      )}
    </AnimatePresence>
  );
}
