import { famousAdmin } from '../../../src/famous.js';
export const onRequest = ({ request, env }) => famousAdmin(request, env);
