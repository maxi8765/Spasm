import { submitName, logMiss, json } from './submit.js';

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
    return env.ASSETS.fetch(request);
  },
};

