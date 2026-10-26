# Performance Audit (Updated) — Pinnacle Consultant

- **Date:** 2026-10-27
- **Supersedes/addends:** `performance-audit.md` (earlier optimization pass — its route-splitting, image, and caching work remains valid and is **not** repeated here)
- **Method:** Source inspection + local production builds (`npm run build`) and a running dev server. Numbers below are **measured** from this session's builds unless marked as estimates. Production CDN/Lighthouse metrics were not re-run.

---

## 1. What This Pass Changed (Measured)

| Asset | Before this pass | After | Delta |
|---|---|---|---|
| `dist/assets/index-*.css` | ~100 kB | **97.11 kB** (15.54 kB gzip) | −2.9 kB raw from dead-CSS removal (dark-mode blocks, unused utilities, unused button variants) |
| `dist/assets/index-*.js` | 86.83 kB (19.94 gzip) | **89.04 kB** (20.82 gzip) | +2.2 kB — inquiry wiring (Contact, Industry40, BrochureModal), Careers retry/error states, JobDetail error state, a11y handlers |
| `dist/assets/vendor-*.js` | 429 kB (137 gzip) | **429.55 kB** (137.84 gzip) | Unchanged — removed deps were never imported, so they were never in the bundle |
| Full build time | — | **1.84 s** | Healthy |

All 12 route chunks remain lazy-split (only `/` Home is eager). Vendor composition is dominated by `react-dom`, `motion`, and `lucide-react` — no further reduction without icon-layer work (low priority; see §4).

---

## 2. Network-Layer Wins (Not Reflected in Bundle Numbers)

1. **Google Fonts double-fetch eliminated.** The font stylesheet was requested twice: once via `index.html` `<link rel=stylesheet>` (with preconnect) and again via `@import url(...)` at the top of `index.css` (a separate render-blocking request that serialized after Tailwind processed). The CSS import was removed; one preconnected request remains. **Estimated saving:** one full render-blocking round-trip to `fonts.googleapis.com` on every cold load.

2. **Serverless jobs endpoints now cache.** `api/jobs.ts`, `api/job-detail.ts`, `api/jobs/[slug].ts` are thin wrappers over `server/google.ts` and send `Cache-Control: public, s-maxage=60, stale-while-revalidate=240`. Previously each hit called Google Sheets with `no-store`. **Effect:** CDN absorbs repeat `/api/jobs` traffic (the `/careers` page's heaviest call).

3. **~360 lines of duplicated serverless logic deleted** (jobs handlers previously re-implemented fetching/sanitization without the 5-minute in-memory cache that `server/google.ts` provides). Same-or-better behavior, less code to ship per function.

4. **Permanent compositing layers removed.** Every `FloatingOrb` carried `willChange: transform` + `translateZ(0)` for its entire lifetime — forcing a GPU layer per decorative blur orb (dozens per page on dark sections). Now applied only while animating is unnecessary; the CSS keyframe animation handles it without a permanent layer hint. **Effect:** reduced layer count / memory on orb-heavy pages (Home, TechEv, Industry40).

5. **`matchMedia` hoisted out of hot paths.** `TiltCard`/`Magnetic` evaluated `(pointer: coarse)` on every `mousemove`; now cached at module scope. Minor but free.

---

## 3. API Surface (Verified Against Dev Server)

| Endpoint | Behavior verified |
|---|---|
| `GET /api/jobs` | 200, `{success:true,data:[]}` without sheet env (degraded), now cacheable |
| `GET /api/jobs/:slug` (valid, missing) | 404 |
| `GET /api/jobs/BAD SLUG!` | 400 (slug regex rejects early — no Google call) |
| `POST /api/inquiry` honeypot | 200 fake-success (bots not tipped off, nothing persisted) |
| `POST /api/inquiry` valid | 200 (log-only without Apps Script env; persists in prod) |
| `POST /api/inquiry` invalid email | 400 |
| `POST /api/apply` empty | 400 |
| All 12 page routes | HTTP 200 |

---

## 4. Remaining Opportunities (Not Done, Prioritized)

1. **Vendor chunk (429 kB / 137 kB gzip):** lucide-react tree-shakes per named import (verified — unused icons are dropped), so the floor is roughly react-dom (~130 kB raw) + motion (~60 kB raw) + used icons. A custom icon shim would save an estimated 10–20 kB gzip — low ROI.
2. **Home hero image** remains the LCP candidate; it is preloaded + `fetchpriority=high` (from the earlier pass). A WebP/AVIF variant with a JPEG fallback would be the next real LCP lever — requires asset pipeline work.
3. **`api/inquiry.ts` cold start:** zod + busboy imports are shared with `api/apply.ts`; on Vercel these are separate functions, so each pays its own module init. Acceptable at this traffic scale.
4. **`s-maxage=60` on jobs:** could be raised to 300 to match the in-memory cache TTL once sheet-edit latency is confirmed tolerable for recruiters.

---

## 5. Explicitly Out of Scope / Preserved

- Design system, theme palettes (`/industry-4-0` and `/market-research` intentionally remain on `prime`), and motion behavior (now wrapped in `MotionConfig reducedMotion="user"` — a correctness fix, not a visual change for users without the OS setting).
- The earlier pass's image compression, route splitting, and Vercel asset-caching headers (in `vercel.json`) were left untouched.
- The pre-existing root `performance-audit.md` was **not** overwritten; this file is the additive update.
