// Cloudflare Pages Function: stores "submit a name" requests in the NAME_SUBMISSIONS KV namespace.
// List them with: npx wrangler kv key list --binding NAME_SUBMISSIONS
export async function onRequestPost({ request, env }) {
  if (!env.NAME_SUBMISSIONS) return json({ error: 'Submissions are not set up yet' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  const name = String(body.name || '').trim().slice(0, 40);
  const gender = body.gender === 'M' ? 'M' : 'F';
  if (!name) return json({ error: 'Name required' }, 400);
  const record = {
    name, gender,
    note: String(body.note || '').slice(0, 1000),
    email: String(body.email || '').slice(0, 120),
    at: new Date().toISOString(),
  };
  const key = `${record.at}:${gender}:${name.toLowerCase()}`;
  await env.NAME_SUBMISSIONS.put(key, JSON.stringify(record));
  return json({ ok: true });
}
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json' } });
