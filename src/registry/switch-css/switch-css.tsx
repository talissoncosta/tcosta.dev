"use client";

import { useState, type ComponentProps } from "react";

type SwitchCssProps = Omit<ComponentProps<"button">, "onChange" | "value" | "children"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

const TRACK = [
  "group inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5",
  "transition-colors duration-200 ease-out",
  "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600",
  "data-[state=checked]:bg-[var(--switch-on,var(--color-neutral-900))]",
  "dark:data-[state=checked]:bg-[var(--switch-on,var(--color-neutral-100))]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const THUMB = [
  "block size-5 rounded-full shadow-[0_1px_3px_rgb(0_0_0/0.2)]",
  "bg-[var(--switch-thumb,white)] dark:group-data-[state=checked]:bg-[var(--switch-thumb,var(--color-neutral-900))]",
  // An overshooting bezier approximates a spring. Unlike a spring, it restarts from zero
  // velocity when interrupted, so rapid toggles feel less continuous.
  "transition-[translate,width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
  "group-data-[state=checked]:translate-x-5",
  // Squash while pressed; when on, shift left so it stretches toward where it will go.
  "group-active:w-[25px] group-data-[state=checked]:group-active:translate-x-[15px]",
  "motion-reduce:transition-none",
].join(" ");

/** The same switch with zero JavaScript animation — CSS transitions only. */
export function SwitchCss({ checked: checkedProp, defaultChecked = false, onCheckedChange, className = "", onClick, ...props }: SwitchCssProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const checked = checkedProp ?? uncontrolled;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (checkedProp === undefined) setUncontrolled(!checked);
        onCheckedChange?.(!checked);
      }}
      className={`${TRACK} ${className}`}
      {...props}
    >
      <span className={THUMB} />
    </button>
  );
}
