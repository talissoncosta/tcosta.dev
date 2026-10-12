import { useSyncExternalStore } from 'react';

type EyeDropperConstructor = new () => { open: () => Promise<{ sRGBHex: string }> };

const getEyeDropper = () =>
  (globalThis as { EyeDropper?: EyeDropperConstructor }).EyeDropper ?? null;

const subscribe = () => () => {};

/**
 * The EyeDropper API (Chromium only for now). `null` on the server and where it's missing, so the
 * button only renders where it works.
 */
export function useEyeDropper() {
  const EyeDropper = useSyncExternalStore(subscribe, getEyeDropper, () => null);
  if (!EyeDropper) return null;

  /** Resolves with the picked hex, or null when the user cancels with Esc. */
  return async () => {
    try {
      const { sRGBHex } = await new EyeDropper().open();
      return sRGBHex;
    } catch {
      return null;
    }
  };
}
