// Cloudflare Worker: serves the static app from ./public and handles the submit-name API.
// "Submit a name" requests go to the NAME_SUBMISSIONS KV namespace if it is bound.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/submit-name') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
      return submitName(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function submitName(request, env) {
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
  await env.NAME_SUBMISSIONS.put(`${record.at}:${gender}:${name.toLowerCase()}`, JSON.stringify(record));
  return json({ ok: true });
}

const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json' } });
