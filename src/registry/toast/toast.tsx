"use client";

import { AnimatePresence, motion, useAnimate, type PanInfo, type Transition } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------------------------------
 * Store — a tiny module-level store so `toast()` can be called from anywhere, no provider needed.
 * -----------------------------------------------------------------------------------------------*/

export type ToastType = "default" | "success" | "error" | "loading";

export type ToastOptions = {
  description?: ReactNode;
  /** ms before auto-dismiss. `Infinity` keeps it until dismissed. */
  duration?: number;
  action?: { label: string; onClick: () => void };
};

type ToastData = ToastOptions & { id: number; type: ToastType; title: ReactNode };

const DEFAULT_DURATION = 4000;
const EMPTY: ToastData[] = [];

let toasts: ToastData[] = EMPTY;
let nextId = 1;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

function create(type: ToastType, title: ReactNode, options: ToastOptions = {}) {
  const id = nextId++;
  toasts = [{ id, type, title, ...options }, ...toasts];
  emit();
  return id;
}

function update(id: number, patch: Partial<ToastData>) {
  toasts = toasts.map((t) => (t.id === id ? { ...t, ...patch } : t));
  emit();
}

function dismiss(id?: number) {
  toasts = id === undefined ? EMPTY : toasts.filter((t) => t.id !== id);
  emit();
}

type Message<T> = ReactNode | ((value: T) => ReactNode);
const resolve = <T,>(message: Message<T>, value: T) =>
  typeof message === "function" ? (message as (v: T) => ReactNode)(value) : message;

export const toast = Object.assign((title: ReactNode, options?: ToastOptions) => create("default", title, options), {
  success: (title: ReactNode, options?: ToastOptions) => create("success", title, options),
  error: (title: ReactNode, options?: ToastOptions) => create("error", title, options),
  /** Shows a loading toast that turns into success/error when the promise settles. */
  promise<T>(promise: Promise<T>, messages: { loading: ReactNode; success: Message<T>; error: Message<unknown> }, options?: ToastOptions) {
    const id = create("loading", messages.loading, { ...options, duration: Infinity });
    const duration = options?.duration ?? DEFAULT_DURATION;
    promise.then(
      (data) => update(id, { type: "success", title: resolve(messages.success, data), duration }),
      (error) => update(id, { type: "error", title: resolve(messages.error, error), duration }),
    );
    return promise;
  },
  dismiss,
});

/* -------------------------------------------------------------------------------------------------
 * Toaster
 * -----------------------------------------------------------------------------------------------*/

const GAP = 12; // space between toasts when expanded
const PEEK = 10; // how much each toast behind peeks out when collapsed
const SCALE_STEP = 0.05;

// Low bounce: the stack should settle, not wobble.
const stackTransition: Transition = { type: "spring", duration: 0.45, bounce: 0.12 };
const swapTransition: Transition = { type: "spring", duration: 0.3, bounce: 0 };

export function Toaster({ visibleToasts = 3 }: { visibleToasts?: number }) {
  const items = useSyncExternalStore(subscribe, () => toasts, () => EMPTY);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [heights, setHeights] = useState<Record<number, number>>({});

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onHeight = useCallback((id: number, height: number) => {
    setHeights((prev) => (prev[id] === height ? prev : { ...prev, [id]: height }));
  }, []);

  const expanded = (hovered || focused) && items.length > 0;
  const shown = items.slice(0, visibleToasts);
  const heightOf = (t: ToastData) => heights[t.id] ?? 0;
  const frontHeight = shown[0] ? heightOf(shown[0]) : 0;

  // Expanded offset of each toast = heights of the newer toasts in front of it + gaps.
  const offsets = items.map((_, i) => shown.slice(0, i).reduce((sum, t) => sum + heightOf(t) + GAP, 0));
  const stackHeight = expanded
    ? shown.reduce((sum, t) => sum + heightOf(t), 0) + GAP * Math.max(shown.length - 1, 0)
    : frontHeight + PEEK * Math.max(shown.length - 1, 0);

  const onBlur = (event: FocusEvent<HTMLOListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <section aria-label="Notifications" className="pointer-events-none fixed right-4 bottom-4 z-50 w-[min(356px,calc(100vw-2rem))]">
      <motion.ol
        aria-live="polite"
        initial={false}
        animate={{ height: stackHeight }}
        transition={stackTransition}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={onBlur}
        className="pointer-events-auto relative"
      >
        <AnimatePresence initial={false}>
          {items.map((t, index) => {
            const inStack = index < visibleToasts;
            return (
              <ToastItem
                key={t.id}
                toast={t}
                index={index}
                total={items.length}
                inStack={inStack}
                expanded={expanded}
                y={expanded ? -offsets[index] : -index * PEEK}
                height={expanded || index === 0 ? heights[t.id] : frontHeight}
                paused={expanded || pageHidden || !inStack}
                onHeight={onHeight}
              />
            );
          })}
        </AnimatePresence>
      </motion.ol>
    </section>
  );
}

type ToastItemProps = {
  toast: ToastData;
  index: number;
  total: number;
  inStack: boolean;
  expanded: boolean;
  y: number;
  height: number | undefined;
  paused: boolean;
  onHeight: (id: number, height: number) => void;
};

function ToastItem({ toast: t, index, total, inStack, expanded, y, height, paused, onHeight }: ToastItemProps) {
  const content = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate<HTMLLIElement>();
  const duration = t.duration ?? DEFAULT_DURATION;
  const remaining = useRef(duration);
  const front = index === 0;

  // Report the natural content height; the stack uses it for layout.
  useLayoutEffect(() => {
    const el = content.current;
    if (!el) return;
    const observer = new ResizeObserver(() => onHeight(t.id, el.offsetHeight));
    observer.observe(el);
    onHeight(t.id, el.offsetHeight);
    return () => observer.disconnect();
  }, [t.id, onHeight]);

  // A promise toast that settles gets a fresh countdown.
  useEffect(() => {
    remaining.current = duration;
  }, [duration, t.type]);

  // Countdown that pauses (and remembers the time left) while hovered, hidden or out of the stack.
  useEffect(() => {
    if (paused || !Number.isFinite(duration)) return;
    const started = Date.now();
    const timer = setTimeout(() => dismiss(t.id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [paused, duration, t.id, t.type]);

  const onDragEnd = async (_: unknown, info: PanInfo) => {
    if (info.offset.x < 80 && info.velocity.x < 400) return; // not far/fast enough: springs back
    await animate(scope.current, { x: 420, opacity: 0 }, { duration: 0.18, ease: "easeOut" });
    dismiss(t.id);
  };

  return (
    <motion.li
      ref={scope}
      tabIndex={0}
      aria-hidden={!inStack || undefined}
      initial={{ opacity: 0, y: 32 }}
      animate={{
        opacity: inStack ? 1 : 0,
        y,
        scale: expanded ? 1 : 1 - index * SCALE_STEP,
        height: height ?? "auto",
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } }}
      transition={stackTransition}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0.04, right: 0.8 }}
      onDragEnd={onDragEnd}
      onKeyDown={(e) => e.key === "Escape" && dismiss(t.id)}
      style={{ zIndex: total - index, transformOrigin: "top center" }}
      className={`group absolute inset-x-0 bottom-0 cursor-grab touch-pan-y overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_4px_16px_rgb(0_0_0/0.08)] outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 active:cursor-grabbing dark:border-neutral-800 dark:bg-neutral-900 dark:focus-visible:ring-neutral-100 ${
        inStack ? "" : "pointer-events-none"
      }`}
    >
      {/* Content of toasts behind the front one fades out so only their edge peeks. */}
      <motion.div
        ref={content}
        initial={false}
        animate={{ opacity: expanded || front ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-start gap-3 p-4"
      >
        <span className="relative mt-0.5 flex size-4 shrink-0">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={t.type}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(3px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(3px)" }}
              transition={swapTransition}
              className="flex"
            >
              <Icon type={t.type} />
            </motion.span>
          </AnimatePresence>
        </span>

        <div className="min-w-0 flex-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={t.type}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={swapTransition}
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              {t.title}
            </motion.p>
          </AnimatePresence>
          {t.description && <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">{t.description}</p>}
        </div>

        {t.action && (
          <button
            type="button"
            onClick={() => {
              t.action?.onClick();
              dismiss(t.id);
            }}
            className="shrink-0 rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-neutral-700 active:scale-[0.97] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            {t.action.label}
          </button>
        )}

        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => dismiss(t.id)}
          className="-mt-1 -mr-1 flex size-6 shrink-0 items-center justify-center rounded-md text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:opacity-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.li>
  );
}

function Icon({ type }: { type: ToastType }) {
  if (type === "loading") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin text-neutral-400" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "success") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" className="text-emerald-500" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="m8 12.5 2.5 2.5L16 9.5" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "error") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" className="text-red-500" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M12 7.5v5.5M12 16.5v.01" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-neutral-400" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M12 11v5.5M12 7.5v.01" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
