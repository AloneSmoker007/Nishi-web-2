# TEST_EVIDENCE.md — exact results (audit 2026-11-20)

> All browser testing below is **emulation** (Playwright WebKit = Safari engine, Chromium).
> **No physical-device testing has been performed.** Do not report otherwise.

## A. PR #22 — iPhone PIN keypad fix (`fix/iphone-pin-keypad-touch-input`, `94ce286`)

### New regression suite `tests/pin-keypad-touch.mjs` — **6 profile suites PASS / 0 FAIL / 0 SKIP** (2 consecutive clean runs)

| Suite | Engine / device profile | Result |
|---|---|---|
| 1 | WebKit iPhone 13 (390×664, touch) | PASS |
| 2 | WebKit iPhone SE (375×667, touch) | PASS |
| 3 | WebKit iPhone 14 Pro Max landscape (740×390, touch) | PASS |
| 4 | Chromium Android (Pixel 7, touch) | PASS |
| 5 | Chromium desktop (1365×900) | PASS |
| 6 | WebKit iPhone reduced-motion + orientation change | PASS |

Per-suite assertions: all 12 keypad keys fully on-screen without scrolling; every key owns its tap target (elementFromPoint); one tap = exactly one digit; backspace/clear behaviour; wrong PIN ×2 (sad → crying); correct PIN `20062008` (happy → unlock → inert lifted); session persistence across reload; rotation keeps digits and taps working.

**Before-fix reproduction** (same suite on the unfixed tree, FAIL): iPhone 13 → off-screen keys `7, 8, 9, clear, 0, backspace` (overlay 848px in 667px viewport).

### Existing suite `tests/browser-smoke.mjs` (Chromium) — **4/4 PASS / 0 FAIL / 0 SKIP**
desktop 1365×900 · iPhone 375×667 · Android 412×915 · tablet 768×1024 — PIN flow, Bubu & Dudu moods, Secret World 7 stars, Open-When letter, Virtual Hug, Magic Shop, photocard gacha, 3D/CSS fallback, layout/no-overflow, nav, i18n, zero console errors.

### CI (GitHub Actions) — 3/3 jobs PASS on `94ce286`
- Static validation ✅ (run 44637936340)
- Browser smoke tests ✅ (run 44637936133)
- **WebKit (Safari engine) iPhone PIN keypad regression tests ✅** (run 44637936133, job 135961216854)

## B. PR #15 — playful arcade fix (`feat/nishi-playful-mix-experience`, `b811c8a`)

### `tests/browser-smoke.mjs` (branch suite incl. arcade assertions) — **4/4 PASS / 0 FAIL / 0 SKIP** (exit=0)
desktop · iPhone-sized · Android-sized · tablet — run log: `playful-smoke3.log`/`playful-smoke4.log`.
Arcade assertions exercised: `#joy-arcade` appears after PIN unlock; exactly 3 gift cards; gift click → `aria-expanded=true`; `#joy-arcade-reveal` visible; message length > 20. Intro dismissal precedes all clicks.

### Syntax — **11/11 PASS** (`node --check` on audio, content, pin-lock, player, playful-moments, quest, secret-world, ui, wishes, world, site-config)

### Static validation (CI python block executed locally) — **12/12 PASS**
SEO/fallback · music player markup · premium hero · **playful arcade + PIN-gated startup + reduced-motion** · content config + SVG fallback · Secret World + OT7 hunt + letters + hug · Magic Shop + photocard + late PIN unlock · Bubu & Dudu moods · full-site PIN gate · music timer lifecycle · adaptive GPU budgets · WebGL visibility lifecycle

### Root-cause evidence (reproduced, not guessed)
Browser-side diagnostic on the pre-fix branch: `arcadeExists: false, finalLetterHost: null` → module silent-return; after merge: `config OK — gifts: 3`, smoke 4/4.

### Flake classification (one intermittent failure, honestly recorded)
One local re-run (on the final tree) failed at `#skip-intro` visibility (30s timeout) while the machine was running concurrent work. The **same tree** passed: smoke3 (pre-amend run), smoke5 (clean re-run, exit=0 4/4), GitHub CI smoke (run 44640539815), and an 8-iteration state-sampling diagnostic of the exact post-unlock sequence (8/8: intro never auto-hides, `skip` always visible, `prefers-reduced-motion=false`, `nishi-intro-seen=null`).
**Classification: environment/timing flake under CPU contention — not an implementation regression and not an assertion defect.** No test was weakened or skipped.

## C. Post-merge verification on `main` (2026-11-21, merges `291e6c2` + `70b8074` + `cb05a13`)
- `tests/pin-keypad-touch.mjs` — **6/6 PASS / 0 FAIL / 0 SKIP** (exit=0)
- `tests/browser-smoke.mjs` — **4/4 PASS / 0 FAIL / 0 SKIP** (exit=0; arcade + PIN + Secret World combined tree)
- `validate.yml` static blocks — **all PASS** (incl. arcade + QR checks)
- CI on `cb05a13`: Browser smoke ✅, Static validation ✅, pages-build-deployment ✅
- Live site: HTTP 200, new PIN lock deployed and verified
- **CI flake (recorded honestly):** one run on intermediate commit `291e6c2` failed the 5s reload wait in the WebKit PIN job under runner load. The identical code passed CI on `94ce286` and `cb05a13` and locally 6/6 → timing flake, not a defect. Reload wait hardened to 10s (assertion unchanged).

## D. Static validation on `main` (`8f769d2`) — PASS (run 44630251495/44402838211)
Browser smoke on `main` — PASS (run 44402838243).

## D. Gaps / honest limitations
- **Music Room**: covered by smoke markup checks + `validate.yml` lifecycle invariants + manual browser assertions; **no dedicated automated playback test** (headless cannot play YouTube audio). Playback must be checked by a human on a real phone.
- **QR card**: base64 QR decodes to the live URL (multimodal read + static checks in `validate.yml`); no camera-scan test.
- **iPhone/Android physical devices**: none tested. Highest-priority release blocker candidate.
