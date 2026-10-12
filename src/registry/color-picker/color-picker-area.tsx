'use client';

import { motion } from 'motion/react';
import { useRef, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { clamp, colorName } from './color';
import { useColorPickerContext } from './color-picker-context';
import { sliderMove } from './slider-keys';
import { usePointerPosition } from './use-pointer-position';
import { useThumbPosition } from './use-thumb-position';
import { partVariants, thumbClassName, thumbPress } from './variants';

type ColorPickerAreaProps = {
  className?: string;
};

/**
 * Saturation (x) and brightness (y). There is no ARIA pattern for a 2D slider, so it's two native
 * range inputs inside the thumb: screen readers can adjust each one (VoiceOver swipes, TalkBack
 * volume keys), and both announce the whole color. Only saturation is in the Tab order; its arrow
 * keys move both axes.
 */
export function ColorPickerArea({ className }: ColorPickerAreaProps) {
  const { hsv, hex, setColor } = useColorPickerContext();
  const saturationRef = useRef<HTMLInputElement>(null);
  const x = useThumbPosition(hsv.s);
  const y = useThumbPosition(1 - hsv.v);

  const { isDragging, pointerProps } = usePointerPosition((position, phase) => {
    x.follow(phase === 'move');
    y.follow(phase === 'move');
    setColor({ ...hsv, s: position.x, v: 1 - position.y });
    if (phase === 'start') saturationRef.current?.focus({ preventScroll: true });
  });

  const onKeyDown = (event: KeyboardEvent) => {
    const move = sliderMove(event, true);
    if (!move) return;
    event.preventDefault();
    x.follow(false);
    y.follow(false);
    const channel = move.axis === 'x' ? 's' : 'v';
    const next =
      'to' in move
        ? Number(move.to === 'max')
        : clamp(Math.round(hsv[channel] * 100 + move.by) / 100);
    setColor({ ...hsv, [channel]: next });
  };

  const saturation = Math.round(hsv.s * 100);
  const brightness = Math.round(hsv.v * 100);
  const name = colorName(hsv);

  return (
    <motion.div
      data-slot="color-picker-area"
      variants={partVariants}
      role="group"
      aria-label="Saturation and brightness"
      onKeyDown={onKeyDown}
      {...pointerProps}
      className={cn(
        'relative h-40 cursor-crosshair touch-none rounded-lg shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]',
        className,
      )}
      style={{
        background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${hsv.h} 100% 50%)`,
      }}
    >
      <motion.div
        data-slot="color-picker-area-thumb"
        className={thumbClassName}
        style={{ left: x.percent, top: y.percent, backgroundColor: hex }}
        animate={{ scale: isDragging ? 1.6 : 1 }}
        transition={thumbPress}
      >
        <input
          ref={saturationRef}
          type="range"
          aria-roledescription="2D slider"
          aria-label="Saturation"
          aria-valuetext={`Saturation ${saturation}%, brightness ${brightness}%, ${name}`}
          min={0}
          max={100}
          value={saturation}
          onChange={(event) => setColor({ ...hsv, s: event.target.valueAsNumber / 100 })}
          className="sr-only"
        />
        <input
          type="range"
          tabIndex={-1}
          aria-roledescription="2D slider"
          aria-label="Brightness"
          aria-valuetext={`Brightness ${brightness}%, saturation ${saturation}%, ${name}`}
          min={0}
          max={100}
          value={brightness}
          onChange={(event) => setColor({ ...hsv, v: event.target.valueAsNumber / 100 })}
          className="sr-only"
        />
      </motion.div>
    </motion.div>
  );
}
