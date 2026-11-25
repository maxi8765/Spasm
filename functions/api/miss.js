// Pages Function version of the missed-name log (same logic as src/worker.js).
import { logMiss } from '../../src/submit.js';
export const onRequestPost = ({ request, env }) => logMiss(request, env);
