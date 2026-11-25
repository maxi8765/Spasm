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
