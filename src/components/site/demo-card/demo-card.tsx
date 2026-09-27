import type { CatalogEntry } from '@/lib/catalog';
import { Preview } from '../preview';
import { TextLink } from '../text-link';

type DemoCardProps = {
  entry: CatalogEntry;
  showDescription?: boolean;
};

export function DemoCard({ entry, showDescription = false }: DemoCardProps) {
  const { slug, title, description, Demo, CardDemo = Demo } = entry;

  return (
    <article className="flex flex-col gap-2">
      <Preview size="compact">
        <CardDemo />
      </Preview>
      <div>
        <TextLink href={`/lab/${slug}`} variant="hover" className="text-sm font-medium">
          {title}
        </TextLink>
        {showDescription && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
    </article>
  );
}
