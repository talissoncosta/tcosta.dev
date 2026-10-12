import { animate, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { thumbFollow, thumbJump } from './variants';

/**
 * A thumb position (0–1) as a CSS percentage that springs to each new value: with a small overshoot
 * after a jump, tightly while dragging. `follow()` marks the next change as part of a drag.
 */
export function useThumbPosition(value: number) {
  const position = useMotionValue(value);
  const isFollowing = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      position.jump(value);
    } else {
      const controls = animate(position, value, isFollowing.current ? thumbFollow : thumbJump);
      return () => controls.stop();
    }
  }, [value, position, shouldReduceMotion]);

  return {
    percent: useTransform(position, (fraction) => `${fraction * 100}%`),
    follow: (isDrag: boolean) => {
      isFollowing.current = isDrag;
    },
  };
}
