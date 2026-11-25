// Offline support: cache the shell and data files as they are used.
const CACHE = 'spasm-v28';
const SHELL = ['/', '/index.html', '/css/app.css', '/js/app.js', '/js/engine.js', '/js/help.js', '/js/icons.js', '/js/share.js', '/js/i18n.js',
  '/img/logo.png', '/fonts/comfortaa-latin-400-normal.woff2', '/fonts/comfortaa-latin-700-normal.woff2', '/img/icon-192.png', '/paper.html', '/data/names.json?v=2', '/data/tables.json?v=2'];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(
  caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/api/') || url.pathname === '/version.json') return;
  // network first so updates land, cache as fallback
  e.respondWith(fetch(e.request).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request).then((r) => r || caches.match('/index.html'))));
});

// ---------- name of the day notifications ----------
// Same choice as nameOfDay() in js/engine.js, so the notification matches the home screen.
async function nameOfDay() {
  const res = await fetch('/data/names.json?v=2');
  const rows = await res.json();
  const pool = rows.filter((r) => r[2] === 'a');
  const d = new Date();
  let h = (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16;
  return pool[(h >>> 0) % pool.length];
}
async function showDaily() {
  let title = 'SPASM: name of the day', body = 'Find out what today\'s name says about them.', url = '/';
  try {
    const [n, g] = await nameOfDay();
    const L = n[0].toUpperCase();
    url = `/#/meaning/${g}/${encodeURIComponent(n)}`;
    title = `Name of the day: ${n}`;
    try {
      const shard = await (await fetch(`/data/desc/${g}-${L >= 'A' && L <= 'Z' ? L : '_'}.json?v=2`)).json();
      const d = shard[n] || '';
      if (d) body = d.length > 140 ? d.slice(0, 137).replace(/\s+\S*$/, '') + '...' : d;
    } catch { /* keep default body */ }
  } catch { /* offline: generic message */ }
  return self.registration.showNotification(title, { body, icon: '/img/icon-192.png', badge: '/img/icon-192.png', tag: 'spasm-daily', data: { url } });
}
self.addEventListener('push', (e) => e.waitUntil(showDaily()));
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ('focus' in c) { c.navigate(url); return c.focus(); } }
    return clients.openWindow(url);
  }));
});
self.addEventListener('message', (e) => { if (e.data === 'test-daily') e.waitUntil(showDaily()); });
