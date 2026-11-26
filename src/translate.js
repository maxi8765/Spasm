// Machine translation of David's descriptions for the Spanish, Chinese and Hindi versions.
// GET /api/tr?lang=es&k=d:F:Charlotte   name description
//                     &k=c:ONEwithONE:2  couple compatibility text (template, keeps the (n) name markers)
//                     &k=s:SONEwithONE:1 sexual compatibility text
// The source text is read from the app's own data files, so this can't be used to translate anything else.
// Each translation is made once with Workers AI and kept in KV for everyone after that.

const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', 'cache-control': status === 200 ? 'public, max-age=86400' : 'no-store' } });
const LANGS = { es: 'Spanish (neutral, understood in Spain and Latin America)', pt: 'Brazilian Portuguese', zh: 'Simplified Chinese', hi: 'Hindi' };
const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const DV = 3;

async function asset(request, env, path) {
  const url = new URL(path, request.url);
  const r = env.ASSETS ? await env.ASSETS.fetch(url) : await fetch(url);
  if (!r.ok) throw new Error('asset ' + r.status);
  return r.json();
}

async function source(request, env, k) {
  const [kind, a, b] = k.split(':');
  if (kind === 'd') {
    const g = a === 'M' ? 'M' : 'F';
    const L = (b[0] || '').toUpperCase();
    const shard = await asset(request, env, `/data/desc/${g}-${L >= 'A' && L <= 'Z' ? L : '_'}.json?v=${DV}`);
    if (shard[b]) return { text: shard[b], name: b };
    const added = env.NAME_SUBMISSIONS && await env.NAME_SUBMISSIONS.get(`name:${g}:${b.toLowerCase()}`, 'json');
    return added && added.d ? { text: added.d, name: b } : null;
  }
  if (kind === 'c' || kind === 's') {
    const t = await asset(request, env, `/data/tables.json?v=${DV}`);
    const row = (kind === 'c' ? t.couple : t.sexual)[a];
    const text = row && row.texts[+b];
    return text ? { text, couple: true } : null;
  }
  return null;
}

export async function translate(request, env) {
  const u = new URL(request.url);
  const lang = u.searchParams.get('lang');
  const k = (u.searchParams.get('k') || '').slice(0, 80);
  if (!LANGS[lang] || !/^(d:[FM]:[^:]{1,40}|[cs]:[A-Z]+with[A-Z]+:\d{1,2})$/.test(k)) return json({ error: 'Bad request' }, 400);
  const kv = env.NAME_SUBMISSIONS;
  const key = `tr:${lang}:${k}`;
  if (kv) { const hit = await kv.get(key); if (hit) return json({ text: hit, cached: true }); }
  if (!env.AI) return json({ error: 'Translation is not set up yet' }, 503);
  let src;
  try { src = await source(request, env, k); } catch { src = null; }
  if (!src) return json({ error: 'Not found' }, 404);
  const rules = src.couple
    ? 'It describes how two people get on as a couple. Keep every marker like (1), (5) or (9) exactly as it is, unchanged and untranslated, because names are put in there later.'
    : `It describes the personality of someone named ${src.name}. Keep the name ${src.name} exactly as it is.`;
  const messages = [
    { role: 'system', content: `You translate cheeky, irreverent Australian humour into ${LANGS[lang]}. ${rules} Keep the tone, the jokes, any swearing and the paragraph breaks. Where an Australian reference or idiom wouldn't make sense, use the closest natural equivalent. Reply with the translation only: no notes, no quotation marks, no introduction.` },
    { role: 'user', content: src.text },
  ];
  let out;
  try {
    const r = await env.AI.run(MODEL, { messages, max_tokens: 1500, temperature: 0.3 });
    out = (r && (r.response || r.result?.response) || '').trim();
  } catch (e) {
    return json({ error: 'Translation failed' }, 502);
  }
  if (!out) return json({ error: 'Translation failed' }, 502);
  if (kv) await kv.put(key, out);
  return json({ text: out });
}
