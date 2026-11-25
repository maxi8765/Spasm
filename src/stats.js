// Usage counts for the admin dashboard, kept in a D1 database bound as STATS.
// Anonymous: each browser gets a random id (no names, emails or IP addresses are stored).

const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const EVENTS = new Set(['open', 'page', 'install', 'share', 'notify_on', 'writeup', 'submit_name', 'swipe_partner', 'favourite', 'tattoo']);
const brisbaneDay = (offsetDays = 0) => new Date(Date.now() + 10 * 3600 * 1000 - offsetDays * 86400000).toISOString().slice(0, 10);

let ready = false;
async function schema(db) {
  if (ready) return;
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS events (day TEXT, event TEXT, detail TEXT, n INTEGER, PRIMARY KEY (day, event, detail))'),
    db.prepare('CREATE TABLE IF NOT EXISTS visitors (day TEXT, vid TEXT, PRIMARY KEY (day, vid))'),
    db.prepare('CREATE TABLE IF NOT EXISTS firstseen (vid TEXT PRIMARY KEY, day TEXT)'),
  ]);
  ready = true;
}

const bump = (db, day, event, detail) => db.prepare('INSERT INTO events (day, event, detail, n) VALUES (?, ?, ?, 1) ON CONFLICT (day, event, detail) DO UPDATE SET n = n + 1').bind(day, event, detail);

export async function track(request, env) {
  if (!env.STATS) return new Response(null, { status: 204 });
  let b;
  try { b = await request.json(); } catch { return new Response(null, { status: 204 }); }
  const e = String(b.e || '');
  if (!EVENTS.has(e)) return new Response(null, { status: 204 });
  const detail = String(b.d || '').slice(0, 40);
  const vid = String(b.v || '').replace(/[^a-z0-9]/gi, '').slice(0, 32);
  const day = brisbaneDay();
  const db = env.STATS;
  try {
    await schema(db);
    const q = [bump(db, day, e, detail)];
    if (e === 'open') {
      const country = (request.cf && request.cf.country) || '??';
      q.push(bump(db, day, 'country', country));
      if (vid) {
        q.push(db.prepare('INSERT OR IGNORE INTO visitors (day, vid) VALUES (?, ?)').bind(day, vid));
        q.push(db.prepare('INSERT OR IGNORE INTO firstseen (vid, day) VALUES (?, ?)').bind(vid, day));
      }
    }
    await db.batch(q);
  } catch { /* never break the app over stats */ }
  return new Response(null, { status: 204 });
}

export async function adminStats(request, env) {
  const key = new URL(request.url).searchParams.get('key') || '';
  if (!env.ADMIN_KEY) return json({ error: 'ADMIN_KEY is not set up yet' }, 503);
  if (key !== env.ADMIN_KEY) return json({ error: 'Wrong key' }, 403);
  if (!env.STATS) return json({ error: 'The usage database is not connected yet' }, 503);
  const db = env.STATS;
  await schema(db);
  const since = brisbaneDay(29), d7 = brisbaneDay(6), today = brisbaneDay();
  const all = (sql, ...args) => db.prepare(sql).bind(...args).all().then((r) => r.results);
  const [daily, uniques, newVisitors, totals, pages, countries, uniq7, uniq30, uniqAll] = await Promise.all([
    all("SELECT day, SUM(n) AS n FROM events WHERE event = 'open' AND day >= ? GROUP BY day ORDER BY day", since),
    all('SELECT day, COUNT(*) AS n FROM visitors WHERE day >= ? GROUP BY day ORDER BY day', since),
    all('SELECT day, COUNT(*) AS n FROM firstseen WHERE day >= ? GROUP BY day ORDER BY day', since),
    all("SELECT event, detail, SUM(n) AS n, SUM(CASE WHEN day >= ? THEN n ELSE 0 END) AS n7, SUM(CASE WHEN day = ? THEN n ELSE 0 END) AS today FROM events WHERE event IN ('open','install','share','notify_on','writeup','submit_name','swipe_partner','favourite','tattoo') GROUP BY event, detail", d7, today),
    all("SELECT detail, SUM(n) AS n FROM events WHERE event = 'page' AND day >= ? GROUP BY detail ORDER BY n DESC", since),
    all("SELECT detail, SUM(n) AS n FROM events WHERE event = 'country' AND day >= ? GROUP BY detail ORDER BY n DESC LIMIT 15", since),
    all('SELECT COUNT(DISTINCT vid) AS n FROM visitors WHERE day >= ?', d7),
    all('SELECT COUNT(DISTINCT vid) AS n FROM visitors WHERE day >= ?', since),
    all('SELECT COUNT(*) AS n FROM firstseen'),
  ]);
  let subscribers = 0, addedNames = 0;
  if (env.NAME_SUBMISSIONS) {
    for (const [prefix, set] of [['push:sub:', (n) => { subscribers = n; }], ['name:', (n) => { addedNames = n; }]]) {
      let cursor, n = 0;
      do { const p = await env.NAME_SUBMISSIONS.list({ prefix, cursor, limit: 1000 }); n += p.keys.length; cursor = p.list_complete ? null : p.cursor; } while (cursor);
      set(n);
    }
  }
  return json({ today, daily, uniques, newVisitors, totals, pages, countries, unique7: uniq7[0]?.n || 0, unique30: uniq30[0]?.n || 0, uniqueAll: uniqAll[0]?.n || 0, subscribers, addedNames });
}
