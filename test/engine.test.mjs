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
