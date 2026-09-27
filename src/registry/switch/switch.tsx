'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import type { MouseEvent, PointerEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SwitchInput } from './switch-input';
import { SwitchThumb } from './switch-thumb';
import { useSwitchState } from './use-switch-state';
import { useThumbDrag } from './use-thumb-drag';
import { shakeVariants, thumbSizes, trackVariants, type SwitchSize } from './variants';

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
  /** Return a promise to make the change async: spinner while pending, shake and revert on reject. */
  onCheckedChange?: (checked: boolean) => void | Promise<unknown>;
  /** Async only: "optimistic" moves the thumb right away, "pessimistic" waits for the promise. */
  mode?: 'optimistic' | 'pessimistic';
  loading?: boolean;
  size?: SwitchSize;
  icons?: { checked?: ReactNode; unchecked?: ReactNode };
  name?: string;
  value?: string;
  required?: boolean;
  form?: string;
};

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
  className,
  onClick,
  onPointerDown,
  ...props
}: SwitchProps) {
  const { checked, busy, error, change, reset } = useSwitchState({
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    mode,
    loading,
    disabled,
  });
  const { dragProps, wasDragged, resetDrag } = useThumbDrag({
    checked,
    travel: thumbSizes[size].travel,
    onToggle: () => change(!checked),
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!wasDragged() && !event.defaultPrevented) change(!checked);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    resetDrag();
    onPointerDown?.(event);
  };

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
        variants={shakeVariants}
        animate={error ? 'error' : 'idle'}
        whileTap={busy ? undefined : 'pressed'}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        className={cn(trackVariants({ size, checked }), className)}
        {...props}
      >
        <SwitchThumb
          size={size}
          checked={checked}
          busy={busy}
          draggable={!busy && !disabled}
          icon={checked ? icons?.checked : icons?.unchecked}
          dragProps={dragProps}
        />
      </motion.button>

      {(name !== undefined || required) && (
        <SwitchInput
          name={name}
          value={value}
          form={form}
          required={required}
          checked={checked}
          disabled={disabled}
          onReset={checkedProp === undefined ? reset : () => {}}
        />
      )}
    </span>
  );
}
