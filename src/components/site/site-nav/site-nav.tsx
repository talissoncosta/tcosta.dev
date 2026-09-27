import { ThemeToggle } from '@/registry/theme-toggle';
import { SiteNavLink } from './site-nav-link';

const links = [
  { href: '/lab', label: 'Lab' },
  { href: '/writing', label: 'Writing' },
];

export function SiteNav() {
  return (
    <nav aria-label="Main">
      <ul className="isolate flex items-center gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <SiteNavLink {...link} />
          </li>
        ))}
        {/* On phones the header can't fit it; GitHub is also linked from the home page. */}
        <li className="hidden sm:block">
          <SiteNavLink href="https://github.com/talissoncosta" label="GitHub" external />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
