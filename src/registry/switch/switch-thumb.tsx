import { AnimatePresence, motion, type DragHandler } from 'motion/react';
import type { ReactNode } from 'react';
import { Spinner } from './spinner';
import {
  fadeTransition,
  iconVariants,
  thumbClassName,
  thumbSizes,
  thumbTransition,
  type SwitchSize,
} from './variants';

type SwitchThumbProps = {
  size: SwitchSize;
  checked: boolean;
  busy: boolean;
  draggable: boolean;
  icon?: ReactNode;
  dragProps: {
    dragConstraints: { left: number; right: number };
    onDragStart: () => void;
    onDragEnd: DragHandler;
  };
};

export function SwitchThumb({ size, checked, busy, draggable, icon, dragProps }: SwitchThumbProps) {
  const { thumb, stretched } = thumbSizes[size];
  const iconSize = thumb - 8;

  return (
    <motion.span
      layout
      transition={thumbTransition}
      variants={{ idle: { width: thumb }, pressed: { width: stretched } }}
      style={{ height: thumb }}
      drag={draggable ? 'x' : false}
      dragElastic={0.08}
      dragMomentum={false}
      dragSnapToOrigin
      {...dragProps}
      className={thumbClassName}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {(busy || icon) && (
          <motion.span
            key={busy ? 'spinner' : String(checked)}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={fadeTransition}
            className="flex [&>svg]:size-full"
            style={{ width: iconSize, height: iconSize }}
          >
            {busy ? <Spinner size={iconSize} /> : icon}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
}
