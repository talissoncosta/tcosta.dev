import Link from 'next/link';
import { Preview } from '@/components/site/preview';
import { catalog } from '@/lib/catalog';
import { work } from '@/lib/work';
import { articles } from '@/lib/writing';

// Compact demos, so the three previews line up at the same height.
const FEATURED = ['toast', 'animated-tabs', 'copy-button'];

const CONTACT = [
  { label: 'Email', href: 'mailto:tcostase@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/talissoncosta' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/talissoncosta/' },
];

// Each block fades up a beat after the previous one (`enter` in globals.css).
const ENTER = 'motion-safe:animate-enter';
const SECTION_TITLE = 'text-sm font-medium text-neutral-500';
const MORE_LINK =
  'text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100';
const TEXT_LINK =
  'underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:decoration-neutral-700 dark:hover:decoration-neutral-100';

export default function Home() {
  const featured = FEATURED.map((slug) => catalog.find((entry) => entry.slug === slug)).filter(
    (entry) => entry !== undefined,
  );

  return (
    <div className="flex flex-col gap-20 pt-10 sm:pt-16">
      <section className={`${ENTER} max-w-xl enter-0`}>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Frontend design engineer, building interfaces that feel right.
        </h1>
        <p className="mt-5 text-pretty text-neutral-500">
          I work at Flagsmith. For over ten years I have been building design systems and React
          interfaces, with a soft spot for accessibility and the small details of motion. The{' '}
          <Link href="/lab" className={TEXT_LINK}>
            lab
          </Link>{' '}
          is where I polish those details in public.
        </p>
      </section>

      <section className={`${ENTER} flex flex-col gap-5 enter-1`}>
        <div className="flex items-baseline justify-between">
          <h2 className={SECTION_TITLE}>From the lab</h2>
          <Link href="/lab" className={MORE_LINK}>
            All components →
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-3">
          {featured.map(({ slug, title, Demo }) => (
            <li key={slug} className="flex min-w-0 flex-col gap-2">
              <Preview compact>
                <Demo />
              </Preview>
              <Link href={`/lab/${slug}`} className="text-sm font-medium hover:underline">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${ENTER} flex max-w-2xl flex-col gap-5 enter-2`}>
        <h2 className={SECTION_TITLE}>Work</h2>
        <ul className="flex flex-col gap-6">
          {work.map(({ company, role, period, summary }) => (
            <li key={company} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <span className="text-sm text-neutral-500 tabular-nums">{period}</span>
              <div>
                <p className="font-medium">
                  {company} <span className="font-normal text-neutral-500">· {role}</span>
                </p>
                <p className="mt-1 text-sm text-pretty text-neutral-500">{summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${ENTER} flex max-w-2xl flex-col gap-5 enter-3`}>
        <div className="flex items-baseline justify-between">
          <h2 className={SECTION_TITLE}>Writing</h2>
          <Link href="/writing" className={MORE_LINK}>
            All writing →
          </Link>
        </div>
        <ul className="flex flex-col gap-3">
          {articles.slice(0, 3).map(({ title, url }) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noreferrer" className="hover:underline">
                {title}
                <span aria-hidden className="text-neutral-400">
                  {' '}
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${ENTER} flex max-w-2xl flex-col gap-3 enter-4`}>
        <h2 className={SECTION_TITLE}>Say hi</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {CONTACT.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                className={TEXT_LINK}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
