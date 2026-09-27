import type { MetadataRoute } from 'next';
import { catalog } from '@/lib/catalog';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/lab', '/writing'].map((path) => ({ url: `${site.url}${path}` }));
  const components = catalog.map(({ slug, addedAt }) => ({
    url: `${site.url}/lab/${slug}`,
    lastModified: addedAt,
  }));
  return [...pages, ...components];
}
