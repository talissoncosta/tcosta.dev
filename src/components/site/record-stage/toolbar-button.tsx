import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const toolbarButtonVariants = cva(
  ['rounded-md px-2 py-1 transition-colors', 'hover:bg-accent hover:text-accent-foreground'],
  {
    variants: {
      pressable: {
        true: ['tabular-nums', 'aria-pressed:bg-primary aria-pressed:text-primary-foreground'],
      },
    },
  },
);

type ToolbarButtonProps = ComponentProps<'button'> &
  VariantProps<typeof toolbarButtonVariants> & {
    shortcut?: string;
  };

export function ToolbarButton({ pressable, shortcut, children, ...props }: ToolbarButtonProps) {
  return (
    <button type="button" className={toolbarButtonVariants({ pressable })} {...props}>
      {children}
      {shortcut && <kbd className="ml-1 rounded border px-1 font-mono text-[10px]">{shortcut}</kbd>}
    </button>
  );
}
