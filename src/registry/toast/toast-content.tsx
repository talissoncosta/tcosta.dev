import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { swapTransition } from './config';
import { CloseIcon, ToastIcon } from './icons';
import type { ToastData } from './toast-store';

const actionClassName = cn(
  'shrink-0 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground',
  'hover:bg-primary/90 active:scale-[0.97]',
);

const closeClassName = cn(
  '-mt-1 -mr-1 flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity',
  'group-hover:opacity-100 group-focus-visible:opacity-100 focus-visible:opacity-100',
  'hover:bg-accent hover:text-accent-foreground',
);

// Icon and title cross-fade when a promise toast turns into success/error.
const swap = {
  icon: {
    initial: { opacity: 0, scale: 0.5, filter: 'blur(3px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.5, filter: 'blur(3px)' },
  },
  title: {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
  },
};

type ToastContentProps = {
  toast: ToastData;
  onDismiss: () => void;
};

export function ToastContent({ toast, onDismiss }: ToastContentProps) {
  const { type, title, description, action } = toast;

  return (
    <>
      <span className="relative mt-0.5 flex size-4 shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={type} {...swap.icon} transition={swapTransition} className="flex">
            <ToastIcon type={type} />
          </motion.span>
        </AnimatePresence>
      </span>

      <div className="min-w-0 flex-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={type}
            {...swap.title}
            transition={swapTransition}
            className="text-sm font-medium"
          >
            {title}
          </motion.p>
        </AnimatePresence>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>

      {action && (
        <button
          type="button"
          onClick={() => {
            action.onClick();
            onDismiss();
          }}
          className={actionClassName}
        >
          {action.label}
        </button>
      )}

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className={closeClassName}
      >
        <CloseIcon />
      </button>
    </>
  );
}
