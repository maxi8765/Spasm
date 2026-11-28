// Sends www.spasm.pro and spasm.pages.dev to spasm.pro, keeping the path.
// /api stays on spasm.pages.dev so the scheduled jobs that call it keep working.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'www.spasm.pro' || (url.hostname === 'spasm.pages.dev' && !url.pathname.startsWith('/api/'))) {
    url.hostname = 'spasm.pro';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
