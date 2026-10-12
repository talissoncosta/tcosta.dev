'use client';

import { useState } from 'react';
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHue,
  ColorPickerInput,
  ColorPickerSwatches,
  ColorPickerTrigger,
  contrastingText,
} from '@/registry/color-picker';

const swatches = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
];

export default function ColorPickerDemo() {
  const [accent, setAccent] = useState('#3b82f6');

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-64 items-center gap-3 rounded-xl border bg-card p-3 shadow-xs">
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200"
          style={{ backgroundColor: accent, color: contrastingText(accent) }}
        >
          T
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Preview</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full w-2/3 rounded-full transition-colors duration-200"
              style={{ backgroundColor: accent }}
            />
          </div>
        </div>
      </div>

      <ColorPicker value={accent} onValueChange={setAccent}>
        <ColorPickerTrigger>Accent</ColorPickerTrigger>
        {/* Opens below, so the preview above stays in view while you pick. */}
        <ColorPickerContent label="Accent color">
          <ColorPickerArea />
          <div className="flex items-center gap-2">
            <ColorPickerEyeDropper />
            <ColorPickerHue />
          </div>
          <ColorPickerSwatches colors={swatches} />
          <ColorPickerInput />
        </ColorPickerContent>
      </ColorPicker>

      <p className="text-xs text-muted-foreground">
        Drag, or Tab in and use ↑ ↓ ← → (Shift for big steps). Try an invalid hex.
      </p>
    </div>
  );
}
