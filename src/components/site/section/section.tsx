import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Staggered page entrance (`animate-enter` and `enter-*` live in globals.css).
const sectionVariants = cva('flex flex-col gap-5 motion-safe:animate-enter', {
  variants: {
    order: {
      0: 'enter-0',
      1: 'enter-1',
      2: 'enter-2',
      3: 'enter-3',
      4: 'enter-4',
    },
  },
});

type SectionProps = VariantProps<typeof sectionVariants> & {
  title?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Section({ order, title, action, className, children }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ order }), className)}>
      {title && (
        <header className="flex items-baseline justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
