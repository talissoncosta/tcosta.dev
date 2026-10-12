import { useState, type PointerEvent } from 'react';
import { clamp } from './color';

export type PointerPhase = 'start' | 'move';

/**
 * Reports where the pointer is inside the element, as fractions (0–1) of its width and height.
 * Pointer capture keeps the drag going outside the element, and the thumb pinned to its edge.
 */
export function usePointerPosition(
  onPosition: (position: { x: number; y: number }, phase: PointerPhase) => void,
) {
  const [isDragging, setIsDragging] = useState(false);

  const report = (event: PointerEvent<HTMLElement>, phase: PointerPhase) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onPosition(
      {
        x: clamp((event.clientX - rect.left) / rect.width),
        y: clamp((event.clientY - rect.top) / rect.height),
      },
      phase,
    );
  };

  const pointerProps = {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      // No mousedown follows, so focus doesn't leave the slider's input and no text gets selected.
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
      report(event, 'start');
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) report(event, 'move');
    },
    onLostPointerCapture: () => setIsDragging(false),
  };

  return { isDragging, pointerProps };
}
