import type { Metadata } from 'next';
import { ogSize } from './og-size';
import { site } from './site';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** Social card name, served from /og/<image>.png. */
  image: string;
};

/** Title, description, canonical URL and social cards for a page, consistent across the site. */
export function pageMetadata({ title, description, path, image }: PageMetadataOptions): Metadata {
  const socialTitle = `${title} · ${site.name}`;
  const images = [{ url: `/og/${image}.png`, ...ogSize, alt: socialTitle }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      type: 'website',
      images,
    },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images },
  };
}
