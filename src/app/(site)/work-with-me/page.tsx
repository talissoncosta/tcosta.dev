import type { Metadata } from 'next';
import { Container } from '@/components/site/container';
import { PageHeader } from '@/components/site/page-header';
import { TextLink } from '@/components/site/text-link';
import { pageMetadata } from '@/lib/metadata';
import { contactEmail, services } from '@/lib/services';
import { buttonVariants } from '@/registry/button';

const description =
  'I help teams make their design system something AI agents follow: consistent tokens, real components and accessible UI, so generated code looks like your product.';

export const metadata: Metadata = pageMetadata({
  title: 'Work with me',
  description,
  path: '/work-with-me',
  image: 'work-with-me',
});

const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent('Working together')}`;

const steps = [
  { title: 'Intro call', text: 'We talk about your team, your system and where it hurts.' },
  { title: 'Scope and quote', text: 'A short proposal with a fixed scope and price.' },
  { title: 'Delivery', text: 'Work in your repo, in the open, with a clear handover.' },
];

export default function WorkWithMePage() {
  return (
    <Container size="prose">
      <PageHeader title="Work with me" description={description} />

      <div className="flex flex-col gap-12">
        <ul className="flex flex-col gap-10">
          {services.map(({ title, duration, summary, deliverables }) => (
            <li key={title} className="flex flex-col gap-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
                <span className="text-sm text-muted-foreground">{duration}</span>
              </div>
              <p className="text-pretty text-muted-foreground">{summary}</p>
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-pretty marker:text-muted-foreground">
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground">How it works</h2>
          <ol className="grid gap-6 sm:grid-cols-3">
            {steps.map(({ title, text }, index) => (
              <li key={title} className="flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                <span className="font-medium">{title}</span>
                <span className="text-sm text-pretty text-muted-foreground">{text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col items-start gap-4 rounded-xl border bg-muted/60 p-6">
          <p className="text-pretty">
            Tell me about your team and what you&apos;re building. I reply to every message.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={mailto} className={buttonVariants()}>
              Get in touch
            </a>
            <TextLink href="https://www.linkedin.com/in/talissoncosta/">LinkedIn</TextLink>
          </div>
        </section>
      </div>
    </Container>
  );
}
