"use client";

import { motion, type Transition } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/lab", label: "Lab" },
  { href: "/writing", label: "Writing" },
];

const LINK =
  "relative rounded-full px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 aria-[current=page]:text-neutral-900 dark:aria-[current=page]:text-neutral-100";
const PILL = "absolute inset-0 -z-10 rounded-full bg-neutral-100 dark:bg-neutral-800/70";

// Same feel as the animated tabs: quick, with a touch of overshoot.
const pillTransition: Transition = { type: "spring", duration: 0.35, bounce: 0.2 };

/** Primary navigation; the active section's pill slides between links. */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="isolate flex items-center gap-1">
        {LINKS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined} className={LINK}>
                {active && <motion.span layoutId="site-nav-pill" transition={pillTransition} className={PILL} />}
                {label}
              </Link>
            </li>
          );
        })}
        <li>
          <a href="https://github.com/talissoncosta" target="_blank" rel="noreferrer" className={LINK}>
            GitHub<span aria-hidden> ↗</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
