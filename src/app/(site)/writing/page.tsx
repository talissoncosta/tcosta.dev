import type { Metadata } from 'next';
import { PageHeader } from '@/components/site/page-header';
import { TextLink } from '@/components/site/text-link';
import { articles } from '@/lib/writing';

export const metadata: Metadata = { title: 'Writing' };

const dateFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export default function WritingPage() {
  return (
    <>
      <PageHeader title="Writing" description="Notes on component APIs and design systems." />
      <ul className="flex max-w-2xl flex-col gap-8">
        {articles.map(({ title, description, date, url }) => (
          <li key={url}>
            <time dateTime={date} className="text-sm text-muted-foreground tabular-nums">
              {dateFormat.format(new Date(date))}
            </time>
            <h2 className="mt-1 font-medium">
              <TextLink href={url} variant="hover">
                {title}
              </TextLink>
            </h2>
            <p className="mt-1 text-sm text-pretty text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
