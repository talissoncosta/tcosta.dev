'use client';

import { motion } from 'motion/react';
import { useRef, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { clamp, hueName } from './color';
import { useColorPickerContext } from './color-picker-context';
import { sliderMove } from './slider-keys';
import { usePointerPosition } from './use-pointer-position';
import { useThumbPosition } from './use-thumb-position';
import { partVariants, thumbClassName, thumbPress } from './variants';

const rainbow =
  'linear-gradient(to right, #f00 0%, #ff0 16.67%, #0f0 33.33%, #0ff 50%, #00f 66.67%, #f0f 83.33%, #f00 100%)';

type ColorPickerHueProps = {
  className?: string;
};

/** A native range input under a custom track, so it's a real slider to every assistive tech. */
export function ColorPickerHue({ className }: ColorPickerHueProps) {
  const { hsv, setColor } = useColorPickerContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const x = useThumbPosition(hsv.h / 360);

  const { isDragging, pointerProps } = usePointerPosition((position, phase) => {
    x.follow(phase === 'move');
    setColor({ ...hsv, h: position.x * 360 });
    if (phase === 'start') inputRef.current?.focus({ preventScroll: true });
  });

  const onKeyDown = (event: KeyboardEvent) => {
    const move = sliderMove(event, false);
    if (!move) return;
    event.preventDefault();
    x.follow(false);
    const h =
      'to' in move ? (move.to === 'max' ? 360 : 0) : clamp(Math.round(hsv.h) + move.by, 0, 360);
    setColor({ ...hsv, h });
  };

  const hue = Math.round(hsv.h);

  return (
    <motion.div
      data-slot="color-picker-hue"
      variants={partVariants}
      onKeyDown={onKeyDown}
      {...pointerProps}
      className={cn(
        'relative h-3 flex-1 cursor-pointer touch-none rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]',
        className,
      )}
      style={{ background: rainbow }}
    >
      <motion.div
        data-slot="color-picker-hue-thumb"
        className={cn(thumbClassName, 'top-1/2')}
        style={{ left: x.percent, backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
        animate={{ scale: isDragging ? 1.4 : 1 }}
        transition={thumbPress}
      >
        <input
          ref={inputRef}
          type="range"
          aria-label="Hue"
          aria-valuetext={`${hue} degrees, ${hueName(hsv.h)}`}
          min={0}
          max={360}
          value={hue}
          onChange={(event) => setColor({ ...hsv, h: event.target.valueAsNumber })}
          className="sr-only"
        />
      </motion.div>
    </motion.div>
  );
}
