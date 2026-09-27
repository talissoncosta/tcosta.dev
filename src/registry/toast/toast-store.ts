import { useSyncExternalStore, type ReactNode } from 'react';
import { DEFAULT_DURATION } from './config';

export type ToastType = 'default' | 'success' | 'error' | 'loading';

export type ToastOptions = {
  description?: ReactNode;
  /** ms before auto-dismiss. `Infinity` keeps it until dismissed. */
  duration?: number;
  action?: { label: string; onClick: () => void };
};

export type ToastData = ToastOptions & { id: number; type: ToastType; title: ReactNode };

type Message<T> = ReactNode | ((value: T) => ReactNode);

// Module-level store, so `toast()` works from anywhere without a provider.
const EMPTY: ToastData[] = [];
let toasts = EMPTY;
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function create(type: ToastType, title: ReactNode, options: ToastOptions = {}) {
  const id = nextId++;
  toasts = [{ id, type, title, ...options }, ...toasts];
  emit();
  return id;
}

function update(id: number, patch: Partial<ToastData>) {
  toasts = toasts.map((toast) => (toast.id === id ? { ...toast, ...patch } : toast));
  emit();
}

export function dismiss(id?: number) {
  toasts = id === undefined ? EMPTY : toasts.filter((toast) => toast.id !== id);
  emit();
}

function resolve<T>(message: Message<T>, value: T) {
  return typeof message === 'function' ? (message as (value: T) => ReactNode)(value) : message;
}

function promise<T>(
  promise: Promise<T>,
  messages: { loading: ReactNode; success: Message<T>; error: Message<unknown> },
  options?: ToastOptions,
) {
  const id = create('loading', messages.loading, { ...options, duration: Infinity });
  const duration = options?.duration ?? DEFAULT_DURATION;
  promise.then(
    (data) => update(id, { type: 'success', title: resolve(messages.success, data), duration }),
    (error) => update(id, { type: 'error', title: resolve(messages.error, error), duration }),
  );
  return promise;
}

export const toast = Object.assign(
  (title: ReactNode, options?: ToastOptions) => create('default', title, options),
  {
    success: (title: ReactNode, options?: ToastOptions) => create('success', title, options),
    error: (title: ReactNode, options?: ToastOptions) => create('error', title, options),
    promise,
    dismiss,
  },
);

export function useToasts() {
  return useSyncExternalStore(
    subscribe,
    () => toasts,
    () => EMPTY,
  );
}
