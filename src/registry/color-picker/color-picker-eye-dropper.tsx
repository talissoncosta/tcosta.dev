'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { IconButton } from '../icon-button';
import { parseHex } from './color';
import { useColorPickerContext } from './color-picker-context';
import { EyeDropperIcon } from './icons';
import { useEyeDropper } from './use-eye-dropper';
import { partVariants } from './variants';

type ColorPickerEyeDropperProps = {
  className?: string;
};

/** Picks a color from anywhere on screen. Renders nothing where the EyeDropper API is missing. */
export function ColorPickerEyeDropper({ className }: ColorPickerEyeDropperProps) {
  const { setHex } = useColorPickerContext();
  const pick = useEyeDropper();
  // Each pick ripples out in the picked color; the key restarts the ripple.
  const [picked, setPicked] = useState<{ hex: string; key: number } | null>(null);

  if (!pick) return null;

  const onClick = async () => {
    const hex = parseHex((await pick()) ?? '');
    if (!hex) return;
    setHex(hex);
    setPicked((prev) => ({ hex, key: (prev?.key ?? 0) + 1 }));
  };

  return (
    <motion.div variants={partVariants} className="relative">
      <IconButton
        data-slot="color-picker-eye-dropper"
        label="Pick a color from the screen"
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={cn('text-muted-foreground', className)}
      >
        <EyeDropperIcon />
      </IconButton>
      <AnimatePresence>
        {picked && (
          <motion.span
            key={picked.key}
            aria-hidden
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => setPicked(null)}
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 0 3px ${picked.hex}` }}
          />
        )}
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">
        {picked ? `Picked ${picked.hex}` : ''}
      </span>
    </motion.div>
  );
}
