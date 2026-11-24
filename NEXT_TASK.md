# NEXT_TASK.md — exact next action for the next Mimo

**Last updated:** 2026-11-20 (handover audit session)

## Immediate next actions (in order)

1. **Merge approval queue** (ask the human before merging):
   - PR #22 `fix/iphone-pin-keypad-touch-input` — iPhone PIN keypad fix. All checks green.
   - PR #15 `feat/nishi-playful-mix-experience` — playful arcade; root cause fixed 2026-11-20.
2. **Finish integration branch** `fix/integrate-regression-handover` (based on PR #22's branch):
   - Port from `fix/pin-and-full-site-regression`: intro fade click-through, stable PIN status height, deferred 3D boot behind intro (re-verify against current `js/ui.js`), evaluate `tests/webkit-regression.mjs`/stress scripts for unique coverage.
   - Keep PR #22's verified PIN CSS tiers (they cover landscape + desktop; the regression branch's tiers do not).
   - Run `tests/pin-keypad-touch.mjs` + `tests/browser-smoke.mjs` + `validate.yml` static checks before pushing.
3. **After merges:** re-run both suites on `main`, verify the live GitHub Pages deployment, then work through RELEASE_CHECKLIST.md.
4. **Top risk:** no physical-device testing yet — request a real iPhone/Android tap-through from the human.

## Do not

- Do not rebase/force-push any shared branch; merge-based updates only.
- Do not merge PRs without the human's approval.
- Do not weaken test assertions to make CI green.
