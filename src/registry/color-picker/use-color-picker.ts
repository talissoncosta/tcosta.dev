import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  type Placement,
} from '@floating-ui/react';
import { useState } from 'react';
import { hexToHsv, hsvToHex, parseHex, type Hsv } from './color';

export type UseColorPickerOptions = {
  /** Hex color (`#rrggbb`). Pass it to control the picker. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placement?: Placement;
};

/**
 * Color state plus the popover. The color lives as HSV so hue survives grays and black (a hex has
 * no hue there), and the area and hue slider don't jump while you drag through them.
 */
export function useColorPicker({
  value,
  defaultValue = '#000000',
  onValueChange,
  placement = 'bottom-start',
}: UseColorPickerOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(parseHex(value ?? defaultValue) ?? '#000000'));
  const hex = hsvToHex(hsv);

  // Controlled: take a new `value` from the parent, unless it's the color we already show.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    const parsed = value === undefined ? null : parseHex(value);
    if (parsed && parsed !== hex) setHsv(hexToHsv(parsed, hsv.h));
  }

  const setColor = (next: Hsv) => {
    setHsv(next);
    const nextHex = hsvToHex(next);
    if (nextHex !== hex) onValueChange?.(nextHex);
  };

  const setHex = (next: string) => setColor(hexToHsv(next, hsv.h));

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    // Same as the dropdown menu: fixed and rendered in place, so it escapes `overflow: hidden`.
    strategy: 'fixed',
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const interactions = useInteractions([
    useClick(floating.context),
    useRole(floating.context, { role: 'dialog' }),
    useDismiss(floating.context),
  ]);

  return {
    ...interactions,
    hsv,
    hex,
    setColor,
    setHex,
    isOpen,
    setIsOpen,
    placement: floating.placement,
    floatingContext: floating.context,
    floatingStyles: floating.floatingStyles,
    setReference: floating.refs.setReference,
    setFloating: floating.refs.setFloating,
  };
}

export type ColorPickerState = ReturnType<typeof useColorPicker>;
