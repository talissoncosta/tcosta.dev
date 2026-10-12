import type { KeyboardEvent } from 'react';

export type SliderMove = { axis: 'x' | 'y'; by: number } | { axis: 'x' | 'y'; to: 'min' | 'max' };

/**
 * Keys of the WAI-ARIA slider pattern, in steps: arrows move 1 (10 with Shift), Page Up/Down 10,
 * Home/End to the ends. On a 2D area, left/right is x and up/down is y; on a 1D slider every key
 * moves x. `y` grows upwards, like brightness.
 */
export function sliderMove(event: KeyboardEvent, is2d: boolean): SliderMove | null {
  const step = event.shiftKey ? 10 : 1;
  const vertical = is2d ? 'y' : 'x';

  switch (event.key) {
    case 'ArrowRight':
      return { axis: 'x', by: step };
    case 'ArrowLeft':
      return { axis: 'x', by: -step };
    case 'ArrowUp':
      return { axis: vertical, by: step };
    case 'ArrowDown':
      return { axis: vertical, by: -step };
    case 'PageUp':
      return { axis: vertical, by: 10 };
    case 'PageDown':
      return { axis: vertical, by: -10 };
    case 'Home':
      return { axis: 'x', to: 'min' };
    case 'End':
      return { axis: 'x', to: 'max' };
    default:
      return null;
  }
}
