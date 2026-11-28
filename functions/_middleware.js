// Sends www.spasm.pro to spasm.pro, keeping the path.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'www.spasm.pro') {
    url.hostname = 'spasm.pro';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
