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
    paid: body.paid ? 'Stripe' : '',
    ref: 'SP' + Date.now().toString(36).toUpperCase().slice(-6) + Math.random().toString(36).slice(2, 4).toUpperCase(),
    at: new Date().toISOString(),
  };
  // optional photo of the person: a JPEG the app has already shrunk, kept under an unguessable link
  let photoUrl = '';
  const m = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(String(body.photo || ''));
  if (m && m[1].length < 2_000_000) {
    const bytes = Uint8Array.from(atob(m[1]), (c) => c.charCodeAt(0));
    const token = [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, '0')).join('');
    await env.NAME_SUBMISSIONS.put(`photo:${token}`, bytes, { metadata: { ref: record.ref } });
    record.photo = token;
    photoUrl = new URL(`/api/photo/${token}`, request.url).toString();
  }
  await env.NAME_SUBMISSIONS.put(`${record.at}:${gender}:${name.toLowerCase()}`, JSON.stringify(record));
  return json({ ok: true, ref: record.ref, photoUrl });
}

// Serves an uploaded photo. The token is long and random, so only people sent the link can see it.
export async function getPhoto(request, env) {
  const token = new URL(request.url).pathname.split('/').pop();
  if (!/^[a-f0-9]{32}$/.test(token) || !env.NAME_SUBMISSIONS) return new Response('Not found', { status: 404 });
  const buf = await env.NAME_SUBMISSIONS.get(`photo:${token}`, 'arrayBuffer');
  if (!buf) return new Response('Not found', { status: 404 });
  return new Response(buf, { headers: { 'content-type': 'image/jpeg', 'cache-control': 'private, max-age=86400', 'x-robots-tag': 'noindex' } });
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
        misses.push({ k: k.name, name, gender, count: parseInt((await env.NAME_SUBMISSIONS.get(k.name)) || '0', 10) });
      } else if (!/^(push|name|famous|rl|tr|photo):/.test(k.name)) {
        const v = await env.NAME_SUBMISSIONS.get(k.name);
        try { submissions.push({ ...JSON.parse(v), k: k.name }); } catch { /* skip */ }
      }
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
  submissions.sort((a, b) => (a.at < b.at ? 1 : -1));
  misses.sort((a, b) => b.count - a.count);
  return new Response(JSON.stringify({ submissions, misses }), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}

// Deletes one submitted name or missed search. Paid write-up requests can't be deleted.
export async function adminDelete(request, env) {
  const key = new URL(request.url).searchParams.get('key') || '';
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) return json({ error: 'Wrong key' }, 403);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  const k = String(body.k || '');
  if (!k || /^(push|name|famous|rl|tr|photo):/.test(k)) return json({ error: 'Not allowed' }, 400);
  if (!k.startsWith('miss:')) {
    const v = await env.NAME_SUBMISSIONS.get(k);
    if (!v) return json({ ok: true });
    let r = {};
    try { r = JSON.parse(v); } catch { /* delete anyway */ }
    if (r.paid) return json({ error: 'Paid requests can\'t be deleted' }, 409);
    if (r.photo) await env.NAME_SUBMISSIONS.delete(`photo:${r.photo}`);
  }
  await env.NAME_SUBMISSIONS.delete(k);
  return json({ ok: true });
}
