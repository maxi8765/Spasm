// Daily "name of the day" notifications (Web Push).
// Pushes carry no payload: the service worker works out today's name itself when one arrives,
// so no message encryption is needed, only a signed VAPID token.
// The VAPID key pair is made on first use and kept in the NAME_SUBMISSIONS KV namespace.

const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const CONTACT = 'mailto:spasmapp@gmail.com';

async function getVapid(env) {
  const saved = await env.NAME_SUBMISSIONS.get('push:vapid');
  if (saved) return JSON.parse(saved);
  const pair = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
  const privateJwk = await crypto.subtle.exportKey('jwk', pair.privateKey);
  const publicRaw = b64url(await crypto.subtle.exportKey('raw', pair.publicKey));
  const v = { privateJwk, publicRaw };
  await env.NAME_SUBMISSIONS.put('push:vapid', JSON.stringify(v));
  return v;
}

async function subKey(endpoint) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint));
  return 'push:sub:' + [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export async function pushKey(env) {
  if (!env.NAME_SUBMISSIONS) return json({ error: 'Storage is not connected' }, 503);
  return json({ key: (await getVapid(env)).publicRaw });
}

export async function pushSubscribe(request, env) {
  if (!env.NAME_SUBMISSIONS) return json({ error: 'Storage is not connected' }, 503);
  let sub;
  try { sub = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  if (!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint)) return json({ error: 'Bad subscription' }, 400);
  await env.NAME_SUBMISSIONS.put(await subKey(sub.endpoint), JSON.stringify({ endpoint: sub.endpoint, at: new Date().toISOString() }));
  return json({ ok: true });
}

export async function pushUnsubscribe(request, env) {
  if (!env.NAME_SUBMISSIONS) return json({ ok: true });
  let sub;
  try { sub = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }
  if (sub && sub.endpoint) await env.NAME_SUBMISSIONS.delete(await subKey(sub.endpoint));
  return json({ ok: true });
}

async function vapidHeader(endpoint, v) {
  const aud = new URL(endpoint).origin;
  const enc = (o) => b64url(new TextEncoder().encode(JSON.stringify(o)));
  const unsigned = `${enc({ typ: 'JWT', alg: 'ES256' })}.${enc({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: CONTACT })}`;
  const key = await crypto.subtle.importKey('jwk', v.privateJwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(unsigned));
  return `vapid t=${unsigned}.${b64url(sig)}, k=${v.publicRaw}`;
}

// Called by the daily schedule. Sends an empty push to every subscriber and drops dead ones.
export async function sendDaily(env) {
  if (!env.NAME_SUBMISSIONS) return { sent: 0, removed: 0 };
  const v = await getVapid(env);
  let cursor, sent = 0, removed = 0;
  do {
    const page = await env.NAME_SUBMISSIONS.list({ prefix: 'push:sub:', cursor, limit: 1000 });
    for (const k of page.keys) {
      const rec = JSON.parse((await env.NAME_SUBMISSIONS.get(k.name)) || 'null');
      if (!rec) continue;
      try {
        const res = await fetch(rec.endpoint, { method: 'POST', headers: { TTL: '43200', Urgency: 'normal', Authorization: await vapidHeader(rec.endpoint, v) } });
        if (res.status === 404 || res.status === 410) { await env.NAME_SUBMISSIONS.delete(k.name); removed++; }
        else if (res.ok) sent++;
      } catch { /* try again tomorrow */ }
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
  return { sent, removed };
}

export { fromB64url };
