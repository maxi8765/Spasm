// Tattoo lettering for any name, drawn on a canvas so every name in SPASM (and any David adds) has designs.
// Downloads are transparent PNGs in solid black ink, sized for a tattoo artist to print or trace.

const F = (file, family) => ({ file: `/fonts/tattoo/${file}-latin-400-normal.woff2`, family });
const FONTS = {
  oldEnglish: F('unifrakturmaguntia', 'SP Old English'),
  pirata: F('pirata-one', 'SP Gothic'),
  grenze: F('grenze-gotisch', 'SP Grenze'),
  greatVibes: F('great-vibes', 'SP Flowing'),
  monsieur: F('monsieur-la-doulaise', 'SP Fine Script'),
  alex: F('alex-brush', 'SP Brush Script'),
  pinyon: F('pinyon-script', 'SP Elegant'),
  kaushan: F('kaushan-script', 'SP Bold Brush'),
  typewriter: F('special-elite', 'SP Typewriter'),
};

// name, font, extra ornament, text transform, letter spacing (em)
export const STYLES = [
  { id: 'old-english', label: 'Old English', font: 'oldEnglish' },
  { id: 'old-english-rules', label: 'Old English with rules', font: 'oldEnglish', orn: 'rules' },
  { id: 'gothic', label: 'Gothic', font: 'pirata' },
  { id: 'gothic-tall', label: 'Gothic narrow', font: 'grenze' },
  { id: 'flowing', label: 'Flowing script', font: 'greatVibes' },
  { id: 'fine', label: 'Fine line script', font: 'monsieur' },
  { id: 'brush', label: 'Brush script', font: 'alex' },
  { id: 'elegant', label: 'Elegant script', font: 'pinyon', orn: 'swash' },
  { id: 'bold-brush', label: 'Bold brush', font: 'kaushan' },
  { id: 'typewriter', label: 'Typewriter', font: 'typewriter', case: 'lower', spacing: 0.12 },
  { id: 'script-heart', label: 'Script with heart', font: 'greatVibes', orn: 'heart' },
  { id: 'script-stars', label: 'Script with stars', font: 'alex', orn: 'stars' },
];

let fontsReady = null;
export function loadFonts() {
  if (fontsReady) return fontsReady;
  fontsReady = Promise.all(Object.values(FONTS).map(async ({ file, family }) => {
    try { const f = new FontFace(family, `url(${file})`); await f.load(); document.fonts.add(f); } catch { /* falls back to a system font */ }
  }));
  return fontsReady;
}

function heart(ctx, x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
  ctx.fill();
}
function star(ctx, x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath(); ctx.fill();
}

// Draw one design into a canvas. opts: { w, h, ink, bg }
export function draw(canvas, name, style, opts = {}) {
  const w = opts.w || 1200, h = opts.h || 500, ink = opts.ink || '#111', pad = w * 0.07;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  if (opts.bg) { ctx.fillStyle = opts.bg; ctx.fillRect(0, 0, w, h); }
  const text = style.case === 'lower' ? name.toLowerCase() : name;
  const family = FONTS[style.font].family;
  const orn = style.orn;
  const maxW = w - pad * 2 - (orn === 'heart' ? h * 0.32 : 0) - (orn === 'stars' ? h * 0.5 : 0);
  const maxH = h * (orn === 'rules' || orn === 'swash' ? 0.5 : 0.62);
  let size = maxH;
  const spacing = (style.spacing || 0) ;
  const measure = (sz) => { ctx.font = `${sz}px "${family}", cursive`; return ctx.measureText(text).width + spacing * sz * Math.max(0, text.length - 1); };
  while (size > 10 && measure(size) > maxW) size -= 2;
  ctx.font = `${size}px "${family}", cursive`;
  ctx.fillStyle = ink; ctx.strokeStyle = ink;
  ctx.textBaseline = 'alphabetic';
  const m = ctx.measureText(text);
  const tw = measure(size);
  const asc = m.actualBoundingBoxAscent || size * 0.7, desc = m.actualBoundingBoxDescent || size * 0.2;
  let cx = w / 2;
  if (orn === 'heart') cx -= h * 0.14;
  const baseY = h / 2 + (asc - desc) / 2 - (orn === 'swash' ? h * 0.06 : 0);
  // letters (spacing applied manually for the typewriter style)
  if (spacing) {
    let x = cx - tw / 2;
    for (const ch of text) { ctx.fillText(ch, x, baseY); x += ctx.measureText(ch).width + spacing * size; }
  } else {
    ctx.textAlign = 'center';
    ctx.fillText(text, cx, baseY);
    ctx.textAlign = 'start';
  }
  const left = cx - tw / 2, right = cx + tw / 2;
  ctx.lineWidth = Math.max(2, h * 0.008);
  ctx.lineCap = 'round';
  if (orn === 'rules') {
    const y1 = baseY - asc - h * 0.07, y2 = baseY + desc + h * 0.07;
    for (const y of [y1, y2]) {
      ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(right, y); ctx.stroke();
      star(ctx, left - h * 0.04, y, h * 0.018); star(ctx, right + h * 0.04, y, h * 0.018);
    }
  } else if (orn === 'swash') {
    const y = baseY + desc + h * 0.06;
    ctx.beginPath();
    ctx.moveTo(left + tw * 0.05, y);
    ctx.bezierCurveTo(left + tw * 0.35, y + h * 0.09, left + tw * 0.65, y - h * 0.05, right, y + h * 0.02);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(right + h * 0.015, y + h * 0.02, h * 0.012, 0, Math.PI * 2); ctx.fill();
  } else if (orn === 'heart') {
    heart(ctx, right + h * 0.16, baseY - asc * 0.75, h * 0.2);
  } else if (orn === 'stars') {
    star(ctx, right + h * 0.12, baseY - asc * 0.8, h * 0.06);
    star(ctx, right + h * 0.26, baseY - asc * 0.45, h * 0.035);
    star(ctx, left - h * 0.1, baseY - asc * 0.2, h * 0.03);
  }
  return canvas;
}

// High-resolution transparent PNG, cropped to the ink with a margin
export async function pngBlob(name, style, ink = '#000') {
  await loadFonts();
  const big = draw(document.createElement('canvas'), name, style, { w: 3000, h: 1250, ink });
  const ctx = big.getContext('2d');
  const { data, width, height } = ctx.getImageData(0, 0, big.width, big.height);
  let x0 = width, y0 = height, x1 = 0, y1 = 0;
  for (let y = 0; y < height; y += 2) for (let x = 0; x < width; x += 2) {
    if (data[(y * width + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  if (x1 <= x0) return new Promise((r) => big.toBlob(r, 'image/png'));
  const m = 60;
  x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(width, x1 + m); y1 = Math.min(height, y1 + m);
  const out = document.createElement('canvas');
  out.width = x1 - x0; out.height = y1 - y0;
  out.getContext('2d').drawImage(big, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
  return new Promise((r) => out.toBlob(r, 'image/png'));
}
