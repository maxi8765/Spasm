// Sends spasm-site.pages.dev to the real address, keeping the path.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'spasm-site.pages.dev') { url.hostname = 'get.spasm.pro'; url.protocol = 'https:'; return Response.redirect(url.toString(), 301); }
  return next();
}
