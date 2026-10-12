'use client';

import { Composite, CompositeItem } from '@floating-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { colorName, contrastingText, hexToHsv, parseHex } from './color';
import { useColorPickerContext } from './color-picker-context';
import { partVariants, thumbJump, thumbPress } from './variants';

const navigationKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

type ColorPickerSwatchesProps = {
  /** Hex colors. */
  colors: string[];
  columns?: number;
  label?: string;
  className?: string;
};

/**
 * Preset colors as a radio group: Tab lands on the selected one, arrows move and select (roving
 * focus from Floating UI's Composite), and the selection ring slides to the new swatch.
 */
export function ColorPickerSwatches({
  colors,
  columns = 8,
  label = 'Swatches',
  className,
}: ColorPickerSwatchesProps) {
  const { hex, setHex } = useColorPickerContext();
  const ringId = useId();
  const swatches = colors.map((color) => parseHex(color) ?? color);
  const selectedIndex = swatches.indexOf(hex);

  const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0));
  const [prevSelectedIndex, setPrevSelectedIndex] = useState(selectedIndex);
  if (selectedIndex !== prevSelectedIndex) {
    setPrevSelectedIndex(selectedIndex);
    if (selectedIndex !== -1) setActiveIndex(selectedIndex);
  }

  // Composite also navigates on focus (Tab in); only a navigation key should pick a color.
  const isKeyNavigation = useRef(false);

  return (
    <motion.div variants={partVariants}>
      <Composite
        data-slot="color-picker-swatches"
        role="radiogroup"
        aria-label={label}
        orientation="both"
        cols={columns}
        loop
        activeIndex={activeIndex}
        onNavigate={(index) => {
          setActiveIndex(index);
          if (isKeyNavigation.current) setHex(swatches[index]);
          isKeyNavigation.current = false;
        }}
        onKeyDown={(event: KeyboardEvent) => {
          isKeyNavigation.current = navigationKeys.includes(event.key);
        }}
        className={cn('grid gap-1.5', className)}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {swatches.map((swatch) => {
          const isSelected = swatch === hex;
          return (
            <CompositeItem
              key={swatch}
              render={
                <button
                  type="button"
                  data-slot="color-picker-swatch"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${colorName(hexToHsv(swatch))}, ${swatch}`}
                  onClick={() => setHex(swatch)}
                  className="group relative aspect-square cursor-pointer rounded-md outline-none"
                />
              }
            >
              {/* CSS, not whileTap: Motion makes tap targets focusable, which adds a Tab stop. */}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-0 flex items-center justify-center rounded-md shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]',
                  'transition-[scale] duration-200 ease-[cubic-bezier(0.3,1.6,0.5,1)] group-hover:scale-110 group-active:scale-85 motion-reduce:transition-none',
                  'group-focus-visible:ring-[3px] group-focus-visible:ring-ring/50',
                )}
                style={{ backgroundColor: swatch, color: contrastingText(swatch) }}
              >
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.svg
                      key="check"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-3"
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={thumbPress}
                    >
                      <motion.path
                        d="M20 6 9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </span>
              {isSelected && (
                <motion.span
                  layoutId={ringId}
                  aria-hidden
                  transition={thumbJump}
                  className="pointer-events-none absolute -inset-[3px] rounded-[9px] border-2 border-foreground/80"
                />
              )}
            </CompositeItem>
          );
        })}
      </Composite>
    </motion.div>
  );
}
