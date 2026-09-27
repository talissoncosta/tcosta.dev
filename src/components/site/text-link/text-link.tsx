import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const textLinkVariants = cva('transition-colors', {
  variants: {
    variant: {
      underline: [
        'underline decoration-muted-foreground/40 underline-offset-4',
        'hover:decoration-foreground',
      ],
      hover: 'hover:underline',
      muted: ['text-sm text-muted-foreground', 'hover:text-foreground'],
    },
  },
  defaultVariants: {
    variant: 'underline',
  },
});

type TextLinkProps = VariantProps<typeof textLinkVariants> & {
  href: string;
  className?: string;
  children: ReactNode;
};

export function TextLink({ href, variant, className, children }: TextLinkProps) {
  const classNames = cn(textLinkVariants({ variant }), className);

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  const isWeb = href.startsWith('http');

  return (
    <a href={href} className={classNames} {...(isWeb && { target: '_blank', rel: 'noreferrer' })}>
      {children}
      {isWeb && (
        <span aria-hidden className="text-muted-foreground">
          {' '}
          ↗
        </span>
      )}
    </a>
  );
}
