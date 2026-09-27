import type { Metadata } from 'next';
import { DemoCard } from '@/components/site/demo-card';
import { PageHeader } from '@/components/site/page-header';
import { catalog } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Lab' };

export default function LabPage() {
  return (
    <>
      <PageHeader
        title="Small components, polished until they feel right."
        description="Interaction experiments with React and Motion. Every piece respects reduced motion, works with the keyboard, and is copy-paste ready."
      />
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {catalog.map((entry) => (
          <li key={entry.slug}>
            <DemoCard entry={entry} showDescription />
          </li>
        ))}
      </ul>
    </>
  );
}
