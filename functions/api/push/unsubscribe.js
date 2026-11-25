import { pushUnsubscribe } from '../../../src/push.js';
export const onRequestPost = ({ request, env }) => pushUnsubscribe(request, env);
