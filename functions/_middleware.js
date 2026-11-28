// Sends spasm.pages.dev to app.spasm.pro, keeping the path.
// /api stays on spasm.pages.dev so the scheduled jobs that call it keep working.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'spasm.pages.dev' && !url.pathname.startsWith('/api/')) {
    url.hostname = 'app.spasm.pro';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
