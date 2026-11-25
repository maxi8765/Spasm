const s = (body, extra = '') => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" ${extra}>${body}</svg>`;

export const ICON = {
  menu: s('<path d="M12 20h40M12 32h32M12 44h40"/>', 'stroke-width="4"'),
  back: s('<path d="M52 32H14M28 16 12 32l16 16"/>', 'stroke-width="4"'),
  help: s('<path d="M24 22a8 8 0 1 1 12 7c-3 2-4 4-4 8"/><circle cx="32" cy="48" r="1.5" fill="currentColor"/>', 'stroke-width="4"'),
  share: s('<circle cx="46" cy="16" r="7"/><circle cx="18" cy="32" r="7"/><circle cx="46" cy="48" r="7"/><path d="m24 28 16-8M24 36l16 8"/>', 'stroke-width="4"'),
  chev: s('<path d="m16 24 16 16 16-16"/>', 'stroke-width="6"'),
  hearts: s('<path d="M24 46 10 32a10 10 0 0 1 14-14l2 2 2-2a10 10 0 0 1 14 3"/><path d="M40 56 28 44a8.5 8.5 0 0 1 12-12l0 0a8.5 8.5 0 0 1 12 12z"/>'),
  head: s('<path d="M20 30c0-9 5-14 12-14s12 5 12 14"/><path d="M20 30c-3 0-3 7 0 8 2 8 7 13 12 13s10-5 12-13c3-1 3-8 0-8"/><path d="M22 28c5 0 12-2 15-7 1 3 4 6 7 7"/><path d="M26 36h4M36 36h4M28 43c2 2 6 2 8 0"/><path d="m18 6 5 6-3 1 5 5M32 4l-2 7h4l-2 7M46 6l-4 6 3 1-4 5"/>', 'stroke-width="3.5"'),
  baby: s('<circle cx="30" cy="32" r="18"/><path d="M12 30a5 5 0 0 0 0 8M48 30a5 5 0 0 1 0 8"/><path d="M28 14c-4 0-4 6 0 6"/><circle cx="24" cy="31" r="1.5" fill="currentColor"/><circle cx="36" cy="31" r="1.5" fill="currentColor"/><path d="M25 38c3 3 7 3 10 0"/><path d="M46 56 40 50a4 4 0 0 1 6-6l0 0a4 4 0 0 1 6 6z" fill="none"/>', 'stroke-width="3.5"'),
  balloons: s('<ellipse cx="24" cy="26" rx="13" ry="16"/><ellipse cx="40" cy="24" rx="13" ry="16"/><path d="M24 42l-3 8M40 40l-3 10M44 16c2 2 3 5 3 8"/>', 'stroke-width="3.5"'),
  kiss: s('<path d="M8 32c6-8 14-12 18-9 3 2 3 2 6 0s3-2 6 0c4-3 12 1 18 9-6 9-14 13-24 13S14 41 8 32z"/><path d="M8 32c10 2 18 2 24 0s14-2 24 0"/>', 'stroke-width="3.5"'),
  ring: s('<circle cx="32" cy="40" r="15"/><path d="m24 14 8-8 8 8-8 10z"/>', 'stroke-width="3.5"'),
  avoid: s('<circle cx="32" cy="32" r="22"/><path d="m16 16 32 32"/>', 'stroke-width="4"'),
  sliders: s('<path d="M12 18h40M12 32h40M12 46h40"/><circle cx="24" cy="18" r="5" fill="#1b1a26"/><circle cx="40" cy="32" r="5" fill="#1b1a26"/><circle cx="28" cy="46" r="5" fill="#1b1a26"/>', 'stroke-width="4"'),
  group: s('<circle cx="22" cy="22" r="7"/><circle cx="42" cy="22" r="7"/><circle cx="32" cy="36" r="7"/><path d="M10 50c1-7 6-11 12-11M54 50c-1-7-6-11-12-11M20 58c1-7 6-11 12-11s11 4 12 11"/>', 'stroke-width="3.5"'),
  bars: s('<path d="M12 18h28M12 28h40M12 38h20M12 48h34"/>', 'stroke-width="5"'),
  paw: s('<ellipse cx="32" cy="42" rx="11" ry="9"/><circle cx="18" cy="28" r="5"/><circle cx="26" cy="18" r="5"/><circle cx="38" cy="18" r="5"/><circle cx="46" cy="28" r="5"/>', 'stroke-width="3.5"'),
  star: s('<path d="m32 8 7 15 16 2-12 11 3 16-14-8-14 8 3-16L9 25l16-2z"/>', 'stroke-width="3.5"'),
  pen: s('<path d="M44 10 54 20 24 50l-13 3 3-13z"/><path d="m38 16 10 10"/>', 'stroke-width="3.5"'),
  refresh: s('<path d="M50 30a18 18 0 1 0-5 13"/><path d="M50 14v16H34"/>', 'stroke-width="4"'),
};
