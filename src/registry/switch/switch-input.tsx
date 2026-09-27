import { useEffect, useRef } from 'react';

type SwitchInputProps = {
  name?: string;
  value: string;
  form?: string;
  required?: boolean;
  checked: boolean;
  disabled?: boolean;
  onReset: () => void;
};

/** Hidden native checkbox, so the switch submits, validates (`required`) and resets with its form. */
export function SwitchInput({ onReset, ...props }: SwitchInputProps) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const form = input.current?.form;
    form?.addEventListener('reset', onReset);
    return () => form?.removeEventListener('reset', onReset);
  }, [onReset]);

  return (
    <input
      ref={input}
      type="checkbox"
      aria-hidden
      tabIndex={-1}
      // Not readOnly: that would exclude it from `required` validation.
      onChange={() => {}}
      className="pointer-events-none absolute inset-0 m-0 size-full opacity-0"
      {...props}
    />
  );
}
