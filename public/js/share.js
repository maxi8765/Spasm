// Builds a shareable 1080x1350 PNG card for a result, then shares it.
import { tr } from './i18n.js';
const W = 1080, H = 1350, PAD = 80;
const SITE = location.host;
let logoImg = null;

function loadLogo() {
  if (logoImg) return logoImg;
  logoImg = new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = '/img/logo.png'; });
  return logoImg;
}

function wrap(ctx, text, maxW) {
  const lines = [];
  for (const para of String(text).split(/\n+/)) {
    let line = '';
    for (const word of para.split(/\s+/)) {
      const t = line ? line + ' ' + word : word;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = word; } else line = t;
    }
    if (line) lines.push(line);
  }
  return lines;
}

function pill(ctx, x, y, text, color) {
  ctx.font = '700 34px Comfortaa, sans-serif';
  const w = ctx.measureText(text).width + 44;
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.roundRect(x, y, w, 62, 14); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillText(text, x + 22, y + 43);
  return w;
}

const COLORS = { M: '#5552ff', F: '#a855f7', blue: '#5552ff', pink: '#f04e98' };

// spec: { kicker, title, tags:[[text,colorKey]], score, scoreLabel, body, list:[names] }
export async function renderCard(spec) {
  try { await document.fonts.load('700 40px Comfortaa'); await document.fonts.load('400 40px Comfortaa'); } catch { /* fallback font */ }
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#393849'); g.addColorStop(1, '#1d1c28');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // faint shapes, echoing the app background
  ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 5;
  for (let i = 0; i < 14; i++) {
    const x = (i * 263) % W, y = (i * 389) % H;
    ctx.beginPath();
    if (i % 3 === 0) ctx.arc(x, y, 34, 0, Math.PI * 2);
    else if (i % 3 === 1) { ctx.moveTo(x, y); ctx.lineTo(x + 70, y + 30); ctx.lineTo(x + 10, y + 70); ctx.closePath(); }
    else ctx.rect(x, y, 56, 56);
    ctx.stroke();
  }

  const logo = await loadLogo();
  let y = 90;
  if (logo) { const lw = 420, lh = lw * logo.height / logo.width; ctx.drawImage(logo, (W - lw) / 2, y, lw, lh); y += lh + 50; }

  ctx.fillStyle = '#a7a6b8'; ctx.font = '400 36px Comfortaa, sans-serif'; ctx.textAlign = 'center';
  if (spec.kicker) { ctx.fillText(spec.kicker, W / 2, y); y += 70; }
  ctx.textAlign = 'left';

  ctx.fillStyle = '#fff'; ctx.font = '700 76px Comfortaa, sans-serif';
  for (const line of wrap(ctx, spec.title, W - PAD * 2).slice(0, 2)) { ctx.fillText(line, PAD, y + 60); y += 92; }
  y += 10;

  if (spec.tags && spec.tags.length) {
    let x = PAD;
    for (const [t, col] of spec.tags) x += pill(ctx, x, y, t, COLORS[col] || COLORS.blue) + 16;
    y += 100;
  }

  if (spec.score) {
    ctx.fillStyle = '#fff'; ctx.font = '700 120px Comfortaa, sans-serif';
    ctx.fillText(spec.score, PAD, y + 100);
    const sw = ctx.measureText(spec.score).width;
    if (spec.scoreLabel) pill(ctx, PAD + sw + 30, y + 46, spec.scoreLabel, COLORS.blue);
    y += 150;
  }

  ctx.fillStyle = '#a855f7'; ctx.fillRect(PAD, y, 360, 7); y += 60;

  const footerTop = H - 150;
  if (spec.list) {
    ctx.fillStyle = '#fff'; ctx.font = '700 58px Comfortaa, sans-serif';
    const colW = (W - PAD * 2) / 2;
    spec.list.slice(0, 10).forEach((n, i) => {
      const cx = PAD + (i % 2) * colW, cy = y + 50 + Math.floor(i / 2) * 92;
      if (cy < footerTop - 20) ctx.fillText(n, cx, cy);
    });
  } else if (spec.body) {
    ctx.fillStyle = '#e9e8f2'; ctx.font = '400 42px Comfortaa, sans-serif';
    const lines = wrap(ctx, spec.body, W - PAD * 2);
    const room = Math.floor((footerTop - y - 20) / 60);
    const shown = lines.slice(0, room);
    if (lines.length > room && shown.length) shown[shown.length - 1] = shown[shown.length - 1].replace(/\s*\S*$/, '') + '...';
    shown.forEach((l, i) => ctx.fillText(l, PAD, y + 40 + i * 60));
  }

  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, H - 110, W, 110);
  ctx.fillStyle = '#fff'; ctx.font = '700 38px Comfortaa, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(tr('What does your name say?') + ' ' + SITE, W / 2, H - 52);
  ctx.fillStyle = '#a7a6b8'; ctx.font = '400 24px Comfortaa, sans-serif';
  ctx.fillText('\u00a9 2026 David Hocking', W / 2, H - 16);
  ctx.textAlign = 'left';

  return new Promise((res) => c.toBlob(res, 'image/png'));
}

// Shares the card image plus a link back to the exact result.
export async function shareCard(spec, text, toast, url = location.href) {
  let blob = null;
  try { blob = await renderCard(spec); } catch { /* fall through to link share */ }
  const file = blob ? new File([blob], 'spasm.png', { type: 'image/png' }) : null;
  const msg = `${text}\n${url}`;
  if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], text: msg, title: 'SPASM' }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  if (navigator.share) {
    try { await navigator.share({ title: 'SPASM', text, url }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  // desktop: download the image and copy the link
  if (blob) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'spasm.png'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }
  try { await navigator.clipboard.writeText(msg); toast(blob ? 'Image saved and link copied' : 'Link copied'); }
  catch { toast(blob ? 'Image saved' : 'Could not share'); }
}
