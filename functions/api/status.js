// Reports whether storage is connected (no data is exposed).
export const onRequestGet = ({ env }) =>
  new Response(JSON.stringify({ storage: !!env.NAME_SUBMISSIONS }), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
