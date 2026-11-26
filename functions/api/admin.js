import { adminList, adminDelete } from '../../src/submit.js';
export const onRequestGet = ({ request, env }) => adminList(request, env);
export const onRequestDelete = ({ request, env }) => adminDelete(request, env);
