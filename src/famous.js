// Famous couples added by users. Shown to everyone. Kept as one list in the NAME_SUBMISSIONS
// KV namespace under "famous:list". David can remove entries from the admin page.

const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const KEY = 'famous:list';
const MAX = 500;
// Keep the public list clean. Not exhaustive; David can delete anything that slips through.
const BLOCK = /\b(f+u+c+k|shit|cunt|bitch|nigg|fag|rape|porn|nazi|hitler|whore|slut|dick|cock|pussy|wank|retard)/i;
const nameOk = (s) => /^[\p{L}][\p{L}' .-]{0,29}$/u.test(s);

async function load(env) {
  try { return JSON.parse((await env.NAME_SUBMISSIONS.get(KEY)) || '[]'); } catch { return []; }
}

export async function famousList(env) {
  if (!env.NAME_SUBMISSIONS) return json({ couples: [] });
  return json({ couples: await load(env) });
}

export async function famousAdd(request, env) {
  if (!env.NAME_SUBMISSIONS) return json({ error: 'Storage is not connected' }, 503);
  let b;
  try { b = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  const a = String(b.a || '').trim(), bb = String(b.b || '').trim();
  const ga = b.ga === 'M' ? 'M' : 'F', gb = b.gb === 'M' ? 'M' : 'F';
  const note = String(b.note || '').trim().replace(/\s+/g, ' ').slice(0, 40);
  if (!nameOk(a) || !nameOk(bb)) return json({ error: 'Pick both names from the list' }, 400);
  if (!note) return json({ error: 'Say who they are' }, 400);
  if (BLOCK.test(a + ' ' + bb + ' ' + note)) return json({ error: 'Keep it clean, please' }, 400);
  // a few adds per person per day
  const ip = request.headers.get('cf-connecting-ip') || 'x';
  const day = new Date().toISOString().slice(0, 10);
  const rl = `rl:famous:${day}:${ip}`;
  const n = parseInt((await env.NAME_SUBMISSIONS.get(rl)) || '0', 10);
  if (n >= 5) return json({ error: 'That\'s plenty for today. Try again tomorrow' }, 429);
  await env.NAME_SUBMISSIONS.put(rl, String(n + 1), { expirationTtl: 172800 });
  const list = await load(env);
  const same = (x) => x.a.toLowerCase() === a.toLowerCase() && x.b.toLowerCase() === bb.toLowerCase() && x.note.toLowerCase() === note.toLowerCase();
  if (list.some(same)) return json({ ok: true, couples: list, duplicate: true });
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  list.unshift({ id, a, ga, b: bb, gb, note, at: new Date().toISOString() });
  list.length = Math.min(list.length, MAX);
  await env.NAME_SUBMISSIONS.put(KEY, JSON.stringify(list));
  return json({ ok: true, couples: list });
}

export async function famousAdmin(request, env) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  if (!env.ADMIN_KEY) return json({ error: 'ADMIN_KEY is not set up yet' }, 503);
  if (key !== env.ADMIN_KEY) return json({ error: 'Wrong key' }, 403);
  if (!env.NAME_SUBMISSIONS) return json({ error: 'Storage is not connected' }, 503);
  const list = await load(env);
  if (request.method === 'DELETE') {
    const id = url.searchParams.get('id');
    const next = list.filter((x) => x.id !== id);
    await env.NAME_SUBMISSIONS.put(KEY, JSON.stringify(next));
    return json({ ok: true, couples: next });
  }
  return json({ couples: list });
}
