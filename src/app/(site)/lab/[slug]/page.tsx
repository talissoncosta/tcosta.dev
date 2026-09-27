import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/site/container';
import { CodeBlock } from '@/components/site/code-block';
import { InstallCommand } from '@/components/site/install-command';
import { Preview } from '@/components/site/preview';
import { TextLink } from '@/components/site/text-link';
import { catalog, getEntry } from '@/lib/catalog';
import { pageMetadata } from '@/lib/metadata';
import { dependenciesOf, installCommand } from '@/lib/registry';

const INLINE_CODE = 'font-mono text-[13px] text-foreground';

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
  const { slug } = await props.params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const dependencies = dependenciesOf(slug);
  const { title, description, techniques, Demo, files } = entry;

  return (
    <Container size="default">
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
          <h2 className="text-sm font-medium">Install</h2>
          <InstallCommand command={installCommand(slug)} />
          <p className="text-sm text-pretty text-muted-foreground">
            Or copy the files below into <code className={INLINE_CODE}>components/{slug}/</code>.
            They use the shadcn/ui theme tokens and <code className={INLINE_CODE}>cn</code> from{' '}
            <code className={INLINE_CODE}>@/lib/utils</code>
            {dependencies.length > 0 && (
              <>
                , and need{' '}
                {dependencies.map((name, index) => (
                  <span key={name}>
                    {index > 0 && ' + '}
                    <code className={INLINE_CODE}>{name}</code>
                  </span>
                ))}
              </>
            )}
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Source</h2>
          {files.map((file) => (
            <CodeBlock key={file} file={file} />
          ))}
        </section>
      </article>
    </Container>
  );
}
