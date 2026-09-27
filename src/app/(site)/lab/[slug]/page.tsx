import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/site/code-block';
import { Preview } from '@/components/site/preview';
import { TextLink } from '@/components/site/text-link';
import { catalog, getEntry } from '@/lib/catalog';
import { pageMetadata } from '@/lib/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<'/lab/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return pageMetadata({
    title: entry.title,
    description: entry.description,
    path: `/lab/${slug}`,
    image: slug,
  });
}

export default async function ComponentPage(props: PageProps<'/lab/[slug]'>) {
  const entry = getEntry((await props.params).slug);
  if (!entry) notFound();
  const { title, description, techniques, Demo, files } = entry;

  return (
    <article className="flex flex-col gap-8 pt-6">
      <header>
        <TextLink href="/lab" variant="muted">
          ← All components
        </TextLink>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {techniques.map((technique) => (
            <li
              key={technique}
              className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {technique}
            </li>
          ))}
        </ul>
      </header>

      <Preview>
        <Demo />
      </Preview>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Source</h2>
        {files.map((file) => (
          <CodeBlock key={file} file={file} />
        ))}
        <p className="text-sm text-muted-foreground">
          Requires <code className="font-mono text-[13px]">motion</code>. Copy the file into your
          project, or install from the registry once it is published.
        </p>
      </section>
    </article>
  );
}
