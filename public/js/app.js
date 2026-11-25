import { createEngine } from './engine.js';
import { HELP } from './help.js';
import { ICON } from './icons.js';

const $ = (sel, root = document) => root.querySelector(sel);
const view = $('#view');
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const enc = encodeURIComponent;
const GLABEL = { M: 'Male', F: 'Female' };
const MODES = ['kiss', 'marry', 'avoid'];
const MODE_INFO = {
  kiss: { title: 'Kiss', icon: ICON.kiss, blurb: 'Hook up with' },
  marry: { title: 'Marry', icon: ICON.ring, blurb: 'Settle down with' },
  avoid: { title: 'Avoid', icon: ICON.avoid, blurb: 'Steer clear of' },
};

let E = null;
const descCache = new Map();

// ---------- data ----------
async function boot() {
  const started = Date.now();
  const [rows, tables] = await Promise.all([
    fetch('/data/names.json').then((r) => r.json()),
    fetch('/data/tables.json').then((r) => r.json()),
  ]);
  E = createEngine(rows, tables);
  const wait = Math.max(0, 1000 - (Date.now() - started)); // logo shows for 1 second
  setTimeout(() => { $('#splash').classList.add('gone'); setTimeout(() => $('#splash').remove(), 400); }, wait);
  window.addEventListener('hashchange', route);
  route();
}

async function describe(r) {
  const L = r.n[0].toUpperCase();
  const k = r.g + '-' + (L >= 'A' && L <= 'Z' ? L : '_');
  if (!descCache.has(k)) descCache.set(k, fetch(`/data/desc/${k}.json`).then((x) => x.json()));
  const shard = await descCache.get(k);
  return shard[r.n] || '';
}

// ---------- favourites ----------
const FAV_GROUPS = [
  ['names', 'Names'], ['couples', 'Couples'], ['bub', 'Best bub names'],
  ['kiss', 'Kiss'], ['marry', 'Marry'], ['avoid', 'Avoid'],
];
function favs() {
  try { return JSON.parse(localStorage.getItem('spasm.favs')) || {}; } catch { return {}; }
}
function saveFavs(f) { try { localStorage.setItem('spasm.favs', JSON.stringify(f)); } catch { toast('Could not save on this device'); } }
function addFav(group, label, href) {
  const f = favs();
  f[group] = f[group] || [];
  if (f[group].some((x) => x.label === label)) { toast('Already in favourites'); return; }
  f[group].unshift({ label, href });
  saveFavs(f);
  toast('Saved to favourites');
}

// ---------- chrome ----------
function setBar({ title = null, back = false, share = null, help = null }) {
  const left = $('#btnLeft');
  left.innerHTML = back ? ICON.back : ICON.menu;
  left.setAttribute('aria-label', back ? 'Back' : 'Menu');
  left.onclick = back ? () => (history.length > 1 ? history.back() : (location.hash = '#/')) : openMenu;
  $('#barTitle').innerHTML = title ? esc(title) : '<img src="/img/logo.png" alt="SPASM" class="bar-logo">';
  const sb = $('#btnShare');
  sb.hidden = !share;
  sb.innerHTML = ICON.share;
  sb.onclick = share;
  const hb = $('#btnHelp');
  hb.hidden = !help;
  hb.innerHTML = ICON.help;
  hb.onclick = () => openHelp(help);
}
function openMenu() {
  const m = $('#menu');
  m.hidden = false;
  m.onclick = (e) => { if (e.target === m || e.target.tagName === 'A') m.hidden = true; };
}
function openHelp(key) {
  const h = $('#help');
  $('.modal-body', h).innerHTML = HELP[key] || '';
  h.hidden = false;
  h.onclick = (e) => { if (e.target === h || e.target.closest('.modal-close') || e.target.tagName === 'A') h.hidden = true; };
}
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 2200);
}
function sharer(title, text) {
  return async () => {
    const url = location.href;
    if (navigator.share) {
      try { await navigator.share({ title: 'SPASM: ' + title, text, url }); } catch { /* cancelled */ }
      return;
    }
    try { await navigator.clipboard.writeText(`${text}\n${url}`); toast('Link copied, paste it anywhere'); }
    catch { prompt('Copy this link', url); }
  };
}
const logo = () => '<img src="/img/logo.png" alt="SPASM" class="page-logo">';
const pct = (x) => Math.round(x * 100) + '%';

// ---------- name picker ----------
function picker({ label, g = 'F', name = '', id }) {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  wrap.innerHTML = `<label for="${id}">${esc(label)}</label>
    <div class="input-row">
      <input id="${id}" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Type a name" value="${esc(name)}">
      <div class="toggle" role="group" aria-label="Gender">
        <button type="button" data-g="M">M</button><button type="button" data-g="F">F</button>
      </div>
    </div>
    <ul class="suggest" hidden></ul>
    <div class="err"></div>`;
  const input = $('input', wrap), list = $('.suggest', wrap), err = $('.err', wrap);
  let gender = g, active = -1, items = [];

  const setG = (v) => {
    gender = v;
    wrap.querySelectorAll('.toggle button').forEach((b) => b.classList.toggle('on', b.dataset.g === v));
    validate(); if (document.activeElement === input) suggest();
  };
  const validate = () => {
    const ok = !!E.find(input.value, gender);
    input.classList.toggle('ok', ok);
    if (ok) err.textContent = '';
    return ok;
  };
  const suggest = () => {
    items = E.search(input.value, gender, 15);
    active = -1;
    if (!items.length || (items.length === 1 && items[0].n.toLowerCase() === input.value.trim().toLowerCase())) { list.hidden = true; return; }
    list.innerHTML = items.map((r, i) => `<li data-i="${i}">${esc(r.n)}</li>`).join('');
    list.hidden = false;
  };
  const choose = (i) => { input.value = items[i].n; list.hidden = true; validate(); };

  wrap.querySelectorAll('.toggle button').forEach((b) => b.addEventListener('click', () => setG(b.dataset.g)));
  input.addEventListener('input', () => { validate(); suggest(); });
  input.addEventListener('focus', suggest);
  input.addEventListener('blur', () => setTimeout(() => (list.hidden = true), 150));
  input.addEventListener('keydown', (e) => {
    if (list.hidden) return;
    if (e.key === 'ArrowDown') { active = Math.min(items.length - 1, active + 1); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { active = Math.max(0, active - 1); e.preventDefault(); }
    else if (e.key === 'Enter' && active >= 0) { choose(active); e.preventDefault(); return; }
    else return;
    list.querySelectorAll('li').forEach((li, i) => li.classList.toggle('active', i === active));
  });
  list.addEventListener('mousedown', (e) => { const li = e.target.closest('li'); if (li) { e.preventDefault(); choose(+li.dataset.i); } });
  setG(gender);

  return {
    el: wrap,
    get() {
      const r = E.find(input.value, gender);
      if (!r) {
        err.innerHTML = input.value.trim()
          ? `We don't have ${esc(input.value.trim())} as a ${GLABEL[gender].toLowerCase()} name yet. Check the gender, or <a href="#/submit">submit it</a>.`
          : 'Pick a name from the pop-up list.';
      }
      return r;
    },
  };
}

function genderToggle(label, g) {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  wrap.innerHTML = `<label>${esc(label)}</label><div class="toggle wide"><button type="button" data-g="M">Male</button><button type="button" data-g="F">Female</button></div>`;
  let v = g;
  const set = (x) => { v = x; wrap.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.g === x)); };
  wrap.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => set(b.dataset.g)));
  set(g);
  return { el: wrap, get: () => v };
}

// Expandable list of names. opts.compatWith adds the pink hearts button; opts.fav = group
function nameList(rows, opts = {}) {
  const ul = document.createElement('ul');
  ul.className = 'list';
  ul.innerHTML = rows.map((r, i) => `<li data-i="${i}">
      <div class="row">
        <button class="name" aria-expanded="false"><span class="chev">${ICON.chev}</span><span>${esc(r.n)}</span></button>
        ${opts.fav ? `<button class="compat-link fav" aria-label="Save ${esc(r.n)} to favourites" title="Save to favourites">&#9734;</button>` : ''}
        ${opts.compatWith ? `<button class="compat-link hearts" aria-label="Romantic compatibility with ${esc(r.n)}">${ICON.hearts}</button>` : ''}
      </div>
      <div class="desc"></div>
    </li>`).join('');
  ul.addEventListener('click', async (e) => {
    const li = e.target.closest('li'); if (!li) return;
    const r = rows[+li.dataset.i];
    if (e.target.closest('.hearts')) {
      const me = opts.compatWith;
      location.hash = `#/compat/${me.g}/${enc(me.n)}/${r.g}/${enc(r.n)}`;
      return;
    }
    if (e.target.closest('.fav')) { addFav(opts.fav, opts.favLabel(r), `#/meaning/${r.g}/${enc(r.n)}`); return; }
    if (e.target.closest('.name')) {
      const open = li.classList.toggle('open');
      $('.name', li).setAttribute('aria-expanded', open);
      const d = $('.desc', li);
      if (open && !d.textContent) { d.textContent = '...'; d.textContent = (await describe(r)) || 'No description yet.'; }
    }
  });
  return ul;
}

// ---------- pages ----------
function home() {
  setBar({ help: 'home' });
  view.innerHTML = `<div class="grid">
    <a class="tile" href="#/meaning" style="color:var(--blue)">${ICON.head}<span style="color:#fff">What does that name mean?<br>(Based on the Name Theory&trade;)</span></a>
    <a class="tile" href="#/compat" style="color:var(--blue)">${ICON.hearts}<span style="color:#fff">Romantic compatibility</span></a>
    <a class="tile" href="#/bub" style="color:var(--blue)">${ICON.baby}<span style="color:#fff">Your best bub names?</span></a>
    <a class="tile" href="#/kma" style="color:var(--blue)">${ICON.balloons}<span style="color:#fff">Kiss, marry or avoid</span></a>
  </div>`;
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const pref = { g: 'F', letter: 'A' };

function meaningForm() {
  setBar({ back: true, help: 'meaning' });
  view.innerHTML = `${logo()}<h1>What does that name mean?</h1>`;
  const p = picker({ label: 'Name', g: pref.g, id: 'n1' });
  view.append(p.el);
  const go = document.createElement('button');
  go.className = 'btn'; go.textContent = 'Show me';
  go.onclick = () => { const r = p.get(); if (r) location.hash = `#/meaning/${r.g}/${enc(r.n)}`; };
  view.append(go);
  p.el.querySelector('input').addEventListener('keydown', (e) => { if (e.key === 'Enter' && p.el.querySelector('.suggest').hidden) go.click(); });

  // A to Z browser
  const box = document.createElement('section');
  box.innerHTML = `<h2>Or browse</h2>
    <div class="toggle wide" style="margin-bottom:12px"><button data-g="M">Male</button><button data-g="F">Female</button></div>
    <div class="az-nav"><button data-step="-1" aria-label="Previous letter">&lsaquo;</button><span class="az-count"></span><button data-step="1" aria-label="Next letter">&rsaquo;</button></div>
    <div class="az">${LETTERS.map((l) => `<button data-l="${l}">${l}</button>`).join('')}</div>
    <ul class="list az-list"></ul>`;
  view.append(box);
  const draw = () => {
    box.querySelectorAll('.toggle button').forEach((b) => b.classList.toggle('on', b.dataset.g === pref.g));
    box.querySelectorAll('.az button').forEach((b) => {
      const on = b.dataset.l === pref.letter;
      b.classList.toggle('on', on);
      if (on) b.scrollIntoView({ inline: 'center', block: 'nearest' });
    });
    const rows = E.byLetter(pref.letter, pref.g);
    $('.az-count', box).textContent = `${rows.length} ${GLABEL[pref.g].toLowerCase()} names starting with ${pref.letter}`;
    $('.az-list', box).innerHTML = rows.map((r) => `<li><a class="name" href="#/meaning/${r.g}/${enc(r.n)}">${esc(r.n)}</a></li>`).join('') || '<li class="empty">None</li>';
  };
  box.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.g) pref.g = b.dataset.g;
    if (b.dataset.l) pref.letter = b.dataset.l;
    if (b.dataset.step) pref.letter = LETTERS[(LETTERS.indexOf(pref.letter) + +b.dataset.step + 26) % 26];
    draw();
  });
  draw();
}

async function meaningResult(g, name) {
  const r = E.find(name, g);
  if (!r) return notFound(name, g);
  pref.g = g;
  const d = await describe(r);
  setBar({ title: r.n, back: true, help: 'meaning', share: sharer(r.n, `What does the name ${r.n} mean? ${d.slice(0, 140)}${d.length > 140 ? '...' : ''}`) });
  view.innerHTML = `${logo()}<h1>${esc(r.n)}</h1><span class="tag ${r.g}">${GLABEL[r.g]}</span><hr class="rule"><p class="body">${esc(d)}</p>
    <div class="fixed-bottom"><button class="btn" id="fav">Save name to favourites</button></div>`;
  $('#fav').onclick = () => addFav('names', `${r.n} (${r.g})`, location.hash);
}

function compatForm() {
  setBar({ back: true, help: 'compat' });
  view.innerHTML = `${logo()}<h1>Romantic compatibility</h1>`;
  const a = picker({ label: 'First person', g: 'F', id: 'n1' });
  const b = picker({ label: 'Second person', g: 'M', id: 'n2' });
  const go = document.createElement('button');
  go.className = 'btn'; go.textContent = 'Check compatibility';
  go.onclick = () => {
    const A = a.get(), B = b.get();
    if (A && B) location.hash = `#/compat/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}`;
  };
  view.append(a.el, b.el, go);
}

function compatResult(gA, nA, gB, nB, q) {
  const A = E.find(nA, gA), B = E.find(nB, gB);
  if (!A) return notFound(nA, gA);
  if (!B) return notFound(nB, gB);
  const ci = q.has('c') ? +q.get('c') : undefined, si = q.has('s') ? +q.get('s') : undefined;
  const c = E.compatibility(A, B, ci, si);
  if (ci === undefined || si === undefined) {
    history.replaceState(null, '', `#/compat/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}?c=${c.ci}&s=${c.si}`);
  }
  setBar({ back: true, help: 'compat', share: sharer(`${A.n} + ${B.n}`, `${A.n} and ${B.n}: ${pct(c.coupleScore)} couple compatibility, ${pct(c.sexScore)} sexual compatibility.`) });
  view.innerHTML = `${logo()}<p class="sub">Compatibility results</p>
    <div class="pair">
      <div class="who">${esc(A.n)}<br><span class="tag ${A.g}">${GLABEL[A.g]}</span></div>
      ${ICON.hearts}
      <div class="who right">${esc(B.n)}<br><span class="tag ${B.g}">${GLABEL[B.g]}</span></div>
    </div>
    <hr class="rule white">
    <div class="score">${pct(c.coupleScore)}</div><span class="tag blue">Couple Compatibility</span>
    <p class="body">${esc(c.coupleText)}</p>
    <hr class="rule white">
    <div class="score">${pct(c.sexScore)}</div><span class="tag blue">Sexual Compatibility</span>
    <p class="body">${esc(c.sexText)}</p>
    <button class="btn secondary" id="again">Read another description</button>
    <div class="fixed-bottom"><button class="btn" id="fav">Save couple to favourites</button></div>`;
  $('#fav').onclick = () => addFav('couples', `${A.n} + ${B.n}`, location.hash);
  $('#again').onclick = () => { location.hash = `#/compat/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}`; };
}

function bubForm() {
  setBar({ back: true, help: 'bub' });
  view.innerHTML = `${logo()}<h1>Your best bub names?</h1>`;
  const a = picker({ label: 'Parent one', g: 'F', id: 'n1' });
  const b = picker({ label: 'Parent two', g: 'M', id: 'n2' });
  const row = document.createElement('div');
  row.className = 'btn-row';
  row.innerHTML = '<button class="btn" data-g="M">Boys names</button><button class="btn" data-g="F" style="background:var(--purple)">Girls names</button>';
  row.onclick = (e) => {
    const btn = e.target.closest('button'); if (!btn) return;
    const A = a.get(), B = b.get();
    if (A && B) location.hash = `#/bub/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}/${btn.dataset.g}`;
  };
  view.append(a.el, b.el, row);
}

function fromList(q, g) {
  if (!q.get('n')) return null;
  const rows = q.get('n').split(',').map((n) => E.find(decodeURIComponent(n), g)).filter(Boolean);
  return rows.length ? rows : null;
}

function bubResult(gA, nA, gB, nB, babyG, q) {
  const A = E.find(nA, gA), B = E.find(nB, gB);
  if (!A) return notFound(nA, gA);
  if (!B) return notFound(nB, gB);
  const base = `#/bub/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}/${babyG}`;
  let rows = fromList(q, babyG);
  if (!rows) {
    rows = E.bubNames(A, B, babyG).names;
    history.replaceState(null, '', `${base}?n=${rows.map((r) => enc(r.n)).join(',')}`);
  }
  const kind = babyG === 'M' ? 'boys' : 'girls';
  setBar({ back: true, help: 'bub', share: sharer(`Bub names for ${A.n} and ${B.n}`, `SPASM's best ${kind} names for ${A.n} and ${B.n}: ${rows.map((r) => r.n).join(', ')}`) });
  view.innerHTML = `${logo()}<h1>Best ${kind} names</h1><p class="for-line">for ${esc(A.n)} and ${esc(B.n)}</p>`;
  view.append(nameList(rows, { fav: 'bub', favLabel: (r) => `${r.n} (for ${A.n} and ${B.n})` }));
  const hint = document.createElement('p');
  hint.className = 'hint'; hint.textContent = "Tap a name to see the child's personality as an adult.";
  const ref = document.createElement('div');
  ref.className = 'fixed-bottom';
  ref.innerHTML = `<button class="btn">Refresh list</button>`;
  ref.onclick = () => { location.hash = base; };
  view.append(hint, ref);
}

function kmaForm() {
  setBar({ back: true, help: 'kma' });
  view.innerHTML = `${logo()}<h1>Kiss, marry or avoid</h1>`;
  const a = picker({ label: 'Your name (or anyone\'s)', g: 'F', id: 'n1' });
  const seek = genderToggle('Interested in', 'M');
  const go = document.createElement('button');
  go.className = 'btn'; go.textContent = 'Show me';
  go.onclick = () => { const A = a.get(); if (A) location.hash = `#/kma/${A.g}/${enc(A.n)}/${seek.get()}/marry`; };
  view.append(a.el, seek.el, go);
}

function kmaResult(g, name, seekG, mode, q) {
  const me = E.find(name, g);
  if (!me) return notFound(name, g);
  if (!MODES.includes(mode)) mode = 'marry';
  const base = (m) => `#/kma/${me.g}/${enc(me.n)}/${seekG}/${m}`;
  let rows = fromList(q, seekG);
  if (!rows) {
    rows = E.mates(me, seekG, mode);
    history.replaceState(null, '', `${base(mode)}?n=${rows.map((r) => enc(r.n)).join(',')}`);
  }
  const info = MODE_INFO[mode];
  setBar({ back: true, help: 'kma', share: sharer(`${info.title}: ${me.n}`, `SPASM says ${me.n} should ${info.title.toLowerCase()}: ${rows.map((r) => r.n).join(', ')}`) });
  const i = MODES.indexOf(mode);
  view.innerHTML = `${logo()}
    <div class="kma-head">
      <button class="arrow" data-step="-1" aria-label="Previous">&lsaquo;</button>
      <div class="kma-title">${info.icon}<div class="t">${info.title}</div></div>
      <button class="arrow" data-step="1" aria-label="Next">&rsaquo;</button>
    </div>
    <div class="kma-dots">${MODES.map((m, k) => `<span class="${k === i ? 'on' : ''}"></span>`).join('')}</div>
    <p class="for-line">${info.blurb}, for ${esc(me.n)} (${GLABEL[me.g]})</p>`;
  const step = (d) => { location.hash = base(MODES[(i + d + 3) % 3]); };
  const head = $('.kma-head', view);
  head.addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (b) step(+b.dataset.step); });
  let x0 = null;
  head.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  head.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
  view.append(nameList(rows, { compatWith: me, fav: mode, favLabel: (r) => `${r.n} (for ${me.n})` }));
  const hint = document.createElement('p');
  hint.className = 'hint'; hint.textContent = 'Tap a name for their personality, or the pink hearts for your romantic compatibility.';
  const ref = document.createElement('div');
  ref.className = 'fixed-bottom';
  ref.innerHTML = '<button class="btn">Refresh list</button>';
  ref.onclick = () => { location.hash = base(mode); };
  view.append(hint, ref);
}

function favourites() {
  setBar({ back: true });
  const f = favs();
  const groups = FAV_GROUPS.filter(([k]) => f[k] && f[k].length);
  view.innerHTML = `${logo()}<h1>Favourites</h1>` + (groups.length ? '' : '<p class="empty">Nothing saved yet. Use the save buttons on any result.</p>');
  for (const [k, label] of groups) {
    const sec = document.createElement('section');
    sec.className = 'fav-group';
    sec.innerHTML = `<h2>${label}<small>${f[k].length}</small></h2>` + f[k].map((x, i) =>
      `<div class="fav-item"><a href="${esc(x.href)}">${esc(x.label)}</a><button data-k="${k}" data-i="${i}" aria-label="Remove">&times;</button></div>`).join('');
    view.append(sec);
  }
  view.onclick = (e) => {
    const b = e.target.closest('.fav-item button'); if (!b) return;
    const ff = favs(); ff[b.dataset.k].splice(+b.dataset.i, 1); saveFavs(ff); favourites();
  };
}

function submitPage() {
  setBar({ back: true });
  view.innerHTML = `${logo()}<h1>Submit a name to be added to SPASM</h1>
    <p class="hint" style="font-size:16px">Can't find a name? Tell us and we'll add it.</p>
    <form id="sub">
      <div class="field"><label for="sn">Name</label><div class="input-row"><input id="sn" name="name" required maxlength="40" autocomplete="off">
        <div class="toggle"><button type="button" data-g="M">M</button><button type="button" data-g="F" class="on">F</button></div></div></div>
      <div class="field"><label for="snote">Anything we should know? (optional)</label><textarea id="snote" name="note" maxlength="1000"></textarea></div>
      <div class="field"><label for="semail">Your email, if you'd like to hear back (optional)</label><div class="input-row"><input id="semail" name="email" type="email" maxlength="120"></div></div>
      <button class="btn" type="submit">Submit name</button>
      <div class="err" id="serr"></div>
    </form>`;
  let g = 'F';
  view.querySelectorAll('.toggle button').forEach((b) => b.onclick = () => {
    g = b.dataset.g; view.querySelectorAll('.toggle button').forEach((x) => x.classList.toggle('on', x === b));
  });
  $('#sub').onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = { name: fd.get('name').trim(), gender: g, note: fd.get('note').trim(), email: fd.get('email').trim() };
    if (E.find(body.name, g)) { $('#serr').innerHTML = `We already have ${esc(body.name)}. <a href="#/meaning/${g}/${enc(body.name)}">Have a look</a>.`; return; }
    try {
      const res = await fetch('/api/submit-name', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      view.innerHTML = `${logo()}<h1>Thanks!</h1><p class="body">We've got ${esc(body.name)}. Once it's written up it will appear in SPASM.</p><a class="btn" href="#/">Back to home</a>`;
    } catch {
      $('#serr').textContent = 'Sorry, that did not go through. Please try again later.';
    }
  };
}

function notFound(name, g) {
  setBar({ back: true });
  view.innerHTML = `${logo()}<h1>Hmm.</h1><p class="body">We don't have ${esc(name)} as a ${GLABEL[g] ? GLABEL[g].toLowerCase() : ''} name yet.</p><a class="btn" href="#/submit">Submit a name to be added to SPASM</a><a class="btn secondary" href="#/">Home</a>`;
}

// ---------- router ----------
function route() {
  $('#menu').hidden = true; $('#help').hidden = true;
  view.onclick = null;
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, qs = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  const q = new URLSearchParams(qs);
  window.scrollTo(0, 0);
  const [page, ...a] = parts;
  switch (page) {
    case undefined: return home();
    case 'meaning': return a.length >= 2 ? meaningResult(a[0], a[1]) : meaningForm();
    case 'compat': return a.length >= 4 ? compatResult(a[0], a[1], a[2], a[3], q) : compatForm();
    case 'bub': return a.length >= 5 ? bubResult(a[0], a[1], a[2], a[3], a[4], q) : bubForm();
    case 'kma': return a.length >= 4 ? kmaResult(a[0], a[1], a[2], a[3], q) : kmaForm();
    case 'favourites': return favourites();
    case 'submit': return submitPage();
    default: return home();
  }
}

boot().catch(() => { view.innerHTML = '<p class="loading">Could not load SPASM. Check your connection and refresh.</p>'; $('#splash')?.remove(); });

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
