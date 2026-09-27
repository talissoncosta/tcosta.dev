'use client';

import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type PanInfo,
  type Transition,
} from 'motion/react';
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';

// Motion-driven and form props are owned by the component.
type SwitchProps = Omit<
  HTMLMotionProps<'button'>,
  | 'onChange'
  | 'value'
  | 'children'
  | 'initial'
  | 'animate'
  | 'whileTap'
  | 'variants'
  | 'name'
  | 'form'
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  /**
   * Return a promise to make the switch async: it shows a spinner while pending and,
   * if the promise rejects, reverts with a shake. Update your state before it resolves.
   */
  onCheckedChange?: (checked: boolean) => void | Promise<unknown>;
  /** For async changes: "optimistic" moves the thumb right away, "pessimistic" waits. */
  mode?: 'optimistic' | 'pessimistic';
  /** External busy state (spinner + ignores input). Async handlers set this automatically. */
  loading?: boolean;
  size?: 'sm' | 'md';
  /** Icons rendered inside the thumb, cross-faded on change. */
  icons?: { checked?: ReactNode; unchecked?: ReactNode };
  /** Form integration: submitted as `name=value` when on, like a checkbox. */
  name?: string;
  value?: string;
  required?: boolean;
  form?: string;
};

const SIZES = {
  sm: { track: 'h-5 w-9', thumb: 16, stretched: 20, travel: 16 },
  md: { track: 'h-6 w-11', thumb: 20, stretched: 25, travel: 20 },
} as const;

// A little overshoot so the thumb "lands" instead of stopping dead.
const thumbTransition: Transition = { type: 'spring', duration: 0.35, bounce: 0.3 };
const fade: Transition = { type: 'spring', duration: 0.25, bounce: 0 };

const trackVariants = {
  idle: { x: 0 },
  error: { x: [0, -5, 5, -3, 3, 0], transition: { duration: 0.4, ease: 'easeInOut' as const } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.4, filter: 'blur(2px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
};

// Colors are overridable with --switch-on / --switch-thumb (set them via style or a parent class).
const TRACK = [
  'group inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5',
  'transition-[background-color,box-shadow] duration-200 ease-out',
  'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600',
  'data-[state=checked]:bg-[var(--switch-on,var(--color-neutral-900))]',
  'dark:data-[state=checked]:bg-[var(--switch-on,var(--color-neutral-100))]',
  'data-[error]:ring-2 data-[error]:ring-red-500/60',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100',
  'disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-progress',
].join(' ');

const THUMB = [
  'flex items-center justify-center rounded-full shadow-[0_1px_3px_rgb(0_0_0/0.2)]',
  'bg-[var(--switch-thumb,white)] dark:group-data-[state=checked]:bg-[var(--switch-thumb,var(--color-neutral-900))]',
  'text-neutral-400 group-data-[state=checked]:text-[var(--switch-on,var(--color-neutral-900))]',
  'dark:group-data-[state=checked]:text-[var(--switch-on,var(--color-neutral-100))]',
].join(' ');

const isPromise = (v: unknown): v is Promise<unknown> =>
  typeof (v as Promise<unknown>)?.then === 'function';

/**
 * Switch with a springy, draggable thumb that stretches while pressed.
 * Supports async (optimistic or pessimistic) changes, native forms and custom colors.
 * Pair with a native <label htmlFor> — buttons are labelable, so clicking the label toggles it.
 */
export function Switch({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  mode = 'optimistic',
  loading = false,
  size = 'md',
  icons,
  name,
  value = 'on',
  required,
  form,
  disabled,
  className = '',
  onClick,
  onPointerDown,
  ...props
}: SwitchProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const [pending, setPending] = useState<boolean | null>(null);
  const [error, setError] = useState(false);
  const dragged = useRef(false);
  const input = useRef<HTMLInputElement>(null);

  const committed = checkedProp ?? uncontrolled;
  const checked = mode === 'optimistic' && pending !== null ? pending : committed;
  const busy = loading || pending !== null;
  const { track, thumb, stretched, travel } = SIZES[size];

  // Clear the error flash once the shake has played.
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(false), 700);
    return () => clearTimeout(t);
  }, [error]);

  // <form> reset restores the initial value (uncontrolled only — controlled state is the parent's).
  useEffect(() => {
    const el = input.current?.form;
    if (!el || checkedProp !== undefined) return;
    const onReset = () => setUncontrolled(defaultChecked);
    el.addEventListener('reset', onReset);
    return () => el.removeEventListener('reset', onReset);
  }, [checkedProp, defaultChecked]);

  const change = async (next: boolean) => {
    if (busy || disabled) return;
    setError(false);
    const result = onCheckedChange?.(next);
    if (!isPromise(result)) {
      if (checkedProp === undefined) setUncontrolled(next);
      return;
    }
    setPending(next);
    try {
      await result;
      if (checkedProp === undefined) setUncontrolled(next);
    } catch {
      setError(true);
    } finally {
      setPending(null);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    // A drag also ends in a click — the drag already decided.
    if (dragged.current || event.defaultPrevented) return;
    change(!checked);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    dragged.current = false;
    onPointerDown?.(event);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const past = checked ? info.offset.x < -travel / 2 : info.offset.x > travel / 2;
    if (past) change(!checked);
  };

  const icon = checked ? icons?.checked : icons?.unchecked;

  return (
    <span className="relative inline-flex">
      <motion.button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-busy={busy || undefined}
        disabled={disabled}
        data-state={checked ? 'checked' : 'unchecked'}
        data-error={error || undefined}
        initial={false}
        variants={trackVariants}
        animate={error ? 'error' : 'idle'}
        whileTap={busy ? undefined : 'pressed'}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        className={`${TRACK} ${checked ? 'justify-end' : 'justify-start'} ${track} ${className}`}
        {...props}
      >
        <motion.span
          layout
          transition={thumbTransition}
          variants={{ idle: { width: thumb }, pressed: { width: stretched } }}
          style={{ height: thumb }}
          drag={busy || disabled ? false : 'x'}
          dragConstraints={checked ? { left: -travel, right: 0 } : { left: 0, right: travel }}
          dragElastic={0.08}
          dragMomentum={false}
          dragSnapToOrigin
          onDragStart={() => (dragged.current = true)}
          onDragEnd={handleDragEnd}
          className={THUMB}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {busy ? (
              <motion.span
                key="spinner"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={fade}
                className="flex"
              >
                <Spinner size={thumb - 8} />
              </motion.span>
            ) : icon ? (
              <motion.span
                key={checked ? 'on' : 'off'}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={fade}
                className="flex [&>svg]:size-full"
                style={{ width: thumb - 8, height: thumb - 8 }}
              >
                {icon}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.span>
      </motion.button>

      {(name !== undefined || required) && (
        // Native checkbox so the switch submits, validates (required) and resets with its form.
        <input
          ref={input}
          type="checkbox"
          aria-hidden
          tabIndex={-1}
          name={name}
          value={value}
          form={form}
          required={required}
          checked={checked}
          disabled={disabled}
          // Not readOnly: that would exclude it from `required` validation. State is driven by the switch.
          onChange={() => {}}
          className="pointer-events-none absolute inset-0 m-0 size-full opacity-0"
        />
      )}
    </span>
  );
}

function Spinner({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
