import { motion, useAnimate, type PanInfo } from 'motion/react';
import { cn } from '@/lib/utils';
import { DEFAULT_DURATION, SCALE_STEP, stackTransition } from './config';
import { ToastContent } from './toast-content';
import { dismiss, type ToastData } from './toast-store';
import { useReportHeight } from './use-stack-layout';
import { useToastTimer } from './use-toast-timer';

type ToastItemProps = {
  toast: ToastData;
  index: number;
  total: number;
  isInStack: boolean;
  isExpanded: boolean;
  isPaused: boolean;
  layout: { y: number; height: number | undefined };
  onHeight: (id: number, height: number) => void;
};

const itemClassName = cn(
  'group absolute inset-x-0 bottom-0 cursor-grab touch-pan-y overflow-hidden outline-none active:cursor-grabbing',
  'rounded-xl border bg-popover text-popover-foreground shadow-[0_4px_16px_rgb(0_0_0/0.08)]',
  'focus-visible:ring-[3px] focus-visible:ring-ring/50',
);

export function ToastItem({
  toast,
  index,
  total,
  isInStack,
  isExpanded,
  isPaused,
  layout,
  onHeight,
}: ToastItemProps) {
  const [scope, animate] = useAnimate<HTMLLIElement>();
  const content = useReportHeight<HTMLDivElement>(toast.id, onHeight);
  const isFront = index === 0;

  useToastTimer({
    id: toast.id,
    type: toast.type,
    duration: toast.duration ?? DEFAULT_DURATION,
    isPaused,
  });

  // Removing a focused element doesn't fire `blur`, which would leave the stack expanded and paused.
  const dismissSelf = () => {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && scope.current?.contains(focused)) focused.blur();
    dismiss(toast.id);
  };

  // Swiped far or fast enough: fly out, then dismiss. Otherwise it springs back.
  const onDragEnd = async (_: unknown, info: PanInfo) => {
    if (info.offset.x < 80 && info.velocity.x < 400) return;
    await animate(scope.current, { x: 420, opacity: 0 }, { duration: 0.18, ease: 'easeOut' });
    dismissSelf();
  };

  return (
    <motion.li
      ref={scope}
      tabIndex={0}
      aria-hidden={!isInStack || undefined}
      initial={{ opacity: 0, y: 32 }}
      animate={{
        opacity: isInStack ? 1 : 0,
        y: layout.y,
        scale: isExpanded ? 1 : 1 - index * SCALE_STEP,
        height: layout.height ?? 'auto',
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } }}
      transition={stackTransition}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0.04, right: 0.8 }}
      onDragEnd={onDragEnd}
      onKeyDown={(event) => event.key === 'Escape' && dismissSelf()}
      style={{ zIndex: total - index, transformOrigin: 'top center' }}
      className={cn(itemClassName, !isInStack && 'pointer-events-none')}
    >
      {/* Toasts behind the front one hide their content, so only their edge peeks. */}
      <motion.div
        ref={content}
        initial={false}
        animate={{ opacity: isExpanded || isFront ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-start gap-3 p-4"
      >
        <ToastContent toast={toast} onDismiss={dismissSelf} />
      </motion.div>
    </motion.li>
  );
}
