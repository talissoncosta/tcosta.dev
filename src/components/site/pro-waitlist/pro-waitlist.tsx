'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/registry/button';
import { useWaitlist, type WaitlistStatus } from './use-waitlist';

const messages: Record<WaitlistStatus, string> = {
  idle: '',
  submitting: '',
  joined: "You're on the list. I'll email you when Pro components are out.",
  invalid: 'That email doesn’t look right. Try again?',
  error: 'Something went wrong on my side. Please try again in a moment.',
};

const inputClassName = cn(
  'h-9 w-full min-w-0 rounded-md border bg-background px-3 text-sm shadow-xs outline-none sm:w-64',
  'placeholder:text-muted-foreground',
  'focus-visible:ring-[3px] focus-visible:ring-ring/50',
);

export function ProWaitlist({ className }: { className?: string }) {
  const { status, onSubmit } = useWaitlist();
  const isJoined = status === 'joined';

  return (
    <section
      aria-labelledby="pro-waitlist-title"
      className={cn(
        'flex flex-col gap-4 rounded-xl border bg-muted/60 p-6 md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <div className="flex max-w-xl flex-col gap-1">
        <h2 id="pro-waitlist-title" className="font-medium">
          Pro components, agent-ready
        </h2>
        <p className="text-sm text-pretty text-muted-foreground">
          Bigger pieces (combobox, data table, date picker) that ship with specs, AGENTS.md and lint
          rules, so AI agents use them right. Get one email when they&apos;re out. No spam,
          unsubscribe anytime.
        </p>
      </div>

      {isJoined ? (
        <p role="status" className="text-sm font-medium">
          {messages.joined}
        </p>
      ) : (
        <form
          action="/api/waitlist"
          method="post"
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="pro-waitlist-email" className="sr-only">
              Email
            </label>
            <input
              id="pro-waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={status === 'invalid' || undefined}
              aria-describedby="pro-waitlist-message"
              className={inputClassName}
            />
            {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <Button type="submit" loading={status === 'submitting'}>
              Notify me
            </Button>
          </div>
          <p
            id="pro-waitlist-message"
            role="status"
            className="min-h-4 text-xs text-muted-foreground"
          >
            {messages[status]}
          </p>
        </form>
      )}
    </section>
  );
}
