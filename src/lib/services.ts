export type Service = {
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
};

/** What I offer to teams. Kept as data so the page stays a layout. */
export const services: Service[] = [
  {
    title: 'Design system audit for AI agents',
    duration: '2 weeks',
    summary:
      'Your agents write UI every day. I measure how far it drifts from your design system, then make the right way the easy way.',
    deliverables: [
      'A baseline: your agents on real tasks, with every one-off counted (raw colors, spacing, hand-rolled buttons, missing labels)',
      'Constraints that hold: lint rules, typed tokens and CI checks, so drift fails the PR instead of reaching review',
      'Agent-ready docs for your components (AGENTS.md and machine-readable specs)',
      'A before/after report your team can keep running',
    ],
  },
  {
    title: 'Workshop for frontend teams',
    duration: '1 day',
    summary:
      'A hands-on day on building components and design systems that people and agents use consistently.',
    deliverables: [
      'Component APIs that are hard to misuse (compound components, variants, slots)',
      'Tokens, lint and CI as the contract, not the docs',
      'Accessibility and motion details that make UI feel right',
    ],
  },
  {
    title: 'Component engineering',
    duration: 'By project',
    summary:
      'Accessible, animated components built into your system, like the ones in the lab: keyboard-first, reduced-motion aware, installable.',
    deliverables: [
      'Components on your tokens, with tests and docs',
      'Motion that respects reduced motion and never blocks the user',
      'Delivered as a shadcn-compatible registry, if you want one',
    ],
  },
];

export const contactEmail = 'tcostase@gmail.com';
