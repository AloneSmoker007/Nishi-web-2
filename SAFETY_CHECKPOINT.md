# SAFETY_CHECKPOINT.md — for instant resume after interruption

**Updated:** 2026-11-20

## Git state
| Ref | SHA | Note |
|---|---|---|
| `main` (remote) | `cb05a13` | PR #22 (`291e6c2`) + PR #15 (`70b8074`) + PR #23 (`cb05a13`) **all MERGED 2026-11-21**; CI green; Pages deployed & verified |
| `fix/pin-and-full-site-regression` | `cad832a` | previous Mimo's work; integration pending (NEXT_TASK.md) |

## Working copies
- Main clone: `/home/work/.openclaw/workspace/Nishi-Purple-Universe` (branch: `fix/iphone-pin-keypad-touch-input`)
- PR #15 worktree: `/home/work/.openclaw/workspace/.openclaw/tmp/npu-playful` (branch: `feat/nishi-playful-mix-experience`)
- Playwright browsers + deps: `/home/work/.openclaw/workspace/.openclaw/tmp/pw-browsers` (env: `PLAYWRIGHT_BROWSERS_PATH`, `PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1`, WebKit needs `EGL_PLATFORM=surfaceless`, `GALLIUM_DRIVER=llvmpipe`, `__EGL_VENDOR_LIBRARY_FILENAMES=$TMP/50_mesa_abs.json`, `VK_ICD_FILENAMES=$TMP/lvp_abs.json`, `LIBGL_DRIVERS_PATH=$TMP/sysroot/usr/lib/x86_64-linux-gnu/dri`)

## Done this session
1. Pushed PR #22 (was blocked on `workflow` scope; authorized via device flow).
2. Root-caused + fixed PR #15 `#joy-arcade` timeout (missing section wrapper on old base + config comma + test-order); merged main into branch; pure-additive diff (192+/0−); pushed `b811c8a`.
3. Closed PRs #7/#8 as superseded with commit-level evidence comments.
4. Handover docs written and merged (PR #23).
5. **2026-11-21: merged #22 → `291e6c2`, #15 → `70b8074`, #23 → `cb05a13` (user-authorized).** Post-merge verification on main: PIN suite 6/6, smoke 4/4, static 12/12, CI green, live site verified. One CI flake on intermediate commit `291e6c2` (reload wait 5s under runner load) — same code green on `94ce286` and `cb05a13`; reload wait hardened to 10s.

## In flight when interrupted
- Background smoke re-run on `b811c8a` (final tree) → `playful-smoke4.log` (session sharp-tidepool).
- CI for `feat/nishi-playful-mix-experience` push.

## Exact next action
1. Integration branch: port `fix/pin-and-full-site-regression`'s valuable work (intro fade click-through, stable PIN status height, deferred 3D boot) onto current main; re-verify with both suites; PR + merge.
2. Physical-device tap-through request (real iPhone + low-end Android).
3. Then release items in RELEASE_CHECKLIST.md.
