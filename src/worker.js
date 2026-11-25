import { submitName, logMiss, adminList, json } from './submit.js';
import { pushKey, pushSubscribe, pushUnsubscribe } from './push.js';

// Cloudflare Worker: serves the static app from ./public and handles the submit-name API.
// "Submit a name" requests go to the NAME_SUBMISSIONS KV namespace if it is bound.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/submit-name') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
      return submitName(request, env);
    }
    if (url.pathname === '/api/miss' && request.method === 'POST') return logMiss(request, env);
    if (url.pathname === '/api/status') return json({ storage: !!env.NAME_SUBMISSIONS });
    if (url.pathname === '/api/admin') return adminList(request, env);
    if (url.pathname === '/api/push/key') return pushKey(env);
    if (url.pathname === '/api/push/subscribe' && request.method === 'POST') return pushSubscribe(request, env);
    if (url.pathname === '/api/push/unsubscribe' && request.method === 'POST') return pushUnsubscribe(request, env);
    return env.ASSETS.fetch(request);
  },
  // Daily schedule (see [triggers] in wrangler.toml): send the name of the day to subscribers
  async scheduled(event, env, ctx) {
    // The Pages site holds the subscriber list, so ask it to send (it sends once a day at most)
    ctx.waitUntil(fetch('https://spasm.pages.dev/api/push/send', { method: 'POST' }));
  },
};

