export const frames = [
  { label: '1:1', ratio: 1, size: '1080×1080' },
  { label: '4:5', ratio: 4 / 5, size: '1080×1350' },
  { label: '16:9', ratio: 16 / 9, size: '1920×1080' },
];

export const zooms = [1, 1.25, 1.5, 2];

export type Frame = (typeof frames)[number];
