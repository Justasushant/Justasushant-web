// When Lab components were added or last reworked (YYYY-MM-DD).
// Cards show a "New" badge for two weeks after `added`
// and an "Updated" badge for one week after `updated`.

const added = {
  'manga-navbar': '2026-10-30',
  'manga-loader': '2026-10-30',
  'manga-text': '2026-10-30',
  'panel-switch': '2026-10-30',
  'diagonal-switch': '2026-10-30',
  'tear-switch': '2026-10-30',
  'depth-zoom': '2026-10-30',
  'portal-switch': '2026-10-30',
  'speed-lines': '2026-10-30',
  'manga-button': '2026-10-30',
  'manga-panel': '2026-10-30',
  'web-hero': '2026-10-30',
  'manga-hero': '2026-10-30',
  'manga-ui': '2026-10-30',
  'chat-loop': '2026-10-23',
  'deploy-loop': '2026-10-23',
  'tear-reveal': '2026-10-29',
  'web-shooter': '2026-10-30',
  'reveal-footer': '2026-10-30',
  'marquee-footer': '2026-10-30',
  'columns-footer': '2026-10-30',
  'fireworks-button': '2026-10-30',
  'liquid-button': '2026-10-30',
  'rocket-button': '2026-10-30',
  'heart-button': '2026-10-30',
  'spider-sense-text': '2026-10-30',
  'web-card': '2026-10-30',
  'spider-loader': '2026-10-30',
  'comic-button': '2026-10-30',
  'comic-card': '2026-10-30',
  'split-flap': '2026-10-30',
  'pixel-button': '2026-10-30',
  'check-list': '2026-10-30',
}

const updated = {
  'web-shooter': '2026-10-30',
  'compare-slider': '2026-10-30',
  dock: '2026-10-30',
  'flashlight-text': '2026-10-30',
  'confetti-button': '2026-10-30',
  'sparkle-button': '2026-10-30',
  'cube-loader': '2026-10-30',
  'dots-loader': '2026-10-30',
  'infinity-loader': '2026-10-30',
  'morph-loader': '2026-10-30',
  'orbit-loader': '2026-10-30',
  'pulse-loader': '2026-10-30',
  'ring-loader': '2026-10-30',
  'blur-switch': '2026-10-30',
  'book-flip': '2026-10-30',
  'circle-reveal': '2026-10-30',
  'cube-rotate': '2026-10-30',
  'glitch-switch': '2026-10-30',
  'horizontal-scroll': '2026-10-30',
  'mosaic-switch': '2026-10-30',
  'parallax-scroll': '2026-10-30',
  'snap-scroll': '2026-10-30',
  'split-reveal': '2026-10-30',
  'stack-scroll': '2026-10-30',
  'swing-switch': '2026-10-30',
  'zoom-switch': '2026-10-30',
}

const DAY = 24 * 60 * 60 * 1000
const within = (date, days) => date && Date.now() - new Date(date).getTime() < days * DAY

// 'new', 'updated' or null
export const badgeFor = (slug) =>
  within(added[slug], 14) ? 'new' : within(updated[slug], 7) ? 'updated' : null
