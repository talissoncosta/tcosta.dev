import { useEffect, useRef } from 'react';
import { dismiss, type ToastType } from './toast-store';

type UseToastTimerOptions = {
  id: number;
  type: ToastType;
  duration: number;
  isPaused: boolean;
};

/** Auto-dismiss countdown that pauses, and remembers the time left, while `isPaused`. */
export function useToastTimer({ id, type, duration, isPaused }: UseToastTimerOptions) {
  const remaining = useRef(duration);

  // A promise toast that settles gets a fresh countdown.
  useEffect(() => {
    remaining.current = duration;
  }, [duration, type]);

  useEffect(() => {
    if (isPaused || !Number.isFinite(duration)) return;
    const started = Date.now();
    const timeout = setTimeout(() => dismiss(id), remaining.current);
    return () => {
      clearTimeout(timeout);
      remaining.current -= Date.now() - started;
    };
  }, [isPaused, duration, id, type]);
}
