// Names added by David on the admin page. Kept in the NAME_SUBMISSIONS KV namespace under
// "name:<gender>:<lowercase name>" and merged into the app's name list when it loads.
// The Enneagram type comes from the Hocko score (sum of the ten traits) using the bands in the
// June 2019 workbook; the sexual adventurer type is the sexual adventurousness score.

const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...extra } });

export const BANDS = [[41, 60, 7], [38, 40, 8], [36, 37, 3], [34, 35, 2], [32, 33, 6], [30, 31, 9], [28, 29, 4], [25, 27, 1], [1, 24, 5]];
export const enneaFromScore = (s) => (BANDS.find(([lo, hi]) => s >= lo && s <= hi) || [0, 0, 5])[2];

function checkKey(request, env) {
  const key = new URL(request.url).searchParams.get('key') || request.headers.get('x-admin-key') || '';
  if (!env.ADMIN_KEY) return json({ error: 'ADMIN_KEY is not set up yet' }, 503);
  if (key !== env.ADMIN_KEY) return json({ error: 'Wrong key' }, 403);
  if (!env.NAME_SUBMISSIONS) return json({ error: 'Storage is not connected' }, 503);
  return null;
}

async function allAdded(env) {
  const out = [];
  let cursor;
  do {
    const page = await env.NAME_SUBMISSIONS.list({ prefix: 'name:', cursor, limit: 1000 });
    for (const k of page.keys) {
      const v = await env.NAME_SUBMISSIONS.get(k.name);
      try { out.push(JSON.parse(v)); } catch { /* skip */ }
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
  return out.sort((a, b) => a.n.localeCompare(b.n));
}

// Public: what the app merges in. Rows match public/data/names.json.
export async function extraNames(env) {
  if (!env.NAME_SUBMISSIONS) return json({ names: [] }, 200, { 'cache-control': 'public, max-age=60' });
  const list = await allAdded(env);
  const names = list.map((r) => ({
    row: [r.n, r.g, r.c, r.e, r.s, r.t.map((v, i) => (i === 0 && v >= 10 ? 'A' : String(v))).join('')],
    d: r.d,
  }));
  return json({ names }, 200, { 'cache-control': 'public, max-age=60' });
}

// Admin: list, add or update, delete
export async function adminNames(request, env) {
  const bad = checkKey(request, env);
  if (bad) return bad;
  if (request.method === 'GET') return json({ names: await allAdded(env) });

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  const name = String(body.name || '').trim().replace(/\s+/g, ' ').slice(0, 40);
  const g = body.gender === 'M' ? 'M' : body.gender === 'F' ? 'F' : '';
  if (!name || !g) return json({ error: 'Name and gender are required' }, 400);
  const key = `name:${g}:${name.toLowerCase()}`;

  if (request.method === 'DELETE') {
    await env.NAME_SUBMISSIONS.delete(key);
    return json({ ok: true });
  }
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const d = String(body.description || '').trim().slice(0, 4000);
  if (!d) return json({ error: 'A description is required' }, 400);
  const t = Array.isArray(body.traits) ? body.traits.map((x) => Math.round(Number(x))) : [];
  if (t.length !== 10 || t.some((x) => !Number.isFinite(x))) return json({ error: 'Ten trait scores are required' }, 400);
  if (t[0] < 1 || t[0] > 10 || t.slice(1).some((x) => x < 1 || x > 5)) return json({ error: 'Charisma is 1 to 10, the other traits 1 to 5' }, 400);
  const score = t.reduce((a, b) => a + b, 0);
  const rec = {
    n: name, g, c: body.category === 'z' ? 'z' : 'a', d, t, score,
    e: enneaFromScore(score), s: t[3], at: new Date().toISOString(),
  };
  await env.NAME_SUBMISSIONS.put(key, JSON.stringify(rec));
  // a changed description needs fresh translations
  await Promise.all(['es', 'pt', 'zh', 'hi'].map((l) => env.NAME_SUBMISSIONS.delete(`tr:${l}:d:${g}:${name}`)));
  return json({ ok: true, name: rec });
}
