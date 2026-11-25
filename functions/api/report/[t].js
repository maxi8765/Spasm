import { weeklyReport } from '../../../src/stats.js';
export const onRequestGet = ({ request, env }) => weeklyReport(request, env);
