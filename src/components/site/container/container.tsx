import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Width follows the kind of page: galleries go wide, reading pages stay in a comfortable column.
const containerVariants = cva('mx-auto w-full px-5 sm:px-8', {
  variants: {
    size: {
      prose: 'max-w-3xl',
      default: 'max-w-5xl',
      wide: 'max-w-360',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type ContainerProps = VariantProps<typeof containerVariants> & {
  className?: string;
  children: ReactNode;
};

export function Container({ size, className, children }: ContainerProps) {
  return <div className={cn(containerVariants({ size }), className)}>{children}</div>;
}
