import { adminNames } from '../../../src/names.js';
export const onRequest = ({ request, env }) => adminNames(request, env);
