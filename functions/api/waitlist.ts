// Cloudflare Pages Function: POST /api/waitlist → adds the email to a Resend segment.
// Runs on Cloudflare (not in the Next static build). Secrets are set in the Pages project:
// RESEND_API_KEY (full access) and RESEND_WAITLIST_SEGMENT_ID.

type Env = {
  RESEND_API_KEY?: string;
  RESEND_WAITLIST_SEGMENT_ID?: string;
  /** Override for local tests; defaults to the real API. */
  RESEND_API_URL?: string;
};

type Context = { request: Request; env: Env };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resendFetch(env: Env, path: string, body?: unknown) {
  return fetch(`${env.RESEND_API_URL ?? 'https://api.resend.com'}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent': 'tcosta.dev-waitlist/1.0',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

// Create the contact in the segment. Resend doesn't document duplicates, so if creating fails
// (e.g. the email is already a contact), add the existing contact to the segment instead.
async function subscribe(env: Env, email: string): Promise<string | null> {
  const segment = env.RESEND_WAITLIST_SEGMENT_ID!;
  const created = await resendFetch(env, '/contacts', {
    email,
    unsubscribed: false,
    segments: [{ id: segment }],
  });
  if (created.ok) return null;
  if (created.status === 429) return 'resend_429';

  const added = await resendFetch(
    env,
    `/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segment)}`,
  );
  return added.ok ? null : `resend_${created.status}_${added.status}`;
}

// `reason` is a short failure code (never a secret), to debug config issues from the response.
function reply(request: Request, status: 'joined' | 'invalid' | 'error', reason?: string) {
  const wantsJson = request.headers.get('Accept')?.includes('application/json');
  if (wantsJson) {
    return Response.json(
      { status, ...(reason && { reason }) },
      { status: status === 'joined' ? 200 : status === 'invalid' ? 400 : 502 },
    );
  }
  // No-JS form post: go back to the page with the result in the query string.
  const back = new URL(request.headers.get('Referer') ?? '/lab', request.url);
  back.searchParams.set('waitlist', status);
  return Response.redirect(back.toString(), 303);
}

export async function onRequestPost({ request, env }: Context) {
  if (!env.RESEND_API_KEY) return reply(request, 'error', 'missing_api_key');
  if (!env.RESEND_WAITLIST_SEGMENT_ID) return reply(request, 'error', 'missing_segment_id');

  const form = await request.formData().catch(() => null);
  const email = String(form?.get('email') ?? '')
    .trim()
    .toLowerCase();
  const honeypot = String(form?.get('company') ?? '');

  // Bots fill every field; people never see this one. Pretend it worked.
  if (honeypot) return reply(request, 'joined');
  if (email.length > 254 || !EMAIL.test(email)) return reply(request, 'invalid');

  const failure = await subscribe(env, email).catch(() => 'network');
  return failure ? reply(request, 'error', failure) : reply(request, 'joined');
}
