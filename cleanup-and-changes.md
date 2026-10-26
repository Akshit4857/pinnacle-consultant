# Cleanup & Changes Log — 2026-10-27 Session

Every change made in this session, by file. Baseline: clean `main`; lint (`tsc --noEmit`) and build both passed before any edits. Final state: lint ✓, build ✓ (1.84 s), all 12 routes 200, API endpoints verified against dev server.

**Net:** 37 files changed, ~1,075 insertions, ~1,800 deletions (+ new `api/inquiry.ts` and 4 report files).

---

## Backend / Serverless

### `scripts/AppsScript.gs`
- Added `INQUIRIES_TAB = 'Inquiries'` and `appendInquiry` action + handler (columns: Timestamp, Source, Name, Company, Email, Phone, Service Interest, Budget Range, Message, Status).
- `setupSheet` now also creates the Inquiries tab.
- **User action required:** redeploy the Apps Script web app.

### `server/security.ts`
- Added `inquirySchema` (zod) for the new inquiry endpoint.
- Generalized `checkRateLimit(clientIp, namespace = 'ratelimit')` so inquiries get their own `'inquiry'` bucket (previously apply-only, hardcoded key).

### `server/google.ts`
- Added `appendInquiryRow()` — posts `appendInquiry` to Apps Script; log-only + success when `GOOGLE_APPS_SCRIPT_URL` is unset (matches apply-pipeline degraded mode).
- `getActiveJobs` / `getActiveJobBySlug` (5-minute cache + sanitization) are now the single source used by both Express and serverless.

### `server/routes.ts`
- Added `POST /api/inquiry`: honeypot → rate limit (`'inquiry'`) → zod → `appendInquiryRow` → 200/400/429/502/500 with masked-email logging.
- `/api/jobs` + `/api/jobs/:slug`: `no-store` → `Cache-Control: public, s-maxage=60, stale-while-revalidate=240`.

### `api/inquiry.ts` (new)
- Serverless inquiry handler: security headers, method check, honeypot, rate limit, zod, `appendInquiryRow`. Shares logic via `../server/*` imports (Vercel treats every `api/*.ts` as a function, so helpers must live outside `api/`).

### `api/apply.ts` (rewritten)
- Full security parity with the Express route: rate limit, honeypot, min-submit-time, Turnstile, zod, magic-byte file validation, job-exists check, duplicate check, Drive upload, sheet append + retry queue, non-blocking WhatsApp, masked logging.
- Keeps `export const config = { api: { bodyParser: false } }`; imported Express config aliased `appConfig`; fixed `agreedToPrivacy === 'true'` TS error.

### `api/jobs.ts`, `api/job-detail.ts`, `api/jobs/[slug].ts` (rewritten)
- Thin wrappers over `server/google.ts` (deduplicates ~360 lines, gains the 5-min cache + sanitization). Added security headers + `s-maxage=60`. Slug regex `^[a-z0-9-]+$` → 400 on invalid.

### `api/ping.ts`
- Security headers + `max-age=60`.

### `package.json` / lockfile
- **Removed (all verified zero-import):** `@google/genai`, `framer-motion`, `react-use-measure`, `lenis`, `googleapis`, `docx`, `autoprefixer`.
- **Added:** `busboy ^1.6.0` (was an undeclared transitive dep that `api/apply.ts` imports directly).

---

## Frontend — Forms & Lead Flow (P0)

### `src/pages/Contact.tsx`
- Wired to `POST /api/inquiry` (`source: 'contact'`): controlled inputs, ids/htmlFor, autoComplete, `Loader2` loading state, `role="alert"` error, focus-managed `role="status"` success.
- Clipboard `<div>`s → `<button>`s with aria-labels, promise handling, unmount cleanup; FAQ `aria-expanded`/`aria-controls`; h4→h3; `CONTACT_FAQS`, `PRACTICE_AREAS`, `contactSchema` hoisted to module scope; SEO gains `ogImage` + `contactSchema`; removed unused `Zap`/`ArrowUpRight` imports.

### `src/pages/Industry40.tsx`
- Form wired to `/api/inquiry` (`source: 'industry-4-0'`, includes selected service/budget), loading/error/success states, controlled inputs + labels, `aria-pressed` on service/budget/stage buttons, `role="group"`, `inert` on filter-dimmed cards, `scrollToSection` respects `prefers-reduced-motion`, hero img gains width/height/`fetchPriority="high"`/`decoding="async"`/`aria-hidden alt=""`, SEO gains ogImage (`industry_robotics_hero.jpg`) + schema, **first internal links added** (tech-ev, staffing, market-research, contact in the CTA).
- Removed dead `activeCategory`/`selectedData` state, unused `X` import; `industrySchema` hoisted to module scope.

### `src/components/BrochureModal.tsx` (rewritten)
- Was purely decorative. Now real `POST /api/inquiry` (`source: 'corporate-deck'`) with truthful copy ("Our team will email the corporate profile"), `role="dialog"`/`aria-modal`/`aria-labelledby`, Escape-to-close, body scroll lock, focus restore, labeled inputs, loading/error/success.

### `src/components/Layout.tsx` / `src/components/Header.tsx`
- Removed dead `BrochureModal`/`AnimatePresence` path and `HeaderProps`/`onOpenBrochure` prop; Header dropdown gains Escape + focus-out close.

---

## Frontend — Accessibility (P1)

### `src/App.tsx`
- Wrapped app in `<MotionConfig reducedMotion="user">` (global reduced-motion correctness).
- Fixed invisible route-loader spinner (`border-brand-teal` doesn't exist → `border-brand-light`).

### `src/components/motion/TiltCard.tsx`
- Added `inert` prop pass-through; `useReducedMotion` guard on tilt handlers; removed dead `key?: any`; `(pointer: coarse)` media query cached at module scope.

### `src/components/motion/Magnetic.tsx`
- `useReducedMotion` guard; coarse-pointer check cached at module scope.

### `src/components/motion/FloatingOrb.tsx`
- Removed permanent `willChange: transform` + `translateZ(0)` (forced compositing layer per orb for page lifetime); skips the float animation under reduced motion.

### `src/components/motion/WordReveal.tsx`
- Splits on `/\s+/` (was `split(' ')`, which broke on double spaces); renders plain text under reduced motion.

### `src/pages/Home.tsx`
- Execution Runway cards: `role="button"`, `tabIndex={0}`, Enter/Space handlers, `aria-pressed`. Removed unused `Award` import.

### `src/pages/About.tsx`
- Vision tabs: roving `tabIndex` + ArrowLeft/ArrowRight navigation on the tablist.

### `src/pages/Faq.tsx`
- Accordion button: `focus:outline-none` (with no replacement) → `focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-light`.

### `src/pages/Staffing.tsx` / `TechEv.tsx` / `MarketResearch.tsx`
- All three drawers: `role="dialog"`, `aria-modal="true"`, `aria-label`; close buttons get `aria-label="Close …"`.
- TechEv range slider: `aria-label="Number of planned charging bays"` (Staffing's already had one).
- Unused lucide imports removed (Staffing: Briefcase/UserCheck/FileText; MarketResearch: FileText/TrendingUp/Target/Download; Impact: Zap/Users/Wrench/Layers).

### `src/pages/Careers.tsx`
- New `loadError` + `reloadKey` states with retry button, `role="alert"`, and mailto fallback — a failed fetch no longer looks like "no openings".
- Filter option lists seeded from `Set`s (no duplicate `<option>` values when sheet data overlaps hardcoded defaults).

### `src/pages/JobDetail.tsx`
- `target="_blank"` Privacy link gains `rel="noopener noreferrer"`.
- Network-load failures now render a dedicated error state (retry + careers fallback + mailto) instead of the false "Position No Longer Accepting Applications" 404 state; `errorMsg` is finally displayed.
- Unused lucide imports removed (Clock/Building/CheckCircle2/FileText).

### `src/pages/Privacy.tsx` / `src/components/CompanyLogos.tsx`
- Unused lucide imports removed.

---

## Frontend — SEO & CSS

### `src/components/SEO.tsx`
- Stale keywords leak fixed: removes the `keywords` meta when a route doesn't provide one.
- JSON-LD effect now keyed on `JSON.stringify(schema)` (was object identity → re-injected every render).

### `src/index.css`
- Removed duplicate font `@import` (HTML `<link>` with preconnect is the single source).
- Removed dead CSS: `.img-crisp` + dark variant, all five `[data-theme=…][data-mode="dark"]` blocks (nothing sets `data-mode`), `.bg-dots-dark`, `.animate-float-slow` (+ its `float` keyframes), `.btn-secondary`, `.btn-outline`, `.btn-sm`, `.btn-icon`. Kept `.btn`/`.btn-primary`/`.btn-ghost` (verified used).

### `src/lib/themes.ts`
- Slimmed to `export type ThemeId` — `THEMES`, `Theme`, `ThemeMode`, `THEME_MIGRATION`, `migrateThemeId`, `THEME_STORAGE_KEY`, `MODE_STORAGE_KEY`, `DEFAULT_THEME` all had zero consumers (only `ThemeContext` imports the type).

### `src/lib/lenis.ts`
- Deleted (zero imports).

### `public/sitemap.xml`
- `lastmod` → 2026-10-27 on all 11 URLs.

---

## Reports (New)

| File | Contents |
|---|---|
| `website-audit-report.md` | Full route-by-route audit, P0–P3 findings, what was fixed, verification matrix, next steps |
| `seo-keyword-map.md` | Per-route titles/descriptions/keywords/schema/internal-link map + overlap notes |
| `performance-audit-2026-10-27.md` | Measured before/after for this pass; does **not** overwrite the existing root `performance-audit.md` |
| `cleanup-and-changes.md` | This file |

---

## Verification Summary

| Check | Result |
|---|---|
| `npm run lint` | ✓ (run after every batch; final ✓) |
| `npm run build` | ✓ 1.84 s; CSS 97.11 kB (15.54 gzip) |
| 12 page routes via dev server | all HTTP 200 |
| `/api/jobs` (list, valid slug, bad slug) | 200 / 404 / 400 |
| `/api/inquiry` (honeypot, valid, invalid email) | 200 silent / 200 / 400 |
| `/api/apply` (empty body) | 400 |
| Unused lucide import sweep | clean |

## Not Done / Follow-ups

- Apps Script web app must be **redeployed** for inquiries to persist; set `GOOGLE_APPS_SCRIPT_URL` + `GOOGLE_APPS_SCRIPT_SECRET` on Vercel.
- Production Lighthouse/Core Web Vitals not re-measured.
- Drawer focus-traps (Escape-to-close exists on BrochureModal only).
- Optional: WebP/AVIF hero, `s-maxage` raise on jobs, "Gurgaon" spelling variant in copy.
- Untracked `.github/instructions/okahu.instructions.md` exists locally (not created by this session; left uncommitted).
