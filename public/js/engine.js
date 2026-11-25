// SPASM matching engine. Ported from the formulas in "Spasm June 2019.xlsm".
// Pure functions, no DOM, so it runs in the browser and in node tests.

export const WORD = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];

// Mate Search sheet thresholds
export const MARRY_MIN_SEX_SCORE = 0.61; // keep if score > 61%
export const AVOID_MAX_SEX_SCORE = 0.60; // keep if score <= 60%

// Results per list: 5 common ('a') + 2 unusual ('z'), per the June 2019 sheet notes
export const LIST_A = 5;
export const LIST_Z = 2;

function lev(a, b) {
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}

function soundex(s) {
  const codes = { b: 1, f: 1, p: 1, v: 1, c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2, d: 3, t: 3, l: 4, m: 5, n: 5, r: 6 };
  const w = s.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return '';
  let out = w[0].toUpperCase(), last = codes[w[0]] || 0;
  for (const ch of w.slice(1)) {
    const c = codes[ch] || 0;
    if (c && c !== last) out += c;
    if (ch !== 'h' && ch !== 'w') last = c;
  }
  return (out + '000').slice(0, 4);
}

export function createEngine(namesRows, tables, rand = Math.random) {
  const names = namesRows.map(([n, g, c, e, s]) => ({ n, g, c, e, s }));
  const byKey = new Map(names.map((r) => [key(r.n, r.g), r]));

  function key(n, g) { return g + ':' + n.toLowerCase(); }
  function find(name, g) { return byKey.get(key(String(name).trim(), g)) || null; }

  function search(prefix, g, limit = 12) {
    const p = prefix.trim().toLowerCase();
    if (!p) return [];
    const out = [];
    for (const r of names) {
      if (r.g === g && r.n.toLowerCase().startsWith(p)) { out.push(r); if (out.length >= limit) break; }
    }
    return out;
  }

  function byLetter(letter, g) {
    const L = letter.toLowerCase();
    return names.filter((r) => r.g === g && r.n.toLowerCase().startsWith(L));
  }

  function pickIndex(n, idx) {
    return Number.isInteger(idx) && idx >= 0 && idx < n ? idx : Math.floor(rand() * n);
  }

  // Replace "(3)" style type markers in couple texts with the people's names.
  function fillNames(text, a, b, nameA, nameB) {
    if (a !== b) {
      return text.split('(' + a + ')').join(nameA).split('(' + b + ')').join(nameB);
    }
    let i = 0;
    return text.replace(new RegExp('\\(' + a + '\\)', 'g'), () => (i++ % 2 === 0 ? nameA : nameB));
  }

  function sexScore(sA, sB) {
    const row = tables.sexual['S' + WORD[sA] + 'with' + WORD[sB]];
    return row ? row.score : null;
  }

  // Couple Compatibility Search sheet. ci/si pin the random text (for shared links).
  function compatibility(A, B, ci, si) {
    const crow = tables.couple[WORD[A.e] + 'with' + WORD[B.e]];
    const srow = tables.sexual['S' + WORD[A.s] + 'with' + WORD[B.s]];
    const c = pickIndex(crow.texts.length, ci);
    const s = pickIndex(srow.texts.length, si);
    return {
      coupleScore: crow.score,
      coupleText: fillNames(crow.texts[c], A.e, B.e, A.n, B.n),
      sexScore: srow.score,
      sexText: srow.texts[s],
      ci: c, si: s,
    };
  }

  // Random sample of up to nA 'a' names and nZ 'z' names; tops up from the other
  // category if one runs short.
  function sample(pool, nA = LIST_A, nZ = LIST_Z) {
    const shuffle = (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      return a;
    };
    const A = shuffle(pool.filter((r) => r.c === 'a'));
    const Z = shuffle(pool.filter((r) => r.c !== 'a'));
    const out = A.slice(0, nA).concat(Z.slice(0, nZ));
    const want = nA + nZ;
    const rest = A.slice(nA).concat(Z.slice(nZ));
    while (out.length < want && rest.length) out.push(rest.shift());
    return shuffle(out);
  }

  // Baby Name Search sheet
  function babyType(P1, P2) { return tables.baby[P1.e - 1][P2.e - 1]; }

  function bubNames(P1, P2, babyG) {
    const t = babyType(P1, P2);
    const exclude = new Set([P1.n.toLowerCase(), P2.n.toLowerCase()]);
    const pool = names.filter((r) => r.g === babyG && r.e === t && !exclude.has(r.n.toLowerCase()));
    return { type: t, names: sample(pool) };
  }

  // Mate Search sheet (Kiss / Marry / Avoid)
  function mates(me, seekG, mode) {
    const p = tables.partner[String(me.e)];
    const notMe = (r) => !(r.g === me.g && r.n.toLowerCase() === me.n.toLowerCase());
    let pool;
    if (mode === 'kiss') {
      pool = names.filter((r) => r.g === seekG && r.s === me.s && notMe(r));
    } else if (mode === 'marry') {
      pool = names.filter((r) => r.g === seekG && r.e === p.best && notMe(r) && sexScore(me.s, r.s) > MARRY_MIN_SEX_SCORE);
    } else {
      pool = names.filter((r) => r.g === seekG && r.e === p.worst && notMe(r) && sexScore(me.s, r.s) <= AVOID_MAX_SEX_SCORE);
    }
    return sample(pool);
  }

  // Every qualifying baby name, shuffled (for swipe mode)
  function bubPool(P1, P2, babyG) {
    const t = babyType(P1, P2);
    const exclude = new Set([P1.n.toLowerCase(), P2.n.toLowerCase()]);
    return sample(names.filter((r) => r.g === babyG && r.e === t && !exclude.has(r.n.toLowerCase())), Infinity, Infinity);
  }

  // "Did you mean" suggestions for a name we don't have
  function similar(name, g, k = 3) {
    const q = String(name).trim().toLowerCase();
    if (q.length < 2) return [];
    const scored = [];
    for (const r of names) {
      if (r.g !== g) continue;
      const n = r.n.toLowerCase();
      if (Math.abs(n.length - q.length) > 3) continue;
      let d = lev(q, n);
      if (n[0] !== q[0]) d += 0.5;
      if (soundex(n) === soundex(q)) d -= 1;
      if (d <= Math.max(2, q.length / 3)) scored.push([d, r]);
    }
    return scored.sort((a, b) => a[0] - b[0] || a[1].n.length - b[1].n.length).slice(0, k).map((x) => x[1]);
  }

  // Name of the day: a common name chosen from the date, the same for everyone
  function nameOfDay(date = new Date()) {
    const key = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    const pool = names.filter((r) => r.c === 'a');
    let h = key >>> 0;
    h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16;
    return pool[(h >>> 0) % pool.length];
  }

  return { names, find, search, byLetter, compatibility, bubNames, bubPool, babyType, mates, sexScore, fillNames, similar, nameOfDay };
}
