import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteNav } from '../site-nav';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="flex items-center justify-between gap-4 py-6">
        <Link href="/" className="font-semibold tracking-tight whitespace-nowrap">
          Talisson Costa
        </Link>
        <SiteNav />
      </header>
      <main className="pb-24">{children}</main>
    </div>
  );
}
