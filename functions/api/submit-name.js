// Cloudflare Pages Function version of the submit-name API (same logic as src/worker.js).
import { submitName } from '../../src/submit.js';
export const onRequestPost = ({ request, env }) => submitName(request, env);
