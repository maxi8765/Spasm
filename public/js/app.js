import { createEngine, TRAITS, ENNEA, SEXTYPE } from './engine.js';
import { HELP, HELP_I18N } from './help.js';
import { getLang, setLang, tr, startTranslating, LANGS } from './i18n.js';
import { ICON } from './icons.js';
import { shareCard } from './share.js';

const $ = (sel, root = document) => root.querySelector(sel);
const view = $('#view');
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const enc = encodeURIComponent;
const GLABEL = { M: 'Male', F: 'Female' };
const FEEDBACK = 'yoohoohocko@gmail.com';
const CC = 'maxwell.ian@gmail.com'; // copied on name requests
const DATA_VERSION = 2; // bump whenever public/data changes, so phones fetch the new files
const MODES = ['kiss', 'marry', 'avoid'];
const MODE_INFO = {
  kiss: { title: 'Kiss', icon: ICON.kiss, blurb: 'Hook up with' },
  marry: { title: 'Marry', icon: ICON.ring, blurb: 'Settle down with' },
  avoid: { title: 'Avoid', icon: ICON.avoid, blurb: 'Steer clear of' },
};

let E = null;
let NICK = {};
const descCache = new Map();
// Set this to your Stripe Payment Link (https://buy.stripe.com/...) to take payment for custom write-ups
const STRIPE_LINK = 'https://buy.stripe.com/7sYcN71N1gBBfTqg1jb7y00';
const PRICE = 'A$10'; // keep in step with the Stripe payment link

// ---------- data ----------
async function boot() {
  const started = Date.now();
  const [rows, tables, extra] = await Promise.all([
    fetch(`/data/names.json?v=${DATA_VERSION}`).then((r) => r.json()),
    fetch(`/data/tables.json?v=${DATA_VERSION}`).then((r) => r.json()),
    loadExtraNames(),
  ]);
  // Names David has added on the admin page replace or extend the built-in list
  if (extra.length) {
    const key = (r) => r[1] + ':' + r[0].toLowerCase();
    const added = new Map(extra.map((x) => [key(x.row), x]));
    for (const x of extra) extraDesc.set(key(x.row), x.d);
    const merged = rows.filter((r) => !added.has(key(r))).concat(extra.map((x) => x.row));
    merged.sort((a, b) => (a[0].toLowerCase() < b[0].toLowerCase() ? -1 : a[0].toLowerCase() > b[0].toLowerCase() ? 1 : 0));
    rows.length = 0; rows.push(...merged);
  }
  E = createEngine(rows, tables);
  fetch(`/data/nicknames.json?v=${DATA_VERSION}`).then((r) => r.json()).then((n) => { NICK = n; }).catch(() => {});
  const wait = Math.max(0, 1000 - (Date.now() - started)); // logo shows for 1 second
  setTimeout(() => { $('#splash').classList.add('gone'); setTimeout(() => $('#splash').remove(), 400); }, wait);
  window.addEventListener('hashchange', route);
  route();
  track('open', matchMedia('(display-mode: standalone)').matches || navigator.standalone ? 'app' : 'web');
  window.addEventListener('appinstalled', () => track('install'));
  startTranslating();
  // language picker in the menu
  const lp = document.getElementById('langs');
  if (lp) {
    const cur = getLang();
    lp.innerHTML = LANGS.map(([k, l]) => `<button class="chip${k === cur ? ' on' : ''}" data-l="${k}">${l}</button>`).join('');
    lp.onclick = (e) => { const b = e.target.closest('button'); if (!b) return; setLang(b.dataset.l); location.reload(); };
  }
}

// Anonymous usage counts for David's dashboard: a random id per browser, nothing personal
const VID = (() => {
  try {
    let v = localStorage.getItem('spasm.vid');
    if (!v) { v = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('spasm.vid', v); }
    return v;
  } catch { return ''; }
})();
function track(e, d = '') {
  try { navigator.sendBeacon('/api/track', new Blob([JSON.stringify({ e, d, v: VID })], { type: 'application/json' })); } catch { /* best effort */ }
}

const extraDesc = new Map();
async function loadExtraNames() {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 3000);
    const r = await fetch('/api/names/extra', { signal: ctl.signal });
    clearTimeout(t);
    if (!r.ok) return [];
    return (await r.json()).names || [];
  } catch { return []; }
}

async function describe(r) {
  const added = extraDesc.get(r.g + ':' + r.n.toLowerCase());
  if (added) return added;
  const L = r.n[0].toUpperCase();
  const k = r.g + '-' + (L >= 'A' && L <= 'Z' ? L : '_');
  if (!descCache.has(k)) descCache.set(k, fetch(`/data/desc/${k}.json?v=${DATA_VERSION}`).then((x) => x.json()));
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
function addFavQuiet(group, label, href) {
  const f = favs();
  f[group] = f[group] || [];
  if (!f[group].some((x) => x.label === label)) { f[group].unshift({ label, href }); saveFavs(f); }
}
function addFav(group, label, href) {
  const f = favs();
  f[group] = f[group] || [];
  if (f[group].some((x) => x.label === label)) { toast('Already in favourites'); return; }
  f[group].unshift({ label, href });
  saveFavs(f);
  track('favourite', group);
  toast('Saved to favourites');
}

// ---------- your own name ----------
function getMe() { try { return JSON.parse(localStorage.getItem('spasm.me')); } catch { return null; } }
function setMe(r) { try { r ? localStorage.setItem('spasm.me', JSON.stringify({ n: r.n, g: r.g })) : localStorage.removeItem('spasm.me'); } catch { /* private mode */ } }
function meRecord() { const m = getMe(); return m ? E.find(m.n, m.g) : null; }

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
  const L = HELP_I18N[getLang()];
  $('.modal-body', h).innerHTML = (L && L[key]) || HELP[key] || '';
  h.hidden = false;
  h.onclick = (e) => { if (e.target === h || e.target.closest('.modal-close') || e.target.tagName === 'A') h.hidden = true; };
}
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 2200);
}
function sharer(title, text, link) {
  return async () => {
    track('share', 'app');
    const url = link || location.href;
    if (navigator.share) {
      try { await navigator.share({ title: 'SPASM: ' + title, text, url }); } catch { /* cancelled */ }
      return;
    }
    try { await navigator.clipboard.writeText(`${text}\n${url}`); toast('Link copied, paste it anywhere'); }
    catch { prompt('Copy this link', url); }
  };
}
// Share a result as an image card plus a link to it
function cardSharer(spec, text) {
  return () => {
    track('share', (location.hash.split('/')[1] || 'home').split('?')[0]);
    toast('Making your image...');
    const s = { ...spec, kicker: spec.kicker && tr(spec.kicker), title: spec.title && tr(spec.title), scoreLabel: spec.scoreLabel && tr(spec.scoreLabel), tags: spec.tags && spec.tags.map(([t, c]) => [tr(t), c]) };
    return shareCard(s, text, toast);
  };
}
function logMiss(name, g) {
  try { navigator.sendBeacon('/api/miss', new Blob([JSON.stringify({ name, gender: g })], { type: 'application/json' })); } catch { /* best effort */ }
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
  err.addEventListener('click', (e) => {
    const a = e.target.closest('a.sim, a.swapg'); if (!a) return;
    e.preventDefault();
    if (a.dataset.n) input.value = a.dataset.n;
    if (a.dataset.g) setG(a.dataset.g); else validate();
    err.textContent = '';
  });
  setG(gender);

  return {
    el: wrap,
    get() {
      const r = E.find(input.value, gender);
      const typed = input.value.trim();
      if (!r) {
        if (!typed) { err.textContent = 'Pick a name from the pop-up list.'; return null; }
        const other = gender === 'M' ? 'F' : 'M';
        const sims = E.similar(typed, gender);
        let html = `We don't have ${esc(typed)} as a ${GLABEL[gender].toLowerCase()} name yet.`;
        if (E.find(typed, other)) html += ` We do have it as a <a href="#" data-g="${other}" class="swapg">${GLABEL[other].toLowerCase()} name</a>.`;
        if (sims.length) html += ` Did you mean ${sims.map((x) => `<a href="#" class="sim" data-n="${esc(x.n)}">${esc(x.n)}</a>`).join(', ')}?`;
        html += ` Or <a href="#/submit?n=${enc(typed)}&g=${gender}">submit it</a>.`;
        err.innerHTML = html;
        logMiss(typed, gender);
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
  setBar({ help: 'home', share: sharer('What does your name say about you?', 'SPASM describes your personality just from your name, rates the romantic compatibility of any two people, suggests baby names and tells you who to kiss, marry or avoid.', location.origin + '/') });
  const me = meRecord(), nd = E.nameOfDay();
  view.className = 'home';
  const tiles = [
    ['#/meaning', ICON.head, 'What does that name mean?'],
    ['#/compat', ICON.hearts, 'Romantic compatibility'],
    ['#/bub', ICON.baby, 'Your best bub names?'],
    ['#/kma', ICON.balloons, 'Kiss, marry or avoid'],
    ['#/choose', ICON.sliders, 'Choose a name by personality'],
    ['#/group', ICON.group, 'Group compatibility'],
    ['#/compare', ICON.bars, 'Compare two names'],
    ['#/pet', ICON.paw, 'Name your pet, boat or car'],
    ['#/famous', ICON.star, 'Famous couples'],
    ['#/custom', ICON.pen, `Get your name written up${STRIPE_LINK ? ` (${PRICE})` : ''}`, 'paid'],
  ];
  view.innerHTML = `
  <a class="daily" href="#/meaning/${nd.g}/${enc(nd.n)}"><span class="daily-k">Name of the day</span><span class="daily-n">${esc(nd.n)}</span><span class="tag ${nd.g}">${GLABEL[nd.g]}</span>${me ? `<span class="daily-me">Hi ${esc(me.n)}</span>` : ''}</a>
  <div class="grid home-grid">${tiles.map(([h, ic, t, cls]) => `<a class="tile${cls ? ' ' + cls : ''}" href="${h}">${ic}<span>${esc(t)}</span></a>`).join('')}</div>
  <p class="copy">&copy; 2026 David Hocking</p>`;
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

function typeBox(r) {
  const e = ENNEA[r.e], x = SEXTYPE[r.s];
  return `<section class="types"><h2>Type</h2>
    <div class="type"><span class="tag blue">Enneagram ${r.e}</span><div><b>${e[0]}</b><br><span class="hint">${e[1]}</span></div></div>
    <div class="type"><span class="tag" style="background:var(--pink)">Adventurer ${r.s}</span><div><b>${x[0]}</b><br><span class="hint">${x[1]}</span></div></div></section>`;
}
function nickBox(r) {
  const list = NICK[r.g + ':' + r.n];
  if (!list || !list.length) return '';
  return `<section class="nicks"><h2>Also goes by</h2><div class="chips">${list.map((n) => `<a class="chip" href="#/meaning/${r.g}/${enc(n)}">${esc(n)}</a>`).join('')}</div>
    <a class="hint" href="#/compare/${r.g}/${enc(r.n)}/${r.g}/${enc(list[0])}">Compare ${esc(r.n)} with ${esc(list[0])}</a></section>`;
}

function profile(t) {
  return `<section class="profile"><h2>Personality profile</h2>${TRAITS.map((name, i) => `
    <div class="trait"><span class="tl">${name}</span><span class="tb"><span style="width:${Math.round(t[i] / 5 * 100)}%"></span></span></div>`).join('')}</section>`;
}

async function meaningResult(g, name) {
  const r = E.find(name, g);
  if (!r) return notFound(name, g);
  pref.g = g;
  const d = await describe(r);
  setBar({ title: r.n, back: true, help: 'meaning', share: cardSharer({ kicker: 'What does that name mean?', title: r.n, tags: [[GLABEL[r.g], r.g]], body: d }, `What does the name ${r.n} mean? SPASM knows.`) });
  const me = getMe();
  const isMe = me && me.n === r.n && me.g === r.g;
  view.innerHTML = `${logo()}<h1>${esc(r.n)}</h1><span class="tag ${r.g}">${GLABEL[r.g]}</span><hr class="rule"><p class="body">${esc(d)}</p>
    ${typeBox(r)}
    ${nickBox(r)}
    ${r.t ? profile(r.t) : ''}
    ${isMe ? '' : `<button class="btn secondary" id="isme">This is my name</button>`}
    <div class="fixed-bottom"><button class="btn" id="fav">Save name to favourites</button></div>`;
  $('#fav').onclick = () => addFav('names', `${r.n} (${r.g})`, location.hash);
  if (!isMe) $('#isme').onclick = () => { setMe(r); toast(`Hi ${r.n}, SPASM will remember you`); $('#isme').remove(); };
}

function compatForm() {
  setBar({ back: true, help: 'compat' });
  view.innerHTML = `${logo()}<h1>Romantic compatibility</h1>`;
  const me = meRecord();
  const a = picker({ label: me ? 'First person (you)' : 'First person', g: me ? me.g : 'F', name: me ? me.n : '', id: 'n1' });
  const b = picker({ label: 'Second person', g: me && me.g === 'M' ? 'F' : 'M', id: 'n2' });
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
  setBar({ back: true, help: 'compat', share: cardSharer({ kicker: 'Romantic compatibility', title: `${A.n} + ${B.n}`, tags: [[A.n, A.g], [B.n, B.g], [`${pct(c.sexScore)} sexual`, 'pink']], score: pct(c.coupleScore), scoreLabel: 'Couple', body: c.coupleText }, `${A.n} and ${B.n}: ${pct(c.coupleScore)} couple compatibility, ${pct(c.sexScore)} sexual compatibility.`) });
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
  const me = meRecord();
  const a = picker({ label: 'Parent one', g: me ? me.g : 'F', name: me ? me.n : '', id: 'n1' });
  const b = picker({ label: 'Parent two', g: me && me.g === 'M' ? 'F' : 'M', id: 'n2' });
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
  setBar({ back: true, help: 'bub', share: cardSharer({ kicker: `Best ${kind} names for ${A.n} and ${B.n}`, title: 'Your best bub names', list: rows.map((r) => r.n) }, `SPASM's best ${kind} names for ${A.n} and ${B.n}: ${rows.map((r) => r.n).join(', ')}`) });
  view.innerHTML = `${logo()}<h1>Best ${kind} names</h1><p class="for-line">for ${esc(A.n)} and ${esc(B.n)}</p>
    <a class="btn secondary" href="#/swipe/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}/${babyG}">Swipe through every name</a>`;
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
  const me = meRecord();
  const a = picker({ label: 'Your name (or anyone\'s)', g: me ? me.g : 'F', name: me ? me.n : '', id: 'n1' });
  const seek = genderToggle('Interested in', me && me.g === 'M' ? 'F' : 'M');
  const go = document.createElement('button');
  go.className = 'btn'; go.textContent = 'Show me';
  go.onclick = () => {
    const A = a.get(); if (!A) return;
    if (!getMe()) setMe(A); // first time through, assume it's their own name
    location.hash = `#/kma/${A.g}/${enc(A.n)}/${seek.get()}/marry`;
  };
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
  setBar({ back: true, help: 'kma', share: cardSharer({ kicker: `Kiss, marry or avoid, for ${me.n}`, title: info.title, list: rows.map((r) => r.n) }, `SPASM says ${me.n} should ${info.title.toLowerCase()}: ${rows.map((r) => r.n).join(', ')}`) });
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

function submitPage(q) {
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
  let g = q.get('g') === 'M' ? 'M' : 'F';
  const setGT = (v) => { g = v; view.querySelectorAll('.toggle button').forEach((x) => x.classList.toggle('on', x.dataset.g === v)); };
  view.querySelectorAll('.toggle button').forEach((b) => b.onclick = () => setGT(b.dataset.g));
  setGT(g);
  if (q.get('n')) $('#sn').value = q.get('n');
  $('#sub').onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = { name: fd.get('name').trim(), gender: g, note: fd.get('note').trim(), email: fd.get('email').trim() };
    if (E.find(body.name, g)) { $('#serr').innerHTML = `We already have ${esc(body.name)}. <a href="#/meaning/${g}/${enc(body.name)}">Have a look</a>.`; return; }
    track('submit_name');
    let stored = false;
    try {
      const res = await fetch('/api/submit-name', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      stored = res.ok;
    } catch { /* offline or not set up */ }
    if (stored) {
      view.innerHTML = `${logo()}<h1>Thanks!</h1><p class="body">We've got ${esc(body.name)}. Once it's written up it will appear in SPASM.</p><a class="btn" href="#/">Back to home</a>`;
      return;
    }
    // Not stored online: send it to David by email instead
    const subject = `SPASM name submission: ${body.name} (${GLABEL[g]})`;
    const text = `Please add this name to SPASM.\n\nName: ${body.name}\nGender: ${GLABEL[g]}\n${body.note ? `\nNotes: ${body.note}\n` : ''}`;
    view.innerHTML = `${logo()}<h1>Almost there</h1><p class="body">Your email app should open with the name filled in. Just hit send.</p>
      <a class="btn" href="mailto:${FEEDBACK}?cc=${CC}&subject=${enc(subject)}&body=${enc(text)}">Open email again</a><a class="btn secondary" href="#/">Back to home</a>`;
    location.href = `mailto:${FEEDBACK}?cc=${CC}&subject=${enc(subject)}&body=${enc(text)}`;
  };
}

const CHOOSE_HINTS = ['Draws people in', 'Acts on a whim', 'Reads the room', 'Up for anything', 'Gets things done',
  'Makes things', 'Makes people laugh', 'Seeks meaning', 'Takes charge', 'Gives freely'];

function chooseForm(q) {
  setBar({ back: true, help: 'choose' });
  view.classList.add('scroll');
  const start = /^[1-5]{10}$/.test(q.get('t') || '') ? [...q.get('t')].map(Number) : Array(10).fill(3);
  view.innerHTML = `${logo()}<h1>Choose a name by personality</h1>
    <p class="hint" style="font-size:15px">Set how much of each trait you'd like, and SPASM finds the names that match. Handy for choosing an English name, or a baby name from scratch.</p>`;
  const g = genderToggle('Name for a', q.get('g') === 'M' ? 'M' : 'F');
  view.append(g.el);
  const box = document.createElement('div');
  box.className = 'sliders';
  box.innerHTML = TRAITS.map((name, i) => `
    <label class="slider"><span class="sl-top"><span>${name}</span><span class="sl-hint">${CHOOSE_HINTS[i]}</span></span>
      <input type="range" min="1" max="5" step="1" value="${start[i]}" data-i="${i}" aria-label="${name}">
      <span class="sl-ends"><span>Low</span><span>High</span></span></label>`).join('') +
    `<label class="check"><input type="checkbox" id="common" ${q.get('common') === '1' ? 'checked' : ''}> Common names only</label>`;
  view.append(box);
  const go = document.createElement('button');
  go.className = 'btn'; go.textContent = 'Find names';
  go.onclick = () => {
    const t = [...box.querySelectorAll('input[type=range]')].map((x) => x.value).join('');
    location.hash = `#/choose/${g.get()}/${t}${$('#common').checked ? '?common=1' : ''}`;
  };
  view.append(go);
}

function chooseResult(g, tstr, q) {
  if (!GLABEL[g] || !/^[1-5]{10}$/.test(tstr)) return chooseForm(q);
  const target = [...tstr].map(Number);
  const common = q.get('common') === '1';
  const base = `#/choose/${g}/${tstr}${common ? '?common=1' : ''}`;
  let rows = fromList(q, g);
  if (!rows) {
    rows = E.chooseNames(g, target, common);
    history.replaceState(null, '', `${base}${common ? '&' : '?'}n=${rows.map((r) => enc(r.n)).join(',')}`);
  }
  const kind = g === 'M' ? 'male' : 'female';
  const wanted = TRAITS.filter((_, i) => target[i] >= 4).map((x) => x.toLowerCase());
  setBar({ back: true, help: 'choose', share: cardSharer({ kicker: 'Names chosen by personality', title: wanted.length ? `For ${wanted.slice(0, 2).join(' and ')}` : 'Your best names', list: rows.map((r) => r.n) }, `SPASM picked these ${kind} names for me: ${rows.map((r) => r.n).join(', ')}`) });
  view.innerHTML = `${logo()}<h1>Your best ${kind} names</h1>
    <p class="for-line">${wanted.length ? `Strong on ${esc(wanted.join(', '))}` : 'Matched to your profile'}</p>`;
  view.append(nameList(rows, { fav: 'names', favLabel: (r) => `${r.n} (${r.g})` }));
  const hint = document.createElement('p');
  hint.className = 'hint'; hint.textContent = 'Tap a name to read about them.';
  const row = document.createElement('div');
  row.className = 'fixed-bottom';
  row.innerHTML = `<div class="btn-row" style="max-width:520px;margin:0 auto"><a class="btn secondary" href="#/choose?g=${g}&t=${tstr}${common ? '&common=1' : ''}">Adjust</a><button class="btn">Refresh list</button></div>`;
  $('button', row).onclick = () => { location.hash = base; };
  view.append(hint, row);
}

function morePage() {
  setBar({ back: true });
  view.classList.add('scroll');
  const items = [
    ['#/group', 'Group compatibility', 'Who suits whom in your friend group, office or wedding party'],
    ['#/compare', 'Compare two names', 'Personality profiles side by side'],
    ['#/choose', 'Choose a name by personality', 'Find names to match the traits you want'],
    ['#/pet', 'Name your pet, boat or car', 'Pick its personality, get a name'],
    ['#/famous', 'Famous couples', 'How the great romances of history and fiction rate'],
    ['#/custom', 'Get your name written up', `Not in SPASM? David will write yours${STRIPE_LINK ? ` for ${PRICE}` : ''}`],
    ['#/notify', 'Name of the day, every morning', 'A notification with each day\'s name'],
  ];
  view.innerHTML = `${logo()}<h1>More fun</h1>` + items.map(([h, t, d]) => `<a class="more-item" href="${h}"><b>${t}</b><span>${d}</span></a>`).join('');
}

function groupForm() {
  setBar({ back: true, help: 'group' });
  view.classList.add('scroll');
  view.innerHTML = `${logo()}<h1>Group compatibility</h1><p class="hint" style="font-size:15px">Add up to 12 people and SPASM ranks every pairing.</p><div id="people"></div>`;
  const people = $('#people');
  const pickers = [];
  const add = (name = '', g = 'F') => {
    const p = picker({ label: `Person ${pickers.length + 1}`, g, name, id: 'gp' + pickers.length });
    pickers.push(p); people.append(p.el);
  };
  const me = meRecord();
  add(me ? me.n : '', me ? me.g : 'F'); add('', 'M'); add('', 'F');
  const more = document.createElement('button');
  more.className = 'btn secondary'; more.textContent = '+ Add someone';
  more.onclick = () => { if (pickers.length < 12) add(); if (pickers.length >= 12) more.remove(); };
  const go = document.createElement('button');
  go.className = 'btn'; go.textContent = 'Rank the pairings';
  go.onclick = () => {
    const filled = pickers.filter((p) => p.el.querySelector('input').value.trim());
    const recs = filled.map((p) => p.get());
    if (recs.some((r) => !r)) return;
    if (recs.length < 2) { toast('Add at least two people'); return; }
    location.hash = '#/group/' + recs.map((r) => `${r.g}:${enc(r.n)}`).join(',');
  };
  view.append(more, go);
}

function groupResult(list) {
  const people = list.split(',').map((x) => { const [g, ...n] = x.split(':'); return E.find(decodeURIComponent(n.join(':')), g); }).filter(Boolean);
  if (people.length < 2) return groupForm();
  view.classList.add('scroll');
  const pairs = E.group(people);
  const best = pairs[0], worst = pairs[pairs.length - 1];
  const shareText = `SPASM says the best match in our group is ${best.A.n} and ${best.B.n} (${pct(best.overall)}). The worst: ${worst.A.n} and ${worst.B.n} (${pct(worst.overall)}).`;
  setBar({ back: true, help: 'group', share: cardSharer({ kicker: 'Group compatibility', title: `${best.A.n} + ${best.B.n}`, score: pct(best.overall), scoreLabel: 'Best match', list: pairs.slice(0, 6).map((p) => `${p.A.n} + ${p.B.n}`) }, shareText) });
  const cell = (v) => `<td style="background:hsla(${Math.round(v * 120)},70%,45%,.55)">${Math.round(v * 100)}</td>`;
  const grid = `<div class="grid-wrap"><table class="gtable"><tr><th></th>${people.map((p) => `<th>${esc(p.n)}</th>`).join('')}</tr>${people.map((p, i) => `<tr><th>${esc(p.n)}</th>${people.map((q, j) => {
    if (i === j) return '<td class="self"></td>';
    const pr = pairs.find((x) => (x.i === i && x.j === j) || (x.i === j && x.j === i));
    return cell(pr.overall);
  }).join('')}</tr>`).join('')}</table></div>`;
  view.innerHTML = `${logo()}<h1>Group compatibility</h1><p class="for-line">Overall = average of couple and sexual compatibility</p>
    <ol class="ranked">${pairs.map((p) => `<li><a href="#/compat/${p.A.g}/${enc(p.A.n)}/${p.B.g}/${enc(p.B.n)}"><span>${esc(p.A.n)} + ${esc(p.B.n)}</span><b>${pct(p.overall)}</b></a></li>`).join('')}</ol>
    <h2>Grid</h2>${grid}<a class="btn secondary" href="#/group">Start again</a>`;
}

function compareForm() {
  setBar({ back: true });
  view.innerHTML = `${logo()}<h1>Compare two names</h1>`;
  const me = meRecord();
  const a = picker({ label: 'First name', g: me ? me.g : 'F', name: me ? me.n : '', id: 'n1' });
  const b = picker({ label: 'Second name', g: 'F', id: 'n2' });
  const go = document.createElement('button');
  go.className = 'btn'; go.textContent = 'Compare';
  go.onclick = () => { const A = a.get(), B = b.get(); if (A && B) location.hash = `#/compare/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}`; };
  view.append(a.el, b.el, go);
}

function compareResult(gA, nA, gB, nB) {
  const A = E.find(nA, gA), B = E.find(nB, gB);
  if (!A) return notFound(nA, gA);
  if (!B) return notFound(nB, gB);
  setBar({ back: true });
  view.classList.add('scroll');
  const w = (r, i) => (r.t ? Math.round(r.t[i] / 5 * 100) : 0);
  const rows = TRAITS.map((t, i) => `<div class="cmp-row"><span class="tl">${t}</span>
      <span class="tb a"><span style="width:${w(A, i)}%"></span></span>
      <span class="tb b"><span style="width:${w(B, i)}%"></span></span></div>`).join('');
  view.innerHTML = `${logo()}<h1>${esc(A.n)} vs ${esc(B.n)}</h1>
    <div class="cmp-legend"><span class="ka"></span>${esc(A.n)} <span class="kb"></span>${esc(B.n)}</div>
    <div class="cmp-types"><div><b>${esc(A.n)}</b><br>${ENNEA[A.e][0]}<br><span class="hint">${SEXTYPE[A.s][0]}</span></div><div><b>${esc(B.n)}</b><br>${ENNEA[B.e][0]}<br><span class="hint">${SEXTYPE[B.s][0]}</span></div></div>
    ${rows}
    <div class="btn-row"><a class="btn secondary" href="#/meaning/${A.g}/${enc(A.n)}">${esc(A.n)}</a><a class="btn secondary" href="#/meaning/${B.g}/${enc(B.n)}">${esc(B.n)}</a></div>
    <a class="btn" href="#/compat/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}">Their romantic compatibility</a>`;
}

const PETS = [['dog', 'Dog'], ['cat', 'Cat'], ['horse', 'Horse'], ['bird', 'Bird'], ['boat', 'Boat'], ['car', 'Car'], ['other', 'Something else']];
const PET_WORDS = ['Charming', 'Unpredictable', 'Sensitive', 'Adventurous', 'Hard-working', 'Clever', 'Funny', 'Soulful', 'Bossy', 'Generous'];

function petForm() {
  setBar({ back: true, help: 'pet' });
  view.classList.add('scroll');
  view.innerHTML = `${logo()}<h1>Name your pet, boat or car</h1>
    <div class="field"><label>What are you naming?</label><div class="chips pick" id="ptype">${PETS.map(([k, l], i) => `<button class="chip${i === 0 ? ' on' : ''}" data-k="${k}">${l}</button>`).join('')}</div></div>
    <div class="field"><label>Boy, girl or either?</label><div class="toggle wide" id="pg"><button data-g="M">Boy</button><button data-g="F">Girl</button><button data-g="X" class="on">Either</button></div></div>
    <div class="field"><label>Pick up to three words for its personality</label><div class="chips pick" id="pwords">${PET_WORDS.map((w, i) => `<button class="chip" data-i="${i}">${w}</button>`).join('')}</div></div>
    <button class="btn" id="go">Find names</button>`;
  const one = (box) => (e) => { const b = e.target.closest('button'); if (!b) return; box.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); };
  $('#ptype').onclick = one($('#ptype'));
  $('#pg').onclick = one($('#pg'));
  $('#pwords').onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (!b.classList.contains('on') && $('#pwords').querySelectorAll('.on').length >= 3) { toast('Three is plenty'); return; }
    b.classList.toggle('on');
  };
  $('#go').onclick = () => {
    const words = [...$('#pwords').querySelectorAll('.on')].map((b) => b.dataset.i);
    if (!words.length) { toast('Pick at least one word'); return; }
    location.hash = `#/pet/${$('#ptype .on').dataset.k}/${$('#pg .on').dataset.g}/${words.join('-')}`;
  };
}

function petResult(kind, g, words, q) {
  const picked = words.split('-').map(Number).filter((n) => n >= 0 && n < 10);
  const label = (PETS.find(([k]) => k === kind) || PETS[6])[1].toLowerCase();
  const base = `#/pet/${kind}/${g}/${words}`;
  let rows = null;
  if (q.get('n')) {
    rows = q.get('n').split(',').map((x) => { const [gg, ...n] = decodeURIComponent(x).split(':'); return E.find(n.join(':'), gg); }).filter(Boolean);
    if (!rows.length) rows = null;
  }
  if (!rows) {
    rows = E.petNames(g === 'M' || g === 'F' ? g : 'X', picked);
    history.replaceState(null, '', `${base}?n=${rows.map((r) => enc(r.g + ':' + r.n)).join(',')}`);
  }
  const traits = picked.map((i) => PET_WORDS[i].toLowerCase()).join(', ');
  setBar({ back: true, help: 'pet', share: cardSharer({ kicker: `Names for a ${traits} ${label}`, title: 'SPASM pet names', list: rows.map((r) => r.n) }, `SPASM's names for my ${traits} ${label}: ${rows.map((r) => r.n).join(', ')}`) });
  view.classList.add('scroll');
  view.innerHTML = `${logo()}<h1>Names for your ${esc(label)}</h1><p class="for-line">${esc(traits)}</p>`;
  view.append(nameList(rows, { fav: 'names', favLabel: (r) => `${r.n} (for the ${label})` }));
  const row = document.createElement('div');
  row.className = 'btn-row';
  row.innerHTML = `<a class="btn secondary" href="#/pet">Start again</a><button class="btn">Refresh list</button>`;
  $('button', row).onclick = () => { location.hash = base; };
  view.append(row);
}

const FAMOUS = [
  ['Romeo', 'M', 'Juliet', 'F', 'Shakespeare'], ['Romeo', 'M', 'Rosaline', 'F', 'Before Juliet'],
  ['Antony', 'M', 'Cleopatra', 'F', 'Ancient Egypt'], ['Albert', 'M', 'Victoria', 'F', 'Royalty'],
  ['Adam', 'M', 'Eve', 'F', 'The original couple'], ['Clyde', 'M', 'Bonnie', 'F', 'Outlaws'],
  ['Edward', 'M', 'Jane', 'F', 'Jane Eyre'], ['Rhett', 'M', 'Scarlett', 'F', 'Gone with the Wind'],
  ['Arthur', 'M', 'Guinevere', 'F', 'Camelot'], ['Paris', 'M', 'Helen', 'F', 'Troy'],
  ['Samson', 'M', 'Delilah', 'F', 'The Bible'], ['Odysseus', 'M', 'Penelope', 'F', 'The Odyssey'],
  ['Henry', 'M', 'Anne', 'F', 'The Tudors'], ['Jack', 'M', 'Jill', 'F', 'Up the hill'], ['Fred', 'M', 'Wilma', 'F', 'Bedrock'],
];

function famousPage() {
  setBar({ back: true });
  view.classList.add('scroll');
  const items = FAMOUS.map(([a, ga, b, gb, note]) => {
    const A = E.find(a, ga), B = E.find(b, gb);
    if (!A || !B) return '';
    const c = E.compatibility(A, B, 0, 0);
    return `<li><a href="#/compat/${ga}/${enc(a)}/${gb}/${enc(b)}"><span>${esc(a)} + ${esc(b)}<small>${esc(note)}</small></span><b>${pct(c.coupleScore)}</b></a></li>`;
  }).join('');
  view.innerHTML = `${logo()}<h1>Famous couples</h1><p class="for-line">Couple compatibility, by first name alone</p><ol class="ranked">${items}</ol>`;
}

function customPage(q) {
  setBar({ back: true });
  view.classList.add('scroll');
  view.innerHTML = `${logo()}<h1>Get your name written up</h1>
    <p class="hint" style="font-size:15px">Name not in SPASM, or want more than a paragraph? David Hocking, author of the Name Theory, will write a personal description for the name of your choice.</p>
    ${STRIPE_LINK ? `<div class="price"><span>Price</span><b>${PRICE}</b><small>About US$7. One-off payment, any tax included. Paid securely through Stripe, which shows the exact amount in your own currency at checkout.</small></div>` : ''}
    <form id="cust">
      <div class="field"><label for="cn">Name</label><div class="input-row"><input id="cn" required maxlength="40" value="${esc(q.get('n') || '')}">
        <div class="toggle"><button type="button" data-g="M">M</button><button type="button" data-g="F">F</button></div></div></div>
      <div class="field"><label for="cnote">Anything David should know? (optional)</label><textarea id="cnote" maxlength="1000"></textarea></div>
      <div class="field"><label for="cemail">Your email, so David can send it to you</label><div class="input-row"><input id="cemail" type="email" required maxlength="120"></div></div>
      <button class="btn" type="submit">${STRIPE_LINK ? `Pay ${PRICE} and send request` : 'Send request'}</button>
      <p class="hint">${STRIPE_LINK ? 'You pay securely with Stripe, then your email app opens so you can send David the details.' : 'Your email app will open with the request filled in. David will reply with the price and how to pay.'}</p>
    </form>`;
  let g = q.get('g') === 'M' ? 'M' : 'F';
  const setGT = (v) => { g = v; view.querySelectorAll('.toggle button').forEach((x) => x.classList.toggle('on', x.dataset.g === v)); };
  view.querySelectorAll('.toggle button').forEach((b) => b.onclick = () => setGT(b.dataset.g));
  setGT(g);
  $('#cust').onsubmit = (e) => {
    e.preventDefault();
    const name = $('#cn').value.trim(), email = $('#cemail').value.trim(), note = $('#cnote').value.trim();
    track('writeup');
    const subject = `SPASM custom write-up: ${name} (${GLABEL[g]})`;
    const body = `Please write up this name for me.\n\nName: ${name}\nGender: ${GLABEL[g]}\nReply to: ${email}\n${note ? `\nNotes: ${note}\n` : ''}${STRIPE_LINK ? '\nI have paid through Stripe.\n' : ''}`;
    const mail = `mailto:${FEEDBACK}?cc=${CC}&subject=${enc(subject)}&body=${enc(body)}`;
    const pay = STRIPE_LINK ? `${STRIPE_LINK}?prefilled_email=${enc(email)}` : '';
    view.innerHTML = `${logo()}<h1>Nearly done</h1><p class="body">${STRIPE_LINK ? 'Finish paying in the Stripe tab, then send the email that opens here.' : 'Send the email that opens, and David will be in touch.'}</p>
      <a class="btn" href="${mail}">Open the email again</a>${pay ? `<a class="btn secondary" href="${pay}" target="_blank" rel="noopener">Open payment again</a>` : ''}<a class="btn secondary" href="#/">Back to home</a>`;
    if (pay) window.open(pay, '_blank', 'noopener');
    location.href = mail;
  };
}

async function notifyPage() {
  setBar({ back: true });
  view.classList.add('scroll');
  view.innerHTML = `${logo()}<h1>Name of the day, every morning</h1>
    <p class="hint" style="font-size:15px">Get a notification each morning with SPASM's name of the day. Tap it to read the full description.</p>
    <div id="nstate" class="loading"></div><div id="nbtns"></div>`;
  const state = $('#nstate'), btns = $('#nbtns');
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    state.className = 'body';
    state.textContent = ios && !standalone
      ? 'On iPhone and iPad, notifications only work once SPASM is on your home screen. Tap the Share button in Safari, choose Add to Home Screen, then open SPASM from there and come back to this page.'
      : "Sorry, this browser doesn't support notifications.";
    return;
  }
  const reg = await navigator.serviceWorker.ready;
  const draw = async () => {
    const sub = await reg.pushManager.getSubscription();
    const denied = Notification.permission === 'denied';
    state.className = 'body';
    state.textContent = denied ? 'Notifications are blocked for SPASM. Turn them back on in your browser or phone settings, then try again.'
      : sub ? "You're signed up. The name of the day arrives each morning." : 'Notifications are off.';
    btns.innerHTML = denied ? '' : sub
      ? '<button class="btn" id="ntest">Send me one now</button><button class="btn secondary" id="noff">Turn off</button>'
      : '<button class="btn" id="non">Turn on</button>';
    if ($('#non')) $('#non').onclick = turnOn;
    if ($('#noff')) $('#noff').onclick = turnOff;
    if ($('#ntest')) $('#ntest').onclick = () => { (reg.active || navigator.serviceWorker.controller)?.postMessage('test-daily'); toast('On its way'); };
  };
  const b64 = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
  async function turnOn() {
    try {
      if ((await Notification.requestPermission()) !== 'granted') return draw();
      const r = await fetch('/api/push/key');
      if (!r.ok) throw new Error('key');
      const { key } = await r.json();
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(key) });
      const ok = await fetch('/api/push/subscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(sub) });
      if (!ok.ok) throw new Error('save');
      toast("You're signed up");
      track('notify_on');
    } catch { toast("Sorry, that didn't work. Try again later."); }
    draw();
  }
  async function turnOff() {
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      fetch('/api/push/unsubscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
      await sub.unsubscribe();
    }
    toast('Notifications off');
    draw();
  }
  draw();
}

function mePage() {
  setBar({ back: true });
  const me = meRecord();
  view.innerHTML = `${logo()}<h1>Your name</h1><p class="hint" style="font-size:16px">SPASM fills this in for you on every page. It stays on this device.</p>`;
  const p = picker({ label: 'Your name', g: me ? me.g : 'F', name: me ? me.n : '', id: 'n1' });
  const save = document.createElement('button');
  save.className = 'btn'; save.textContent = 'Save';
  save.onclick = () => { const r = p.get(); if (r) { setMe(r); toast(`Hi ${r.n}`); location.hash = '#/'; } };
  view.append(p.el, save);
  if (me) {
    const clr = document.createElement('button');
    clr.className = 'btn secondary'; clr.textContent = 'Forget my name';
    clr.onclick = () => { setMe(null); toast('Forgotten'); location.hash = '#/'; };
    view.append(clr);
  }
}

async function swipePage(gA, nA, gB, nB, babyG, q) {
  const A = E.find(nA, gA), B = E.find(nB, gB);
  if (!A) return notFound(nA, gA);
  if (!B) return notFound(nB, gB);
  const kind = babyG === 'M' ? 'boys' : 'girls';
  setBar({ back: true, help: 'bub' });
  const pool = E.bubPoolShared(A, B, babyG);
  const theirs = new Set((q.get('with') || '').split(',').filter(Boolean).map((n) => decodeURIComponent(n).toLowerCase()));
  const partnerMode = theirs.size > 0;
  const liked = [], matches = [];
  let i = 0;
  view.innerHTML = `${logo()}<p class="for-line">${kind[0].toUpperCase() + kind.slice(1)} names for ${esc(A.n)} and ${esc(B.n)}</p>
    <div class="swipe-stage"><div class="swipe-card" id="card"></div></div>
    <div class="swipe-btns"><button class="nope" aria-label="Skip">&times;</button><button class="yep" aria-label="Like">${ICON.hearts}</button></div>
    <p class="hint" style="text-align:center">Swipe right to shortlist, left to skip. <span id="left"></span></p>
    <button class="btn secondary slim" id="sendp">${partnerMode ? 'Send my likes back to my partner' : 'Swipe with your partner'}</button>
    ${partnerMode ? `<h2>Matches with your partner <small id="mcount" style="color:var(--pink)">0</small></h2><div id="matches" class="chips"></div>` : ''}
    <h2>Shortlist <small id="count" style="color:var(--muted)">0</small></h2><ul class="list" id="short"></ul>`;
  const card = $('#card'), short = $('#short');
  $('#sendp').onclick = () => {
    track('swipe_partner');
    const url = `${location.origin}/#/swipe/${A.g}/${enc(A.n)}/${B.g}/${enc(B.n)}/${babyG}?with=${liked.map((r) => enc(r.n)).join(',')}`;
    const text = liked.length
      ? `I've liked ${liked.length} ${kind} names on SPASM. Swipe through the same list and see which ones we both like:`
      : `Let's pick ${kind} names together on SPASM. Swipe through this list and see which ones we both like:`;
    if (navigator.share) navigator.share({ title: 'SPASM baby names', text, url }).catch(() => {});
    else navigator.clipboard.writeText(`${text} ${url}`).then(() => toast('Link copied, send it to your partner'), () => prompt('Send this link to your partner', url));
  };
  const show = async () => {
    $('#left').textContent = `${pool.length - i} to go.`;
    if (i >= pool.length) { card.innerHTML = '<div class="swipe-name">That\'s every name</div><p class="swipe-desc">Your shortlist is below and saved in favourites.</p>'; return; }
    const r = pool[i];
    card.style.transform = ''; card.style.opacity = 1;
    card.innerHTML = `<div class="swipe-name">${esc(r.n)}</div><p class="swipe-desc">...</p>`;
    const d = await describe(r);
    if (pool[i] === r) $('.swipe-desc', card).textContent = d;
  };
  const decide = (like) => {
    if (i >= pool.length) return;
    const r = pool[i];
    if (like) {
      liked.push(r);
      addFavQuiet('bub', `${r.n} (for ${A.n} and ${B.n})`, `#/meaning/${r.g}/${enc(r.n)}`);
      short.insertAdjacentHTML('beforeend', `<li><a class="name" href="#/meaning/${r.g}/${enc(r.n)}">${esc(r.n)}</a></li>`);
      $('#count').textContent = liked.length;
      if (theirs.has(r.n.toLowerCase())) {
        matches.push(r);
        $('#mcount').textContent = matches.length;
        $('#matches').insertAdjacentHTML('beforeend', `<a class="chip match" href="#/meaning/${r.g}/${enc(r.n)}">${esc(r.n)}</a>`);
        toast(`It's a match! You both like ${r.n}`);
      }
    }
    card.style.transition = 'transform .25s, opacity .25s';
    card.style.transform = `translateX(${like ? 140 : -140}%) rotate(${like ? 18 : -18}deg)`;
    card.style.opacity = 0;
    setTimeout(() => { card.style.transition = 'none'; i++; show(); }, 250);
  };
  $('.nope').onclick = () => decide(false);
  $('.yep').onclick = () => decide(true);
  let x0 = null, dx = 0;
  card.addEventListener('pointerdown', (e) => { x0 = e.clientX; dx = 0; card.setPointerCapture(e.pointerId); card.style.transition = 'none'; });
  card.addEventListener('pointermove', (e) => { if (x0 === null) return; dx = e.clientX - x0; card.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`; });
  const end = () => { if (x0 === null) return; x0 = null; if (Math.abs(dx) > 90) decide(dx > 0); else { card.style.transition = 'transform .2s'; card.style.transform = ''; } };
  card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
  show();
}

function notFound(name, g) {
  setBar({ back: true });
  const sims = GLABEL[g] ? E.similar(name, g) : [];
  if (GLABEL[g]) logMiss(name, g);
  view.innerHTML = `${logo()}<h1>Hmm.</h1><p class="body">We don't have ${esc(name)} as a ${GLABEL[g] ? GLABEL[g].toLowerCase() : ''} name yet.${sims.length ? ` Did you mean ${sims.map((r) => `<a href="#/meaning/${r.g}/${enc(r.n)}">${esc(r.n)}</a>`).join(', ')}?` : ''}</p><a class="btn" href="#/submit?n=${enc(name)}&g=${g}">Submit a name to be added to SPASM</a><a class="btn secondary" href="#/custom?n=${enc(name)}&g=${g}">Get it written up by David</a><a class="btn secondary" href="#/">Home</a>`;
}

// ---------- router ----------
function route() {
  $('#menu').hidden = true; $('#help').hidden = true;
  view.onclick = null;
  view.className = '';
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, qs = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  const q = new URLSearchParams(qs);
  window.scrollTo(0, 0);
  const [page, ...a] = parts;
  if (E) track('page', page || 'home');
  switch (page) {
    case undefined: return home();
    case 'meaning': return a.length >= 2 ? meaningResult(a[0], a[1]) : meaningForm();
    case 'compat': return a.length >= 4 ? compatResult(a[0], a[1], a[2], a[3], q) : compatForm();
    case 'bub': return a.length >= 5 ? bubResult(a[0], a[1], a[2], a[3], a[4], q) : bubForm();
    case 'kma': return a.length >= 4 ? kmaResult(a[0], a[1], a[2], a[3], q) : kmaForm();
    case 'favourites': return favourites();
    case 'submit': return submitPage(q);
    case 'me': return mePage();
    case 'choose': return a.length >= 2 ? chooseResult(a[0], a[1], q) : chooseForm(q);
    case 'swipe': return a.length >= 5 ? swipePage(a[0], a[1], a[2], a[3], a[4], q) : bubForm();
    case 'more': return morePage();
    case 'notify': return notifyPage();
    case 'group': return a.length >= 1 ? groupResult(a[0]) : groupForm();
    case 'compare': return a.length >= 4 ? compareResult(a[0], a[1], a[2], a[3]) : compareForm();
    case 'pet': return a.length >= 3 ? petResult(a[0], a[1], a[2], q) : petForm();
    case 'famous': return famousPage();
    case 'custom': return customPage(q);
    default: return home();
  }
}

boot().catch(() => { view.innerHTML = '<p class="loading">Could not load SPASM. Check your connection and refresh.</p>'; $('#splash')?.remove(); });

// ---------- updates ----------
// Installed copies check for a new release whenever they're opened or brought back to the front.
// Run scripts/bump_version.py on each release; it updates APP_VERSION, version.json and the cache name together.
const APP_VERSION = 26;
let updateShown = false;
function showUpdate() {
  if (updateShown) return;
  updateShown = true;
  if (document.visibilityState === 'hidden') { location.reload(); return; }
  const bar = document.createElement('button');
  bar.id = 'updatebar';
  bar.textContent = 'SPASM has been updated. Tap to refresh.';
  bar.onclick = () => location.reload();
  document.body.append(bar);
  // if they leave the app, refresh quietly so it's current when they come back
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') location.reload(); }, { once: true });
}
async function checkForUpdate(reg) {
  try {
    const r = await fetch('/version.json', { cache: 'no-store' });
    const { v } = await r.json();
    if (v > APP_VERSION) { if (reg) reg.update().catch(() => {}); showUpdate(); }
  } catch { /* offline */ }
}
if ('serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController) showUpdate(); });
  navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then((reg) => {
    checkForUpdate(reg);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { reg.update().catch(() => {}); checkForUpdate(reg); } });
    setInterval(() => { reg.update().catch(() => {}); checkForUpdate(reg); }, 30 * 60 * 1000);
  }).catch(() => checkForUpdate(null));
} else {
  checkForUpdate(null);
}
