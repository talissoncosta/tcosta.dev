import type { Metadata } from 'next';
import { Container } from '@/components/site/container';
import { DemoCard } from '@/components/site/demo-card';
import { Section } from '@/components/site/section';
import { TextLink } from '@/components/site/text-link';
import { WorkList } from '@/components/site/work-list';
import { catalog } from '@/lib/catalog';
import { work } from '@/lib/work';
import { articles } from '@/lib/writing';

export const metadata: Metadata = { alternates: { canonical: '/' } };

// Compact demos, so the previews line up at the same height.
const featured = catalog.filter(({ slug }) =>
  ['toast', 'animated-tabs', 'copy-button'].includes(slug),
);

const contact = [
  { label: 'Work with me', href: '/work-with-me' },
  { label: 'Email', href: 'mailto:tcostase@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/talissoncosta' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/talissoncosta/' },
];

export default function Home() {
  return (
    <Container size="wide">
      <div className="flex flex-col gap-20 pt-10 sm:pt-16">
        <Section order={0} className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Frontend design engineer, building interfaces that feel right.
          </h1>
          <p className="max-w-xl text-pretty text-muted-foreground">
            I work at Flagsmith. For over ten years I have been building design systems and React
            interfaces, with a soft spot for accessibility and the small details of motion. The{' '}
            <TextLink href="/lab">lab</TextLink> is where I polish those details in public, and I
            also <TextLink href="/work-with-me">work with teams</TextLink>.
          </p>
        </Section>

        <Section
          order={1}
          title="From the lab"
          action={
            <TextLink href="/lab" variant="muted">
              All components →
            </TextLink>
          }
        >
          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {featured.map((entry) => (
              <li key={entry.slug}>
                <DemoCard entry={entry} />
              </li>
            ))}
          </ul>
        </Section>

        <Section order={2} title="Work" className="max-w-2xl">
          <WorkList jobs={work} />
        </Section>

        <Section
          order={3}
          title="Writing"
          className="max-w-2xl"
          action={
            <TextLink href="/writing" variant="muted">
              All writing →
            </TextLink>
          }
        >
          <ul className="flex flex-col gap-3">
            {articles.slice(0, 3).map(({ title, url }) => (
              <li key={url}>
                <TextLink href={url} variant="hover">
                  {title}
                </TextLink>
              </li>
            ))}
          </ul>
        </Section>

        <Section order={4} title="Say hi" className="max-w-2xl gap-3">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {contact.map(({ label, href }) => (
              <li key={label}>
                <TextLink href={href}>{label}</TextLink>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </Container>
  );
}
