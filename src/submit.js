// Shared by the Worker (src/worker.js) and the Pages Function (functions/api/submit-name.js).
export async function submitName(request, env) {
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

export const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json' } });

// Names people searched for that SPASM doesn't have (for David's to-write list)
export async function logMiss(request, env) {
  if (!env.NAME_SUBMISSIONS) return new Response(null, { status: 204 });
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  const name = String(body.name || '').trim().slice(0, 40);
  const gender = body.gender === 'M' ? 'M' : 'F';
  if (!name) return new Response(null, { status: 204 });
  const key = `miss:${gender}:${name.toLowerCase()}`;
  const prev = parseInt((await env.NAME_SUBMISSIONS.get(key)) || '0', 10);
  await env.NAME_SUBMISSIONS.put(key, String(prev + 1));
  return new Response(null, { status: 204 });
}

// Private list of submissions and missed searches. Needs the ADMIN_KEY secret, passed as ?key=
export async function adminList(request, env) {
  const key = new URL(request.url).searchParams.get('key') || '';
  if (!env.ADMIN_KEY) return json({ error: 'ADMIN_KEY is not set up yet' }, 503);
  if (key !== env.ADMIN_KEY) return json({ error: 'Wrong key' }, 403);
  if (!env.NAME_SUBMISSIONS) return json({ error: 'Storage is not connected' }, 503);
  const submissions = [], misses = [];
  let cursor;
  do {
    const page = await env.NAME_SUBMISSIONS.list({ cursor, limit: 1000 });
    for (const k of page.keys) {
      if (k.name.startsWith('miss:')) {
        const [, gender, name] = k.name.split(':');
        misses.push({ name, gender, count: parseInt((await env.NAME_SUBMISSIONS.get(k.name)) || '0', 10) });
      } else if (!/^(push|name|famous|rl):/.test(k.name)) {
        const v = await env.NAME_SUBMISSIONS.get(k.name);
        try { submissions.push(JSON.parse(v)); } catch { /* skip */ }
      }
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
  submissions.sort((a, b) => (a.at < b.at ? 1 : -1));
  misses.sort((a, b) => b.count - a.count);
  return new Response(JSON.stringify({ submissions, misses }), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}
