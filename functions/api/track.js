import { track } from '../../src/stats.js';
export const onRequestPost = ({ request, env }) => track(request, env);
