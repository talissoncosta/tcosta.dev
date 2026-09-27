import Link from 'next/link';
import { SiteNav } from '@/components/site/site-nav';

/** Site chrome (header + content column) for every page except the recording stage. */
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="flex items-center justify-between gap-4 py-6">
        <Link href="/" className="font-semibold tracking-tight">
          Talisson Costa
        </Link>
        <SiteNav />
      </header>
      <main className="pb-24">{children}</main>
    </div>
  );
}
