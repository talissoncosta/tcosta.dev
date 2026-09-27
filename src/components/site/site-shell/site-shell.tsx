import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteNav } from '../site-nav';

/** Full-width header; each page picks its own content width with `Container`. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <Link href="/" className="font-semibold tracking-tight whitespace-nowrap">
          Talisson Costa
        </Link>
        <SiteNav />
      </header>
      <main className="pb-24">{children}</main>
    </>
  );
}
