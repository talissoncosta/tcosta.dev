/** Hue in degrees (0–360), saturation and value (brightness) in 0–1. */
export type Hsv = { h: number; s: number; v: number };

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function hsvToRgb({ h, s, v }: Hsv): [number, number, number] {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return [f(5), f(3), f(1)].map((channel) => Math.round(channel * 255)) as [number, number, number];
}

export function hsvToHex(hsv: Hsv) {
  return `#${hsvToRgb(hsv)
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;
}

/** `#rgb` or `#rrggbb`, with or without the `#`. Anything else is null. */
export function parseHex(input: string) {
  const hex = input.trim().replace(/^#/, '').toLowerCase();
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/.test(hex)) return null;
  const full = hex.length === 3 ? [...hex].map((char) => char + char).join('') : hex;
  return `#${full}`;
}

/** `hue` is kept when the color has none (grays), so the hue slider doesn't jump back to red. */
export function hexToHsv(hex: string, hue = 0): Hsv {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);

  let h = hue;
  if (delta > 0) {
    if (max === r) h = 60 * (((g - b) / delta + 6) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }
  return { h, s: max === 0 ? 0 : delta / max, v: max };
}

/** Black or white, whichever reads better on top of `hex` (WCAG relative luminance). */
export function contrastingText(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.179 ? '#000000' : '#ffffff';
}

const hueNames: Array<[limit: number, name: string]> = [
  [15, 'red'],
  [40, 'orange'],
  [65, 'yellow'],
  [90, 'lime'],
  [150, 'green'],
  [185, 'teal'],
  [200, 'cyan'],
  [250, 'blue'],
  [280, 'violet'],
  [320, 'purple'],
  [345, 'pink'],
  [360, 'red'],
];

export function hueName(hue: number) {
  return hueNames.find(([limit]) => hue < limit)?.[1] ?? 'red';
}

/**
 * Plain-language name ("dark muted blue"), so a screen reader says something more useful than
 * three numbers. Approximate on purpose: it describes, it doesn't identify.
 */
export function colorName({ h, s, v }: Hsv) {
  const lightness = v * (1 - s / 2);
  const saturation =
    lightness === 0 || lightness === 1 ? 0 : (v - lightness) / Math.min(lightness, 1 - lightness);

  if (lightness < 0.08) return 'black';
  if (lightness > 0.96 && saturation < 0.3) return 'white';
  const tone = lightness < 0.35 ? 'dark ' : lightness > 0.75 ? 'light ' : '';
  if (saturation < 0.12) return `${tone}gray`;
  const chroma = saturation < 0.4 ? 'muted ' : saturation > 0.85 && tone === '' ? 'vivid ' : '';
  return `${tone}${chroma}${hueName(h)}`;
}
