"""Export the name data to exports/spasm_names.csv (opens in Excel)."""
import csv, json, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = json.load(open(os.path.join(root, 'data', 'spasm.json'), encoding='utf-8'))
os.makedirs(os.path.join(root, 'exports'), exist_ok=True)
path = os.path.join(root, 'exports', 'spasm_names.csv')
with open(path, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.writer(f)
    w.writerow(['Name', 'Gender', 'A/Z', 'Enneagram type', 'Sexual adventurer type', 'Description'])
    for n in d['names']:
        w.writerow([n['n'], n['g'], n['c'], n['e'], n['s'], n['d']])
print('wrote', path)
