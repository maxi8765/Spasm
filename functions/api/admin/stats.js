import { adminStats } from '../../../src/stats.js';
export const onRequestGet = ({ request, env }) => adminStats(request, env);
