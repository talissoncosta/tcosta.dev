import type { ToastType } from './toast-store';

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin text-muted-foreground"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const glyphs = {
  default: { className: 'text-muted-foreground', path: 'M12 11v5.5M12 7.5v.01' },
  success: { className: 'text-emerald-500', path: 'm8 12.5 2.5 2.5L16 9.5' },
  error: { className: 'text-destructive', path: 'M12 7.5v5.5M12 16.5v.01' },
};

export function ToastIcon({ type }: { type: ToastType }) {
  if (type === 'loading') return <Spinner />;
  const { className, path } = glyphs[type];

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
      className="size-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
