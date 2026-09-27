import type { Metadata } from 'next';
import Link from 'next/link';
import { Preview } from '@/components/site/preview';
import { catalog } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Lab' };

export default function LabPage() {
  return (
    <>
      <section className="py-10 sm:py-16">
        <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Small components, polished until they feel right.
        </h1>
        <p className="mt-4 max-w-lg text-pretty text-neutral-500">
          Interaction experiments with React and Motion. Every piece respects reduced motion, works
          with the keyboard, and is copy-paste ready.
        </p>
      </section>

      <ul className="grid gap-6 sm:grid-cols-2">
        {catalog.map(({ slug, title, description, Demo }) => (
          <li key={slug} className="flex min-w-0 flex-col gap-3">
            <Preview compact>
              <Demo />
            </Preview>
            <div>
              <Link href={`/lab/${slug}`} className="font-medium hover:underline">
                {title}
              </Link>
              <p className="mt-0.5 text-sm text-neutral-500">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
