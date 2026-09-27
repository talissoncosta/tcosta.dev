'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useIsActive } from './use-is-active';

type SiteNavLinkProps = {
  href: string;
  label: string;
  external?: boolean;
};

const linkClassName = cn(
  'relative rounded-full px-3 py-1.5 text-sm whitespace-nowrap text-muted-foreground transition-colors',
  'hover:text-foreground',
  'aria-[current=page]:text-foreground',
);

export function SiteNavLink({ href, label, external = false }: SiteNavLinkProps) {
  const isActive = useIsActive(href);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={linkClassName}>
        {label}
        <span aria-hidden> ↗</span>
      </a>
    );
  }

  return (
    <Link href={href} aria-current={isActive ? 'page' : undefined} className={linkClassName}>
      {isActive && (
        <motion.span
          layoutId="site-nav-pill"
          transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
          className="absolute inset-0 -z-10 rounded-full bg-accent"
        />
      )}
      {label}
    </Link>
  );
}
