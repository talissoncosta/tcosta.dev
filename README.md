# UI Lab

Small, fluid, animated React components — built in public.

Stack: Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion · Shiki.

## Run

```bash
yarn install
yarn dev            # http://localhost:3000
yarn build          # static build (every component page is prerendered)
yarn lint
yarn typecheck
yarn registry:build # shadcn registry JSON → public/r/
```

## Add a component

1. `src/registry/<slug>/<slug>.tsx` — the component itself (what people copy/install).
2. `src/demos/<slug>-demo.tsx` — a default-exported demo.
3. Add an entry to `src/lib/catalog.ts` and an item to `registry.json`.

The gallery (`/`) and the component page (`/c/<slug>`) pick it up automatically.

## Principles

- Respect `prefers-reduced-motion` (global `MotionConfig reducedMotion="user"`).
- Keyboard and screen-reader friendly first; animation second.
- Prefer springs and short durations; animate `transform`, `opacity` and `filter`.
- Your own take on an idea — credit inspiration, don't copy designs pixel for pixel.

## Distribution

`yarn registry:build` generates shadcn-compatible JSON in `public/r/`. Once deployed,
anyone can install a component with:

```bash
npx shadcn add https://<your-domain>/r/<slug>.json
```
