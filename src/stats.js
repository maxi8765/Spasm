// Usage counts for the admin dashboard, kept in a D1 database bound as STATS.
// Anonymous: each browser gets a random id (no names, emails or IP addresses are stored).

const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const EVENTS = new Set(['open', 'page', 'install', 'share', 'notify_on', 'writeup', 'submit_name', 'swipe_partner', 'favourite', 'tattoo', 'review_tap', 'famous_add']);
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
    all("SELECT event, detail, SUM(n) AS n, SUM(CASE WHEN day >= ? THEN n ELSE 0 END) AS n7, SUM(CASE WHEN day = ? THEN n ELSE 0 END) AS today FROM events WHERE event IN ('open','install','share','notify_on','writeup','submit_name','swipe_partner','favourite','tattoo','review_tap','famous_add') GROUP BY event, detail", d7, today),
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

// Read-only weekly summary for the scheduled report email. Aggregate counts only.
// The token itself isn't in the code, only its SHA-256.
const REPORT_HASH = '6b1a2a173662d633533d8c065806c41446b9cbecfb55a0677aa392676244f28c';
async function sha256(s) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
export async function weeklyReport(request, env) {
  const u = new URL(request.url);
  const t = u.searchParams.get('t') || u.pathname.split('/')[3] || '';
  if ((await sha256(t)) !== REPORT_HASH) return json({ error: 'Wrong token' }, 403);
  if (!env.STATS) return json({ error: 'The usage database is not connected yet' }, 503);
  const db = env.STATS;
  await schema(db);
  const a0 = brisbaneDay(6), b0 = brisbaneDay(13), b1 = brisbaneDay(7), today = brisbaneDay();
  const all = (sql, ...args) => db.prepare(sql).bind(...args).all().then((r) => r.results);
  const week = (from, to) => Promise.all([
    all("SELECT event, SUM(n) AS n FROM events WHERE day BETWEEN ? AND ? AND event NOT IN ('page','country') GROUP BY event", from, to),
    all('SELECT COUNT(DISTINCT vid) AS n FROM visitors WHERE day BETWEEN ? AND ?', from, to),
    all('SELECT COUNT(*) AS n FROM firstseen WHERE day BETWEEN ? AND ?', from, to),
    all("SELECT detail, SUM(n) AS n FROM events WHERE event = 'page' AND day BETWEEN ? AND ? GROUP BY detail ORDER BY n DESC", from, to),
    all("SELECT detail, SUM(n) AS n FROM events WHERE event = 'country' AND day BETWEEN ? AND ? GROUP BY detail ORDER BY n DESC LIMIT 10", from, to),
    all("SELECT detail, SUM(n) AS n FROM events WHERE event = 'share' AND day BETWEEN ? AND ? GROUP BY detail ORDER BY n DESC", from, to),
  ]).then(([ev, u, nw, pages, countries, shares]) => ({
    from, to, events: Object.fromEntries(ev.map((r) => [r.event, r.n])), uniqueVisitors: u[0]?.n || 0, newVisitors: nw[0]?.n || 0,
    pages: Object.fromEntries(pages.map((r) => [r.detail, r.n])), countries: Object.fromEntries(countries.map((r) => [r.detail, r.n])),
    sharesByFeature: Object.fromEntries(shares.map((r) => [r.detail, r.n])),
  }));
  const daily = await all("SELECT day, SUM(n) AS n FROM events WHERE event = 'open' AND day BETWEEN ? AND ? GROUP BY day ORDER BY day", b0, today);
  let subscribers = 0, requests = 0;
  if (env.NAME_SUBMISSIONS) {
    let cursor;
    do {
      const p = await env.NAME_SUBMISSIONS.list({ cursor, limit: 1000 });
      for (const k of p.keys) { if (k.name.startsWith('push:sub:')) subscribers++; else if (/^\d{4}-/.test(k.name) && k.name.slice(0, 10) >= a0) requests++; }
      cursor = p.list_complete ? null : p.cursor;
    } while (cursor);
  }
  return json({ thisWeek: await week(a0, today), lastWeek: await week(b0, b1), dailyOpens: daily, subscribers, nameRequestsThisWeek: requests });
}
