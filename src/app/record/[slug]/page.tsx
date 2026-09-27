import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RecordStage } from '@/components/site/record-stage';
import { catalog, getEntry } from '@/lib/catalog';

// Recording stage for short demo videos: outside the site chrome, and kept out of search results.
export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<'/record/[slug]'>): Promise<Metadata> {
  const entry = getEntry((await props.params).slug);
  return entry ? { title: `Record ${entry.title}`, robots: { index: false, follow: false } } : {};
}

export default async function RecordPage(props: PageProps<'/record/[slug]'>) {
  const { slug } = await props.params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const { Demo } = entry;

  return (
    <RecordStage backHref={`/lab/${slug}`}>
      <Demo />
    </RecordStage>
  );
}
