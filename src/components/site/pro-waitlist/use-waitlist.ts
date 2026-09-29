'use client';

import { useState, useSyncExternalStore, type FormEvent } from 'react';

export type WaitlistStatus = 'idle' | 'submitting' | 'joined' | 'invalid' | 'error';

const results: WaitlistStatus[] = ['joined', 'invalid', 'error'];

// After a no-JS post, the function redirects back with ?waitlist=<status>.
function useRedirectResult() {
  const result = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get('waitlist'),
    () => null,
  );
  return results.find((status) => status === result) ?? 'idle';
}

/** Submits the waitlist form with fetch; falls back to a plain form post without JS. */
export function useWaitlist() {
  const fromRedirect = useRedirectResult();
  const [submitted, setSubmitted] = useState<WaitlistStatus | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted('submitting');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      });
      const { status } = (await response.json()) as { status: WaitlistStatus };
      setSubmitted(status);
    } catch {
      setSubmitted('error');
    }
  };

  return { status: submitted ?? fromRedirect, onSubmit };
}
