import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { createEngine } from '../public/js/engine.js';
const rows = JSON.parse(readFileSync(new URL('../public/data/names.json', import.meta.url)));
const tables = JSON.parse(readFileSync(new URL('../public/data/tables.json', import.meta.url)));
const E = createEngine(rows, tables);

// Worked examples saved in the June 2019 workbook
const taj = E.find('Taj', 'M'), val = E.find('Valentina', 'F');
assert.equal(taj.e, 1); assert.equal(taj.s, 2); assert.equal(val.e, 3); assert.equal(val.s, 5);
const c = E.compatibility(taj, val);
assert.equal(c.coupleScore, 1); assert.equal(c.sexScore, 0.4);
assert.ok(!/\(\d\)/.test(c.coupleText), 'type markers replaced');

const ian = E.find('Ian', 'M'), nic = E.find('Nicola', 'F');
assert.equal(ian.e, 4); assert.equal(nic.e, 6);
assert.equal(E.babyType(ian, nic), 8);
for (let i = 0; i < 50; i++) {
  const b = E.bubNames(ian, nic, 'M');
  assert.equal(b.names.length, 7);
  assert.ok(b.names.every(r => r.g === 'M' && r.e === 8));
  assert.equal(b.names.filter(r => r.c === 'a').length, 5);
}
for (let i = 0; i < 50; i++) {
  const m = E.mates(taj, 'F', 'marry');
  assert.ok(m.length === 7 && m.every(r => r.e === 3 && E.sexScore(2, r.s) > 0.61));
  const a = E.mates(taj, 'F', 'avoid');
  assert.ok(a.length === 7 && a.every(r => r.e === 4 && E.sexScore(2, r.s) <= 0.6));
  const k = E.mates(taj, 'F', 'kiss');
  assert.ok(k.length === 7 && k.every(r => r.s === 2));
}
// every person/type combination works
for (const g of ['M','F']) for (const sg of ['M','F']) for (let e = 1; e <= 9; e++) for (let s = 1; s <= 5; s++) {
  const me = { n: 'x', g, e, s };
  for (const mode of ['kiss','marry','avoid']) assert.ok(E.mates(me, sg, mode).length > 0, `${g}${sg}${e}${s}${mode}`);
}
// all 81 couple and 25 sexual keys resolve
for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) for (let x = 1; x <= 5; x++) for (let y = 1; y <= 5; y++)
  E.compatibility({ n: 'A', e: a, s: x }, { n: 'B', e: b, s: y });
assert.equal(E.search('sam', 'F')[0].n.toLowerCase().startsWith('sam'), true);
console.log('engine tests passed;', rows.length, 'names');
// new helpers
assert.ok(E.similar('Kaitlyn', 'F').length > 0, 'spelling suggestions');
console.log('similar Kaitlyn ->', E.similar('Kaitlyn','F').map(r=>r.n), '| Jonothan ->', E.similar('Jonothan','M').map(r=>r.n));
const nd = E.nameOfDay(new Date(2026, 10, 25)); assert.equal(nd.n, E.nameOfDay(new Date(2026, 10, 25)).n);
console.log('name of the day', nd.n, nd.g);
const pool = E.bubPool(ian, nic, 'F'); assert.ok(pool.length > 50 && pool.every(r => r.e === E.babyType(ian, nic) && r.g === 'F'));
console.log('swipe pool', pool.length);
// trait profiles and name chooser
assert.equal(E.find('Ab','F').t.length, 10);
const funny = [3,3,3,3,3,3,5,1,3,3];
const picks = E.chooseNames('M', funny);
assert.equal(picks.length, 7);
console.log('funny, unspiritual men ->', picks.map(r => r.n + ' ' + r.t[6] + '/' + r.t[7]).join(', '));
const common = E.chooseNames('F', [5,5,5,5,5,5,5,5,5,5], true);
assert.ok(common.length === 7 && common.every(r => r.c === 'a'));
console.log('all-5 common women ->', common.map(r => r.n).join(', '));
// shared pool is the same whichever parent comes first
const p1 = E.bubPoolShared(ian, nic, 'F').map(r => r.n), p2 = E.bubPoolShared(nic, ian, 'F').map(r => r.n);
assert.deepEqual(p1, p2); assert.equal(p1.length, 330);
const grp = E.group([ian, nic, taj, val]); assert.equal(grp.length, 6); assert.ok(grp[0].overall >= grp[5].overall);
const pets = E.petNames('X', [6, 1]); assert.equal(pets.length, 7);
console.log('group best', grp[0].A.n, '+', grp[0].B.n, grp[0].overall, '| funny spontaneous pet ->', pets.map(r => r.n).join(', '));
