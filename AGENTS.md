# Project notes

freecode reads this file before every change. Add anything it should always remember about this project.

## Fixes applied (Nov 2026)
- `js/pin-lock.js`: PIN verification no longer depends on `crypto.subtle` (which only exists on secure origins). A pure-JS SHA-256 fallback keeps the keypad working on plain-http hosts/previews. Keep the fallback in sync with `PIN_SHA256`.
- `index.html`: `.pin-lock-status` has a fixed min-height so the keypad never shifts mid-tap.
- `index.html`: intro buttons (`.intro-actions .btn`) never translate on hover/active — a moving hit target swallows taps.
- `js/ui.js`: intro closes on `pointerdown`/`touchend` (first event of a real tap) plus click de-duplication, and a background tap also advances.
- `index.html`: local `Noto Sans Bengali` webfont (`fonts/noto-sans-bengali.woff2`) so Bangla text never renders as tofu boxes; symbol font fallbacks added.
- `assets/nishi-busan-memory.jpg`: the committed JPEG was truncated/corrupt; re-encoded to a clean 540px-wide file.

## Gift letter fix (2026)
`initGift()` in `js/ui.js` now sizes `#gift-reveal` from `scrollHeight` and
disables its max-height/opacity transition before setting `opacity:1`.
Reason: the 0 -> 1400px max-height transition can stall (suspended tab, host
stylesheet override) leaving the letter at height 0 / opacity 0. The code also
forces the surrounding `.reveal` wrapper visible so a missed
IntersectionObserver cannot hide the opened letter.

## Hero poster redesign (poster hero)
The home hero is a full-bleed poster: `assets/hero-poster.svg` as the sky layer,
a glass side rail (`.hero-rail`), the headline (`.poster-copy`), a Now Playing
card (`.now-card`) and a keyhole plaque inside `.hero-foot`, plus a 5-item
`.poster-strip`. Grid areas: `rail copy now / rail foot now / strip strip strip`
and the scroll pill takes column 3 of the strip row. At <=1180px the areas
collapse to two columns with `strip strip / pill pill`; at <=980px everything
is one column in the order copy, rail, now, foot, strip, pill. Do not give
`.poster-strip` or `.scroll-pill` a `grid-area` name — extra areas used to
create phantom columns on phones.

All decorative marks are inline SVG (`.ico`) or the CSS `.play-glyph`, never a
font glyph, so no platform can render a tofu box. The Now Playing card is the
same player as the Music Room: `js/player.js` `syncUI()` mirrors title, progress
and play/pause into `#poster-now-title`, `#poster-bar-fill` and
`[data-player-glyph]`, and `initPlayer()` binds every `[data-player-action]`.
On phones the art is pinned to the top ~72vh band with a gradient fade, because
stretching the 16:9 poster over the tall stacked layout buried the moon behind
the copy.

## Journey layer, AI artwork & sticker card framing
- `css/journey.css` + `js/journey.js` add the opt-in chapter rail, mobile bottom
  chapter pill, top scroll filament, portal wipe transition on `#` anchor links,
  and subtle hero art drift. Deep links (`location.hash` other than `#home`) set
  `html.deep-link` pre-paint so the intro title card never flashes over a target
  room.
- `assets/ai/` holds generated artwork for the hero castle, all 7 realm cards,
  the `#gallery` editorial split band, and the surprise box; `assets/hero-poster.svg`
  remains the `<picture>` fallback.
- `assets/audio/` holds 7 local original MP3 instrumentals wired in
  `content/site-config.js` and `js/player.js`.
- Lock screen stickers (`assets/stickers/`, including `bubu-dudu-thinking.gif`)
  are framed in a rounded light sticker card (`.pin-mascot-wrap`, `object-fit:contain`)
  instead of a circular crop so the full character artwork stays visible.

