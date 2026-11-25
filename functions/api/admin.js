import { adminList } from '../../src/submit.js';
export const onRequestGet = ({ request, env }) => adminList(request, env);
