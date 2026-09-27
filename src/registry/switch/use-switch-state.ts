import { useEffect, useState } from 'react';

type UseSwitchStateOptions = {
  checked?: boolean;
  defaultChecked: boolean;
  onCheckedChange?: (checked: boolean) => void | Promise<unknown>;
  mode: 'optimistic' | 'pessimistic';
  loading: boolean;
  disabled?: boolean;
};

const isPromise = (value: unknown): value is Promise<unknown> =>
  typeof (value as Promise<unknown>)?.then === 'function';

/** Controlled/uncontrolled state, plus async changes that show `busy` and revert with `error`. */
export function useSwitchState({
  checked: checkedProp,
  defaultChecked,
  onCheckedChange,
  mode,
  loading,
  disabled,
}: UseSwitchStateOptions) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const [pending, setPending] = useState<boolean | null>(null);
  const [error, setError] = useState(false);

  const isControlled = checkedProp !== undefined;
  const committed = checkedProp ?? uncontrolled;
  const checked = mode === 'optimistic' && pending !== null ? pending : committed;
  const busy = loading || pending !== null;

  // Clear the error once the shake has played.
  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => setError(false), 700);
    return () => clearTimeout(timeout);
  }, [error]);

  const commit = (next: boolean) => {
    if (!isControlled) setUncontrolled(next);
  };

  const change = async (next: boolean) => {
    if (busy || disabled) return;
    setError(false);

    const result = onCheckedChange?.(next);
    if (!isPromise(result)) return commit(next);

    setPending(next);
    try {
      await result;
      commit(next);
    } catch {
      setError(true);
    } finally {
      setPending(null);
    }
  };

  const reset = () => commit(defaultChecked);

  return { checked, busy, error, change, reset };
}
