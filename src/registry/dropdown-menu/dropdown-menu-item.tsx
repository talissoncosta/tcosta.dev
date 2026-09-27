'use client';

import { useListItem } from '@floating-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type Variants } from 'motion/react';
import { Children, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useDropdownMenuContext } from './dropdown-menu-context';

const itemVariants = cva(
  [
    'flex w-full cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none select-none',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'focus:bg-accent focus:text-accent-foreground',
        destructive: 'text-destructive focus:bg-destructive/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// Timed like the menu: a quick fade in, and out as fast as the menu closes.
const enterVariants: Variants = {
  closed: { opacity: 0, y: -2, transition: { duration: 0.1 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' } },
};

// Typeahead label from the text parts of the children, e.g. "Duplicate" for `Duplicate <Shortcut />`.
function textOf(children: ReactNode) {
  const parts = Children.toArray(children).filter((child) => typeof child === 'string');
  return parts.join('').trim() || null;
}

type DropdownMenuItemProps = VariantProps<typeof itemVariants> & {
  onSelect?: () => void;
  disabled?: boolean;
  /** Text for typeahead. Defaults to the text in `children`. */
  textValue?: string;
  className?: string;
  children: ReactNode;
};

export function DropdownMenuItem({
  onSelect,
  disabled = false,
  textValue,
  variant,
  className,
  children,
}: DropdownMenuItemProps) {
  const { activeIndex, setIsOpen, getItemProps } = useDropdownMenuContext();
  const { ref, index } = useListItem({
    label: disabled ? null : (textValue ?? textOf(children)),
  });

  return (
    // A plain <button> so it always gets Floating UI's latest ref (it changes once the item knows
    // its index). The cascade animates the inner span, which inherits the menu's variants.
    <button
      ref={ref}
      type="button"
      data-slot="dropdown-menu-item"
      role="menuitem"
      disabled={disabled}
      tabIndex={activeIndex === index ? 0 : -1}
      className={cn(itemVariants({ variant }), className)}
      {...getItemProps({
        onClick: () => {
          onSelect?.();
          setIsOpen(false);
        },
      })}
    >
      <motion.span variants={enterVariants} className="flex flex-1 items-center gap-2">
        {children}
      </motion.span>
    </button>
  );
}
