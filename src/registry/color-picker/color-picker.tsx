'use client';

import type { ReactNode } from 'react';
import { ColorPickerContext } from './color-picker-context';
import { useColorPicker, type UseColorPickerOptions } from './use-color-picker';

type ColorPickerProps = UseColorPickerOptions & {
  children: ReactNode;
};

export function ColorPicker({ children, ...options }: ColorPickerProps) {
  const picker = useColorPicker(options);
  return <ColorPickerContext value={picker}>{children}</ColorPickerContext>;
}
