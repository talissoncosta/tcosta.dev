import { useState } from 'react';

/** Remount a subtree (pass `key`) so its entrance animations run again. */
export function useReplay() {
  const [key, setKey] = useState(0);
  return { key, replay: () => setKey((n) => n + 1) };
}
