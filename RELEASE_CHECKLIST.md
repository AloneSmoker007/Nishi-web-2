# RELEASE_CHECKLIST.md — Nishi's Purple Universe

**Status (2026-11-20): NOT RELEASE READY** — blocking items in bold.

## Merge queue (needs human approval)
- [x] PR #22 (iPhone PIN fix) **MERGED** `291e6c2` (2026-11-21)
- [x] PR #15 (playful arcade) **MERGED** `70b8074` (2026-11-21)
- [x] Docs PR #23 (handover docs) **MERGED** `cb05a13` (2026-11-21)
- [ ] Integration branch (regression-branch work) completed & merged (NEXT_TASK.md)

## Verification gates
- [x] `node --check` on all JS — PASS (11/11 per branch; all files on main)
- [x] `validate.yml` static validation — PASS (12/12 blocks)
- [x] PIN regression suite (WebKit + Chromium) — PASS 6/6
- [x] Browser smoke suite — PASS 4/4 (both PR lines)
- [x] Zero removed assertions vs main (diff-audited)
- [x] QR destination verified (decodes to live URL)
- [x] Post-merge re-run of both suites on `main` — **PIN 6/6 PASS, smoke 4/4 PASS, static 12/12 PASS** (2026-11-21)
- [x] Live GitHub Pages deployment verified after merge — HTTP 200, new PIN lock live
- [ ] **Physical-device tap-through: real iPhone (Safari) + one low-end Android (e.g. Vivo Y11)** — PIN keypad, music, scroll, landscape
- [ ] Music playback manually verified on phone (YouTube embed + local MP3 + no overlapping audio)

## Content/design sanity
- [x] OT7 equal representation (V has member card + "Taehyung" role; no exclusivity)
- [x] English/Bangla strings intact
- [x] Reduced-motion paths present
- [ ] Human walkthrough of the visitor journey (emotional check: cute, polished)

## Git hygiene
- [x] No force-pushes, no rewritten shared history
- [x] Every verified task pushed with remote SHA confirmed
- [ ] Tag/release only after the above blocks clear
