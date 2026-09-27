import registry from '../../registry.json';
import { site } from './site';

type RegistryItem = { name: string; dependencies?: string[] };

export function installCommand(slug: string) {
  return `npx shadcn@latest add ${site.url}/r/${slug}.json`;
}

/** npm packages the component pulls in (installed automatically by the shadcn CLI). */
export function dependenciesOf(slug: string) {
  const items: RegistryItem[] = registry.items;
  return items.find(({ name }) => name === slug)?.dependencies ?? [];
}
