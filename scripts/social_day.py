"""Make the name of the day social post, story and caption for a date (Brisbane time).

Usage: python3 scripts/social_day.py [YYYY-MM-DD] [out_dir]
Serves public/ on a local port, renders public/social.html in headless Chromium and saves
spasm-<date>-<name>-post.png, -story.png and -caption.txt (the caption starts with a
"CHECK BEFORE POSTING" line when the description has words social sites may flag).
Needs: pip install playwright && playwright install chromium
"""
import base64, datetime, functools, http.server, os, sys, threading
from playwright.sync_api import sync_playwright

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public')
date = sys.argv[1] if len(sys.argv) > 1 and sys.argv[1] else (datetime.datetime.utcnow() + datetime.timedelta(hours=10)).strftime('%Y-%m-%d')
out = sys.argv[2] if len(sys.argv) > 2 else 'social-out'
os.makedirs(out, exist_ok=True)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
handler = functools.partial(Quiet, directory=root)
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()
port = srv.server_address[1]

with sync_playwright() as pw:
    b = pw.chromium.launch()
    p = b.new_page()
    p.goto(f'http://127.0.0.1:{port}/social.html?date={date}')
    p.wait_for_selector('body[data-ready="1"]', timeout=30000)
    res = p.evaluate("""async () => {
      const r = window.socialResult, enc = async (bl) => { const u = new Uint8Array(await bl.arrayBuffer()); let s = ''; for (const x of u) s += String.fromCharCode(x); return btoa(s); };
      return { name: r.name, caption: r.caption, warning: r.warning, post: await enc(r.blobs.post), story: await enc(r.blobs.story) };
    }""")
    b.close()
srv.shutdown()

base = os.path.join(out, f"spasm-{date}-{res['name'].lower()}")
open(base + '-post.png', 'wb').write(base64.b64decode(res['post']))
open(base + '-story.png', 'wb').write(base64.b64decode(res['story']))
caption = (f"CHECK BEFORE POSTING: {res['warning']}\n\n" if res['warning'] else '') + res['caption']
open(base + '-caption.txt', 'w', encoding='utf-8').write(caption + '\n')
print(base)
print(caption)
