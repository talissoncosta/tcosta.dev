import { cva } from 'class-variance-authority';

export const iconButtonVariants = cva('px-0', {
  variants: {
    size: {
      sm: 'size-8',
      md: 'size-9',
      lg: 'size-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
