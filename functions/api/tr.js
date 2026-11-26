import { translate } from '../../src/translate.js';
export const onRequestGet = ({ request, env }) => translate(request, env);
