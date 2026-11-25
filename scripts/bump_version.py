"""Bump the release number so installed copies of SPASM update themselves.

Run before pushing any change:  python3 scripts/bump_version.py
"""
import json, os, re
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pub = os.path.join(root, 'public')
v = json.load(open(os.path.join(pub, 'version.json')))['v'] + 1
json.dump({'v': v}, open(os.path.join(pub, 'version.json'), 'w'))
for f, pat, rep in [('js/app.js', r'const APP_VERSION = \d+;', f'const APP_VERSION = {v};'),
                    ('sw.js', r"const CACHE = 'spasm-v\d+';", f"const CACHE = 'spasm-v{v}';")]:
    p = os.path.join(pub, f)
    s = open(p).read()
    s, n = re.subn(pat, rep, s)
    assert n == 1, f
    open(p, 'w').write(s)
print('release', v)
