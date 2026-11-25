import { famousList, famousAdd } from '../../src/famous.js';
export const onRequestGet = ({ env }) => famousList(env);
export const onRequestPost = ({ request, env }) => famousAdd(request, env);
