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
        <li>
          <SiteNavLink href="https://github.com/talissoncosta" label="GitHub" external />
        </li>
      </ul>
    </nav>
  );
}
