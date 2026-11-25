"""Extract SPASM data from the June 2019 master workbook into JSON."""
import json, sys, collections
import openpyxl

src, out = sys.argv[1], sys.argv[2]
wb = openpyxl.load_workbook(src, data_only=True)

BANDS = [(41,60,7),(38,40,8),(36,37,3),(34,35,2),(32,33,6),(30,31,9),(28,29,4),(25,27,1),(1,24,5)]
def ennea_from_score(s):
    for lo,hi,t in BANDS:
        if lo <= s <= hi: return t
    return None

def num(x):
    try: return int(float(str(x).strip()))
    except Exception: return None

names = []
issues = collections.Counter()
for sheet, g in (('Data Female','F'),('Data Male','M')):
    ws = wb[sheet]
    seen = set()
    for r in ws.iter_rows(min_row=2, max_col=24, values_only=True):
        if r[0] is None or str(r[0]).strip()=='' : continue
        name = str(r[0]).strip()
        desc = (str(r[1]).strip() if r[1] else '')
        cat = (str(r[2]).strip().lower() if r[2] else '')
        traits = [num(x) for x in r[3:13]]
        score = num(r[13])
        if score is None and all(t is not None for t in traits): score = sum(traits)
        ennea = num(r[23])
        calc = ennea_from_score(score) if score is not None else None
        if ennea is None: ennea = calc; issues[g+' ennea computed']+=1
        elif calc is not None and calc != ennea: issues[g+' ennea mismatch']+=1
        sex = traits[3]
        if not desc: issues[g+' no desc']+=1
        if cat not in ('a','z'): issues[g+' cat '+repr(cat)]+=1; cat = 'z' if cat.startswith('z') else 'a'
        if name.lower() in seen: issues[g+' dup']+=1; continue
        seen.add(name.lower())
        if ennea is None or sex is None or not (1<=sex<=5): issues[g+' unusable']+=1; continue
        names.append({'n':name,'g':g,'d':desc,'c':cat,'e':ennea,'s':sex})

def table(ws, ncols):
    rows = {}
    for r in ws.iter_rows(min_row=2, values_only=True):
        if not r[0]: continue
        key = str(r[0]).strip()
        try: float(r[1])
        except Exception: continue
        rows[key] = {'score': float(r[1]), 'texts':[str(t).strip() for t in r[2:2+ncols] if t and str(t).strip()]}
    return rows

couple = table(wb['Couple Lookup Table'], 5)
sexual = table(wb['Sexual Compatibility Table'], 6)

ld = wb['List Data']
baby = [[num(ld.cell(row=34+i, column=5+j).value) for j in range(9)] for i in range(9)]
partner = {str(num(ld.cell(row=46+i, column=2).value)): {'best':num(ld.cell(row=46+i,column=3).value),'worst':num(ld.cell(row=46+i,column=4).value)} for i in range(9)}

json.dump({'names':names,'couple':couple,'sexual':sexual,'baby':baby,'partner':partner}, open(out,'w'), ensure_ascii=False)
print(len(names), 'names'); print(dict(issues))
print('couple keys',len(couple),'sexual keys',len(sexual))
print('baby',baby); print('partner',partner)
