// SPASM matching engine. Ported from the formulas in "Spasm June 2019.xlsm".
// Pure functions, no DOM, so it runs in the browser and in node tests.

export const WORD = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];

// Mate Search sheet thresholds
export const MARRY_MIN_SEX_SCORE = 0.61; // keep if score > 61%
export const AVOID_MAX_SEX_SCORE = 0.60; // keep if score <= 60%

// Results per list: 5 common ('a') + 2 unusual ('z'), per the June 2019 sheet notes
export const LIST_A = 5;
export const LIST_Z = 2;

export const TRAITS = ['Charisma', 'Spontaneity', 'Emotional savvy', 'Sexual adventurousness', 'Motivation',
  'Creativity', 'Humour', 'Spirituality', 'Leadership', 'Generosity'];

// Traits on a common 1-5 scale (charisma is scored out of 10 in the data)
export const ENNEA = [null,
  ['The Reformer', 'Principled, purposeful and self-controlled, with a strong sense of right and wrong.'],
  ['The Helper', 'Warm, generous and people-pleasing, happiest when needed.'],
  ['The Achiever', 'Driven, adaptable and image-conscious, built for success.'],
  ['The Individualist', 'Sensitive, expressive and self-aware, sometimes moody.'],
  ['The Investigator', 'Curious, private and inventive, more at home with ideas than small talk.'],
  ['The Loyalist', 'Committed, responsible and security-minded, quick to spot trouble.'],
  ['The Enthusiast', 'Spontaneous, versatile and fun-seeking, allergic to boredom.'],
  ['The Challenger', 'Self-confident, decisive and protective, does not back down.'],
  ['The Peacemaker', 'Easygoing, accepting and reassuring, avoids conflict at all costs.'],
];
export const SEXTYPE = [null,
  ['The Homebody', 'Prefers a cup of tea and an early night.'],
  ['The Steady', 'Affectionate, reliable, and in no particular hurry.'],
  ['The Curious', 'Open to suggestions, within reason.'],
  ['The Adventurer', 'Keen, inventive and rarely short of ideas.'],
  ['The Explorer', 'Has a Play Cupboard, and is not afraid to use it.'],
];

function hashStr(str) { let h = 2166136261; for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function seededRand(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function traitsOf(str) {
  if (!str) return null;
  return [...str].map((ch, i) => {
    const v = ch === 'A' ? 10 : +ch;
    const x = i === 0 ? v / 2 : v;
    return Math.max(0, Math.min(5, x));
  });
}

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
  const names = namesRows.map(([n, g, c, e, s, t]) => ({ n, g, c, e, s, t: traitsOf(t) }));
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
      coupleKey: WORD[A.e] + 'with' + WORD[B.e], sexKey: 'S' + WORD[A.s] + 'with' + WORD[B.s],
      fill: (t) => fillNames(t, A.e, B.e, A.n, B.n),
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

  // Names whose trait profile sits closest to the one asked for (target: ten values, 1-5)
  function chooseNames(g, target, commonOnly = false, shortlist = 40) {
    const pool = names.filter((r) => r.g === g && r.t && (!commonOnly || r.c === 'a'));
    const ranked = pool.map((r) => [r.t.reduce((d, v, i) => d + (v - target[i]) ** 2, 0), r]).sort((a, b) => a[0] - b[0]);
    const top = ranked.slice(0, shortlist).map((x) => x[1]);
    return commonOnly ? sample(top, LIST_A + LIST_Z, 0) : sample(top);
  }

  // Same shuffled order for both partners, whichever order the parents are entered in
  function bubPoolShared(P1, P2, babyG) {
    const t = babyType(P1, P2);
    const exclude = new Set([P1.n.toLowerCase(), P2.n.toLowerCase()]);
    const pool = names.filter((r) => r.g === babyG && r.e === t && !exclude.has(r.n.toLowerCase())).sort((a, b) => (a.n < b.n ? -1 : 1));
    const seed = hashStr([P1.g + P1.n, P2.g + P2.n].map((x) => x.toLowerCase()).sort().join('|') + babyG);
    const r = seededRand(seed);
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    return pool;
  }

  // Every pairing in a group, best first. Overall = average of couple and sexual scores.
  // Friendship, not romance: personality-type fit (the couple table, by Enneagram type) plus how
  // closely two people match on the social traits (charisma, spontaneity, emotional savvy, humour, generosity).
  const SOCIAL = [0, 1, 2, 6, 9];
  function friendship(A, B) {
    const type = tables.couple[WORD[A.e] + 'with' + WORD[B.e]].score;
    if (!A.t || !B.t) return type;
    const fit = 1 - SOCIAL.reduce((d, i) => d + Math.abs(A.t[i] - B.t[i]), 0) / (SOCIAL.length * 4);
    return 0.6 * type + 0.4 * fit;
  }
  function group(people) {
    const pairs = [];
    for (let i = 0; i < people.length; i++) for (let j = i + 1; j < people.length; j++) {
      const A = people[i], B = people[j];
      pairs.push({ A, B, i, j, overall: friendship(A, B) });
    }
    pairs.sort((a, b) => b.overall - a.overall);
    pairs.score = pairs.reduce((t, p) => t + p.overall, 0) / pairs.length;
    return pairs;
  }

  // Names for a pet, boat or car: traits picked get top marks, the rest sit in the middle
  function petNames(g, picked, shortlist = 60) {
    const target = Array.from({ length: 10 }, (_, i) => (picked.includes(i) ? 5 : 3));
    const pool = names.filter((r) => (g === 'X' || r.g === g) && r.t);
    const ranked = pool.map((r) => [r.t.reduce((d, v, i) => d + (v - target[i]) ** 2, 0), r]).sort((a, b) => a[0] - b[0]);
    return sample(ranked.slice(0, shortlist).map((x) => x[1]));
  }

  return { names, find, chooseNames, bubPoolShared, group, friendship, petNames, search, byLetter, compatibility, bubNames, bubPool, babyType, mates, sexScore, fillNames, similar, nameOfDay };
}
