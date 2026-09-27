import type { PanInfo } from 'motion/react';
import { useRef } from 'react';

type UseThumbDragOptions = {
  checked: boolean;
  travel: number;
  onToggle: () => void;
};

/** Dragging the thumb past half its travel toggles the switch. */
export function useThumbDrag({ checked, travel, onToggle }: UseThumbDragOptions) {
  const dragged = useRef(false);

  const dragProps = {
    dragConstraints: checked ? { left: -travel, right: 0 } : { left: 0, right: travel },
    onDragStart: () => {
      dragged.current = true;
    },
    onDragEnd: (_: unknown, info: PanInfo) => {
      const isPastHalf = checked ? info.offset.x < -travel / 2 : info.offset.x > travel / 2;
      if (isPastHalf) onToggle();
    },
  };

  return {
    dragProps,
    // A drag also ends in a click, which must be ignored: the drag already decided.
    wasDragged: () => dragged.current,
    resetDrag: () => {
      dragged.current = false;
    },
  };
}
