// Triggered each morning by the scheduled Worker. Sends at most once per (Brisbane) day,
// so calling it again, by anyone, does nothing.
import { sendDaily } from '../../../src/push.js';
export async function onRequestPost({ env }) {
  if (!env.NAME_SUBMISSIONS) return new Response('storage not connected', { status: 503 });
  const today = new Date(Date.now() + 10 * 3600 * 1000).toISOString().slice(0, 10);
  if ((await env.NAME_SUBMISSIONS.get('push:lastsent')) === today) return new Response('already sent today');
  await env.NAME_SUBMISSIONS.put('push:lastsent', today);
  const r = await sendDaily(env);
  return new Response(JSON.stringify({ day: today, ...r }), { headers: { 'content-type': 'application/json' } });
}
