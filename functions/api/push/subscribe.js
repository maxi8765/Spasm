import { pushSubscribe } from '../../../src/push.js';
export const onRequestPost = ({ request, env }) => pushSubscribe(request, env);
