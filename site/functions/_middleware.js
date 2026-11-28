// Sends spasm-site.pages.dev to the real address, keeping the path.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (['spasm-site.pages.dev', 'www.spasm.pro', 'get.spasm.pro'].includes(url.hostname)) { url.hostname = 'spasm.pro'; url.protocol = 'https:'; return Response.redirect(url.toString(), 301); }
  return next();
}
