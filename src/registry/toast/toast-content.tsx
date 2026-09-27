import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { swapTransition } from './config';
import { CloseIcon, ToastIcon } from './icons';
import type { ToastData } from './toast-store';

// Revealed on hover/focus, so it also transitions opacity.
const closeClassName = cn(
  '-mt-1 -mr-1 size-6 text-muted-foreground opacity-0 transition-[opacity,color,background-color,scale]',
  'group-hover:opacity-100 group-focus-visible:opacity-100 focus-visible:opacity-100',
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
        <Button
          data-slot="toast-action"
          size="sm"
          onClick={() => {
            action.onClick();
            onDismiss();
          }}
          className="h-7 px-2.5"
        >
          {action.label}
        </Button>
      )}

      <IconButton
        data-slot="toast-close"
        label="Dismiss notification"
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className={closeClassName}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
}
