"""Split data/spasm.json into the small files the web app loads.

public/data/names.json   [[name, gender, cat, enneagram, sexType, traits], ...]
                         traits: 10 chars, charisma first (0-9, A = 10), then nine traits 1-5
public/data/tables.json  couple + sexual texts, baby matrix, best/worst partner
public/data/desc/F-A.json etc: {name: description}
"""
import json, os, sys, collections

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = json.load(open(os.path.join(root, 'data', 'spasm.json'), encoding='utf-8'))
out = os.path.join(root, 'public', 'data')
os.makedirs(os.path.join(out, 'desc'), exist_ok=True)

names = sorted(src['names'], key=lambda n: (n['n'].lower(), n['g']))
idx = [[n['n'], n['g'], n['c'], n['e'], n['s'], ''.join(str(min(9, v)) if i else ('A' if v >= 10 else str(v)) for i, v in enumerate(n['t']))] for n in names]
json.dump(idx, open(os.path.join(out, 'names.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))

def shard_key(n):
    c = n['n'][0].upper()
    return n['g'] + '-' + (c if 'A' <= c <= 'Z' else '_')

shards = collections.defaultdict(dict)
for n in names:
    shards[shard_key(n)][n['n']] = n['d']
for k, v in shards.items():
    json.dump(v, open(os.path.join(out, 'desc', k + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))

tables = {k: src[k] for k in ('couple', 'sexual', 'baby', 'partner')}
json.dump(tables, open(os.path.join(out, 'tables.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print(len(idx), 'names,', len(shards), 'description files')
