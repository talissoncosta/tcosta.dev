import type { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SiteShell } from '@/components/site/site-shell';
import { TextLink } from '@/components/site/text-link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <SiteShell>
      <div className="flex flex-col gap-10 pt-10 sm:pt-16">
        <Section order={0} className="max-w-xl gap-4">
          <p className="font-mono text-sm text-muted-foreground">404</p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="text-pretty text-muted-foreground">
            The link may be wrong, or the page may have moved.
          </p>
        </Section>
        <Section order={1} className="flex-row gap-6">
          <TextLink href="/">Go home</TextLink>
          <TextLink href="/lab">Browse the lab</TextLink>
        </Section>
      </div>
    </SiteShell>
  );
}
