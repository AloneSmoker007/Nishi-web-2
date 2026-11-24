# MASTER WORK INVENTORY — Nishi's Purple Universe

> Handover document for successive Mimo agents. Audit date: **2026-11-20**.
> GitHub is the source of truth. Verify SHAs before trusting this file.

## 0. Snapshot

| Item | Value |
|---|---|
| Repository | https://github.com/AloneSmoker007/Nishi-Purple-Universe |
| Live site | https://alonesmoker007.github.io/Nishi-Purple-Universe/ |
| `main` SHA at audit | `8f769d2` (Add printable birthday QR gift card #21) |
| Open PR: iPhone PIN fix | [#22](https://github.com/AloneSmoker007/Nishi-Purple-Universe/pull/22) (`94ce286`, CI 3/3 PASS, awaiting merge approval) |
| Open PR: playful arcade | [#15](https://github.com/AloneSmoker007/Nishi-Purple-Universe/pull/15) (`b811c8a` = merge of main + root-cause fix, smoke 4/4 PASS, awaiting CI + merge approval) |
| Local PIN | `20062008` (SHA-256 verified in `js/pin-lock.js`) |

## 1. Feature inventory (all live on `main` unless noted)

| Feature | Where | Status |
|---|---|---|
| Birthday PIN lock (keypad, dots, moods, session) | `index.html` + `js/pin-lock.js` | ✅ main; iPhone tap reliability fixed in PR #22 |
| Bubu & Dudu Tenor stickers + sad/crying/happy moods | PIN lock | ✅ (#20) |
| Cinematic intro / opening experience | `#intro`, `js/ui.js` | ✅; fade click-through polish pending (see §4 regression branch) |
| Premium purple hero + 3D castle world | `js/world.js`, `vendor/three.module.min.js` | ✅ (#3,#4,#5,#10,#13) |
| OT7 (all seven members equal) | `#ot7` section (RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook) | ✅ |
| V / Kim Taehyung | OT7 member card (`halo V`, role "Taehyung") | ✅ equal representation; a dedicated V-only section is an open idea (future work) |
| Songs / Concert / Storybook / Game / Dream Road | `index.html` + `js/ui.js`, `js/wishes.js` | ✅ |
| Purple Wishing Stars (catch shooting stars) | `js/wishes.js` (Phase 6) | ✅ (#1,#2) |
| "Nishi, Tell Me Your Universe" Q&A + reveal | `js/quest.js` | ✅ |
| Music Room: YouTube official playback + local private MP3 picker + ambient fallback | `js/player.js` (#9, supersedes #7) | ✅ |
| 7-Star Secret Surprise (gift box + letter) | `#gift-btn`, letter section | ✅ |
| Secret World: OT7 star hunt (7 stars) | `js/secret-world.js` (#17) | ✅ |
| Open When letters (bilingual) | `js/secret-world.js` | ✅ |
| Virtual Hug + Magic Shop comfort reveal | `js/secret-world.js` | ✅ |
| Photocard gacha (OT7 + ULTRA RARE) | `js/secret-world.js` | ✅ |
| Printable QR birthday card | `qr-card.html` (embedded base64 QR → live URL) | ✅ (#21); QR verified 2026-11-20 |
| English/Bangla bilingual content | `content/site-config.js`, `js/ui.js` i18n | ✅ |
| Reduced-motion + WebGL fallback + accessibility | across modules | ✅ |
| Playful bilingual mini-arcade (3 gift cards) | PR #15 branch only | ⏳ not in main yet (root cause fixed 2026-11-20) |

## 2. PR history (all 22 PRs)

| PR | Title | State | Disposition |
|---|---|---|---|
| 22 | Fix iPhone Safari PIN keypad | **OPEN** | ✅ verified 6/6 suites + 4/4 smoke; **awaiting merge approval** |
| 21 | Printable birthday QR gift card | MERGED | kept |
| 20 | Real Bubu & Dudu Tenor stickers | MERGED | kept |
| 19 | Fix mobile PIN keypad and polish birthday lock | MERGED | kept (partial fix; full fix in #22) |
| 18 | Fix PIN keypad input registration | CLOSED | superseded by #19 |
| 17 | Bilingual Secret World surprises | MERGED | kept |
| 16 | Bubu & Dudu expressions on PIN lock | MERGED | kept |
| 15 | Playful bilingual birthday surprises | **OPEN** | root cause fixed & pushed `b811c8a` 2026-11-20 (merge main + anchor hardening + config junction fix + test-order fix; smoke 4/4, syntax 11/11, static 12/12) |
| 14 | Cute birthday PIN lock | MERGED | kept |
| 13 | Premium Purple Universe homepage | MERGED | kept |
| 12 | Premium homepage (stacked variant) | CLOSED | superseded by #13 |
| 11 | Premium landing experience | CLOSED | superseded by #13 |
| 10 | Enable adaptive 3D on mobile | MERGED | kept |
| 9 | Fix music source switching / local MP3 | MERGED | kept |
| 8 | Enable adaptive 3D castle on mobile | **CLOSED 2026-11-20** | superseded by #10 (verified in main's `canRunWebGL`) |
| 7 | Harden music playback + local MP3 | **CLOSED 2026-11-20** | superseded by #9 (verified: picker, regex fix, ambient stop, YT timeout all in main) |
| 6 | Fix mobile Safari hero viewport | MERGED | kept |
| 5 | Fix Phase 7b post-processing lifecycle | MERGED | kept |
| 4 | Phase 7b post-processing | MERGED | kept |
| 3 | Phase 7 cinematic world | MERGED | kept |
| 2 | Phase 6 gap audit (wishes.js) | MERGED | kept |
| 1 | Phase 6 Purple Wishing Stars | MERGED | kept |

## 3. Historical findings — rechecked 2026-11-20

- **PR #15 `#joy-arcade` timeout — ROOT CAUSE FOUND & FIXED** (branch updated):
  1. `initPlayfulArcade()` anchors the arcade to `#final-letter.closest("section")`; the branch's base was missing the heart-letter section wrapper (restored on main in `97c454e`), so the anchor was `null` and the module silently returned → `#joy-arcade` never existed. (Reproduced: `finalLetterHost: null`.)
  2. A merge-time syntax break in `content/site-config.js` (missing `,` between `playfulArcade` and `secretWorld`) would also kill the module — fixed.
  3. The smoke assertions clicked gift cards **before** dismissing the full-screen intro overlay → guaranteed click interception; block moved after intro dismissal (assertions unchanged).
  4. Module hardened: anchor falls back to `#final-letter.parentElement`.
- **PR #7**: all unique fixes verified present in main at commit level (mapping table + `js/player.js` line evidence posted as PR comment 2026-11-20). Closed.
- **PR #8**: single unique commit `93df451` contained in main's `65e61f0` (PR #10). Evidence posted on PR. Closed.
- **`fix/pin-and-full-site-regression` branch** (previous Mimo, unpushed→pushed, no PR): valuable work recovered and being integrated — intro fade click-through (`.intro.is-hidden` transition), stable PIN status line height (prevents keypad jumping when status wraps), deferred 3D world boot behind the intro (`nishi:intro-closed`), `tests/webkit-regression.mjs` + diag/stress scripts, `NISHI_SAFEPOINTS/` docs. Its PIN media-query approach is superseded by PR #22's verified tiers (which also cover landscape + desktop). See §4.
- **Music Room tests**: player behaviour is covered by `tests/browser-smoke.mjs` (music-room markup + player lifecycle invariants in `validate.yml`). The branch also carries stress scripts. No dedicated music unit test file existed before; playback is exercised via browser smoke + CI invariants. ⚠️ gap noted in TEST_EVIDENCE.md.

## 4. Pending integration (branch: `fix/integrate-regression-handover`, see NEXT_TASK.md)

From `fix/pin-and-full-site-regression` into the PR #22 line:
1. `.intro.is-hidden` fade + delayed `pointer-events` (click-through while fading).
2. Stable `.pin-lock-status` height (2-line reserve) in the compact tiers.
3. Deferred 3D boot (`worldBootPromise`, `nishi:intro-closed`) — needs re-verification against current `js/ui.js`.
4. Adopt `tests/webkit-regression.mjs`/stress scripts if they add coverage beyond `tests/pin-keypad-touch.mjs`.
5. `NISHI_SAFEPOINTS/` docs → superseded by root-level handover docs (this file + NEXT_TASK.md + TEST_EVIDENCE.md + RELEASE_CHECKLIST.md + SAFETY_CHECKPOINT.md).

## 5. Known risks / open items

- **No physical-device testing has been performed** (all evidence = Playwright WebKit/Chromium emulation). A real-iPhone tap test before release is the top remaining risk item.
- PR #22 and PR #15 need merge approval before release.
- V (Taehyung) has no dedicated section beyond the OT7 card — candidate future enhancement (do not skip the other six).
- `tests/browser-smoke.mjs` runs Chromium only in CI; WebKit coverage lives in `tests/pin-keypad-touch.mjs` + `webkit-regression.mjs`.
