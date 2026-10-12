'use client';

import { motion, useAnimate, useReducedMotion } from 'motion/react';
import { useId, useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { parseHex } from './color';
import { useColorPickerContext } from './color-picker-context';
import { partVariants, shakeKeyframes, shakeTransition } from './variants';

type ColorPickerInputProps = {
  label?: string;
  className?: string;
};

/**
 * Hex field. A full `rrggbb` applies while typing; `rgb` shorthand applies on Enter or blur.
 * Anything invalid shakes, is announced, and goes back to the current color.
 */
export function ColorPickerInput({ label = 'Hex', className }: ColorPickerInputProps) {
  const { hex, setHex } = useColorPickerContext();
  const id = useId();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();
  const [draft, setDraft] = useState(hex.slice(1));
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Follow changes made elsewhere (area, swatches), but never overwrite what's being typed.
  const [prevHex, setPrevHex] = useState(hex);
  if (hex !== prevHex) {
    setPrevHex(hex);
    if (!isEditing) setDraft(hex.slice(1));
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const next = event.currentTarget.value.replace(/^#/, '');
    setDraft(next);
    setError(null);
    const parsed = next.length === 6 ? parseHex(next) : null;
    if (parsed) setHex(parsed);
  };

  const commit = () => {
    const parsed = parseHex(draft);
    if (parsed) {
      setHex(parsed);
      setDraft(parsed.slice(1));
      return;
    }
    setError(`${draft || 'Empty'} isn't a hex color. Kept ${hex}.`);
    setDraft(hex.slice(1));
    if (!shouldReduceMotion) animate(scope.current, shakeKeyframes, shakeTransition);
  };

  return (
    <motion.div variants={partVariants} className={cn('flex flex-col gap-1', className)}>
      <div ref={scope} className="flex items-center gap-2">
        <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
        <div
          className={cn(
            'flex h-8 flex-1 items-center rounded-md border bg-background px-2 font-mono text-xs shadow-xs transition-[box-shadow,border-color] duration-150',
            'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
            error && 'border-destructive ring-[3px] ring-destructive/20',
          )}
        >
          <span aria-hidden className="text-muted-foreground">
            #
          </span>
          <input
            id={id}
            data-slot="color-picker-input"
            value={draft}
            onChange={onChange}
            onFocus={(event) => {
              setIsEditing(true);
              event.currentTarget.select();
            }}
            onBlur={() => {
              setIsEditing(false);
              commit();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') commit();
            }}
            maxLength={7}
            spellCheck={false}
            autoComplete="off"
            aria-invalid={error !== null || undefined}
            aria-describedby={`${id}-error`}
            className="w-full min-w-0 bg-transparent pl-0.5 tabular-nums outline-none"
          />
        </div>
      </div>
      <p id={`${id}-error`} aria-live="polite" className="sr-only">
        {error}
      </p>
    </motion.div>
  );
}
