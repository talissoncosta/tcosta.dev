import { catalog } from '@/lib/catalog';
import { ogImage } from '@/lib/og';

export const dynamic = 'force-static';

// One social card per page, served as /og/<name>.png so any static host sends the right type.
const cards: Record<string, Parameters<typeof ogImage>[0]> = {
  home: {
    eyebrow: 'Talisson Costa',
    title: 'Frontend design engineer, building interfaces that feel right.',
    url: 'tcosta.dev',
  },
  lab: {
    eyebrow: 'Talisson Costa · Lab',
    title: 'Small components, polished until they feel right.',
    url: 'tcosta.dev/lab',
  },
  'work-with-me': {
    eyebrow: 'Talisson Costa',
    title: 'Design systems that people and AI agents follow.',
    url: 'tcosta.dev/work-with-me',
  },
  writing: {
    eyebrow: 'Talisson Costa · Writing',
    title: 'Notes on component APIs and design systems.',
    url: 'tcosta.dev/writing',
  },
  ...Object.fromEntries(
    catalog.map(({ slug, title, description }) => [
      slug,
      { eyebrow: 'Talisson Costa · Lab', title, description, url: `tcosta.dev/lab/${slug}` },
    ]),
  ),
};

export function generateStaticParams() {
  return Object.keys(cards).map((name) => ({ image: `${name}.png` }));
}

export async function GET(_: Request, { params }: RouteContext<'/og/[image]'>) {
  const { image } = await params;
  const card = cards[image.replace(/\.png$/, '')];
  if (!card) return new Response('Not found', { status: 404 });
  return ogImage(card);
}
