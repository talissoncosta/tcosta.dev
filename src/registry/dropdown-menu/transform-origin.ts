import type { Placement } from '@floating-ui/react';

const alignX = { start: 'left', end: 'right' } as const;
const alignY = { start: 'top', end: 'bottom' } as const;

/** The corner or edge touching the trigger, so the menu grows out of it (also after a flip). */
export function transformOrigin(placement: Placement) {
  const [side, align] = placement.split('-') as [string, 'start' | 'end' | undefined];

  if (side === 'top' || side === 'bottom') {
    return `${align ? alignX[align] : 'center'} ${side === 'bottom' ? 'top' : 'bottom'}`;
  }
  return `${side === 'right' ? 'left' : 'right'} ${align ? alignY[align] : 'center'}`;
}
