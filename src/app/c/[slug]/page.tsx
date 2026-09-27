import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/site/code-block";
import { Preview } from "@/components/site/preview";
import { catalog, getEntry } from "@/lib/catalog";

// Only components in the catalog exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/c/[slug]">): Promise<Metadata> {
  const entry = getEntry((await props.params).slug);
  return entry ? { title: entry.title, description: entry.description } : {};
}

export default async function ComponentPage(props: PageProps<"/c/[slug]">) {
  const { slug } = await props.params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const { title, description, techniques, Demo, files } = entry;

  return (
    <article className="flex flex-col gap-8 pt-6">
      <div>
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          ← All components
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 max-w-xl text-neutral-500">{description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {techniques.map((t) => (
            <li key={t} className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <Preview>
        <Demo />
      </Preview>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Source</h2>
        {files.map((file) => (
          <CodeBlock key={file} file={file} />
        ))}
        <p className="text-sm text-neutral-500">
          Requires <code className="font-mono text-[13px]">motion</code>. Copy the file into your project, or install from the
          registry once it is published.
        </p>
      </section>
    </article>
  );
}
