import { useTheme } from 'next-themes';

type Origin = { x: number; y: number };

// Radius that covers the whole viewport from the origin, so the circle ends past every corner.
function coverRadius({ x, y }: Origin) {
  return Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
}

/** Switches light/dark, revealing the new theme in a circle that grows from `origin`. */
export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme();

  return async (origin: Origin) => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Apply the class ourselves so the new snapshot is ready immediately; next-themes persists it.
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark', next === 'dark');
      setTheme(next);
    });
    await transition.ready;

    const { x, y } = origin;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${coverRadius(origin)}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  };
}
