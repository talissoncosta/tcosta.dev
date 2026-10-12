'use client';

import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '../button';
import { colorName } from './color';
import { useColorPickerContext } from './color-picker-context';

type ColorPickerTriggerProps = Omit<ButtonProps, 'ref'>;

/**
 * Swatch plus the hex code. The hex is visible text, not an `aria-label`, so a voice control user
 * can say what they see ("click 3b82f6"); the color name is added for screen readers.
 */
export function ColorPickerTrigger({
  variant = 'outline',
  size,
  loading,
  className,
  children,
  ...props
}: ColorPickerTriggerProps) {
  const { hex, hsv, isOpen, setReference, getReferenceProps } = useColorPickerContext();

  return (
    <Button
      data-slot="color-picker-trigger"
      ref={setReference}
      variant={variant}
      size={size}
      loading={loading}
      data-state={isOpen ? 'open' : 'closed'}
      className={cn('pl-2 data-[state=open]:bg-accent', className)}
      {...getReferenceProps(props)}
    >
      <span
        aria-hidden
        className="size-5 rounded-sm shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] transition-[background-color] duration-200 motion-reduce:transition-none dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.15)]"
        style={{ backgroundColor: hex }}
      />
      {children}
      <span className="font-mono text-xs text-muted-foreground tabular-nums">{hex}</span>
      <span className="sr-only">, {colorName(hsv)}</span>
    </Button>
  );
}
