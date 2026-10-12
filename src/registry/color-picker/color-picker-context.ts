'use client';

import { createContext, useContext } from 'react';
import type { ColorPickerState } from './use-color-picker';

export const ColorPickerContext = createContext<ColorPickerState | null>(null);

export function useColorPickerContext() {
  const context = useContext(ColorPickerContext);
  if (!context) throw new Error('ColorPicker parts must be rendered inside <ColorPicker>.');
  return context;
}
