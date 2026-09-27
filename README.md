# tcosta.dev

Personal site of Talisson Costa, frontend design engineer — and a lab of small, fluid, animated
React components, built in public.

**[tcosta.dev](https://tcosta.dev)** · [Lab](https://tcosta.dev/lab) · [Writing](https://tcosta.dev/writing)

## Use a component

Every component in the lab installs with the shadcn CLI:

```bash
npx shadcn@latest add https://tcosta.dev/r/switch.json
```

The CLI copies the files into `components/<slug>/`, installs the npm dependencies and sets up
`cn()`. Components use the [shadcn/ui](https://ui.shadcn.com) theme tokens, so they follow your
theme. You can also copy the source straight from the component's page.

| Component       | What it does                                                                       |
| --------------- | ---------------------------------------------------------------------------------- |
| `toast`         | Stacked toasts: fan out on hover, swipe to dismiss, pausing timers, promise toasts |
| `switch`        | Draggable, springy switch with async (optimistic/pessimistic) changes and forms    |
| `switch-css`    | The same switch with CSS transitions only                                          |
| `animated-tabs` | Compound tabs whose active pill slides between items                               |
| `copy-button`   | Copy icon that morphs into a check                                                 |

## Develop

```bash
yarn install
yarn dev            # http://localhost:3000
yarn build          # static export to out/
yarn lint
yarn typecheck
yarn format
yarn registry:build # shadcn registry JSON → public/r/
```

Stack: Next.js 16 (App Router, static export) · React 19 · Tailwind CSS 4 · Motion · Shiki.

### Add a component

1. `src/registry/<slug>/` — the component, one folder with an `index.ts`.
2. `src/demos/<slug>-demo.tsx` — a default-exported demo.
3. An entry in `src/lib/catalog.ts` and an item in `registry.json` (with a `target` of
   `components/<slug>/<file>` for each file).

The gallery, the component page, its social card and the sitemap pick it up automatically.

### Principles

- Accessible first (roles, keyboard, labels), animation second.
- Respect `prefers-reduced-motion`.
- Short springs; animate `transform`, `opacity` and `filter`.
- CSS when it's enough, JS when it's needed (interruption, gestures, layout).

## License

[MIT](./LICENSE). The Geist font files in `src/assets/fonts` are under the
[SIL Open Font License](./src/assets/fonts/OFL.txt).
