import { getPhoto } from '../../../src/submit.js';
export const onRequestGet = ({ request, env }) => getPhoto(request, env);
