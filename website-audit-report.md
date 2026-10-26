# Website Audit Report — Pinnacle Consultant

- **Date:** 2026-10-27
- **Site:** https://www.pinnacleconsultant.co.in
- **Stack:** Vite 6 · React 19 · TypeScript · Tailwind v4 · Express (dev) · Vercel serverless (`api/`) · Google Apps Script backend
- **Method:** Full source-code inspection of all 12 routes, shared components, server modules, and serverless functions. Findings verified against the code at commit time. Runtime checks were performed against a local Vite dev server (all routes + API endpoints); production metrics were not re-measured in this pass — the earlier lab measurements in `performance-audit.md` remain the reference for bundle/media numbers.

---

## 1. Route Inventory

| Route | Page | Lazy-loaded | ogImage | JSON-LD schema | Internal links |
|---|---|---|---|---|---|
| `/` | Home | No (eager LCP) | ✔ (default) | ✔ | ✔ |
| `/staffing` | Staffing | ✔ | ✔ | ✔ | ✔ |
| `/tech-ev` | TechEv | ✔ | ✔ | ✔ | ✔ |
| `/industry-4-0` | Industry40 | ✔ | ✔ (added this pass) | ✔ | ✔ (added this pass) |
| `/market-research` | MarketResearch | ✔ | ✔ | ✔ | ✔ |
| `/impact` | Impact | ✔ | ✔ | ✔ | ✔ |
| `/about` | About | ✔ | ✔ | ✔ | ✔ |
| `/careers` | Careers | ✔ | ✔ | ✔ (ItemList) | ✔ |
| `/careers/:slug` | JobDetail | ✔ | ✔ | ✔ (JobPosting) | ✔ |
| `/contact` | Contact | ✔ | ✔ (added this pass) | ✔ (added this pass) | ✔ |
| `/faq` | Faq | ✔ | ✔ | ✔ | ✔ |
| `/privacy` | Privacy | ✔ | ✔ | ✔ | ✔ |

`/api/*` is excluded by `vercel.json` rewrites and handled by serverless functions.

---

## 2. P0 — Lead Loss (Fixed)

### 2.1 Contact form and Industry 4.0 form were fake
Both forms performed client-side validation and showed a success state **without ever sending data anywhere**. Every contact lead and Industry 4.0 inquiry was silently dropped.

**Fix:** New end-to-end inquiry pipeline:
- `server/routes.ts` — `POST /api/inquiry` (zod validation via `inquirySchema`, honeypot, namespaced IP rate limit, 400/429/502/500 responses).
- `server/google.ts` — `appendInquiryRow()` writes to a new **Inquiries** tab.
- `scripts/AppsScript.gs` — `appendInquiry` action + `setupSheet` now creates the Inquiries tab (Timestamp, Source, Name, Company, Email, Phone, Service Interest, Budget Range, Message, Status).
- `api/inquiry.ts` — serverless mirror with the same protections (security headers, honeypot, rate limit, zod).
- `src/pages/Contact.tsx` — wired to `/api/inquiry` (`source: 'contact'`), controlled inputs, loading state, `role="alert"` error, focus-managed success state.
- `src/pages/Industry40.tsx` — wired to `/api/inquiry` (`source: 'industry-4-0'`, includes selected service/budget).
- `src/components/BrochureModal.tsx` — was purely decorative; now submits to `/api/inquiry` (`source: 'corporate-deck'`) with truthful copy.

> **Action required:** Redeploy the Apps Script web app so the `appendInquiry` action is live. Without `GOOGLE_APPS_SCRIPT_URL` configured on Vercel, inquiries are logged to the server console only (deliberate degraded mode, same as the apply pipeline).

### 2.2 `/api/apply` lacked the security parity of the Express dev route
The serverless apply handler was missing rate limiting, honeypot, min-submit-time, Turnstile, zod validation, magic-byte file checks, job-exists check, duplicate check, and masked logging.

**Fix:** `api/apply.ts` rewritten to reuse the shared modules (`server/security.ts`, `server/google.ts`, `server/config.ts`, `server/queue.ts`, `server/whatsapp.ts`) with full parity. Also fixed a `agreedToPrivacy === 'true'` type error and kept `export const config = { api: { bodyParser: false } }` (busboy streams the multipart body) with the imported Express config aliased as `appConfig` to avoid collision.

---

## 3. P1 — Accessibility (Fixed)

| Issue | Location | Fix |
|---|---|---|
| Icon-only close buttons had no accessible name | Staffing / TechEv / MarketResearch drawers | `aria-label="Close …"` added |
| Slide-out drawers had no dialog semantics | Staffing / TechEv / MarketResearch | `role="dialog"`, `aria-modal="true"`, `aria-label` |
| FAQ accordion button killed focus outline (`focus:outline-none` with no replacement) | `Faq.tsx` | Replaced with `focus-visible:outline-2 … outline-brand-light` |
| Home "Execution Runway" cards were click-only divs (no keyboard access) | `Home.tsx` | `role="button"`, `tabIndex={0}`, Enter/Space handlers, `aria-pressed` |
| About vision tabs had no keyboard support | `About.tsx` | Roving `tabIndex` + ArrowLeft/ArrowRight navigation on the `tablist` |
| Range slider had no accessible name | `TechEv.tsx` charging-bay calculator | `aria-label="Number of planned charging bays"` |
| Stage-filter buttons had no pressed state | `Industry40.tsx` | `aria-pressed` |
| Filtered-out Industry 4.0 cards stayed in the a11y tree | `Industry40.tsx` | `inert` on non-matching `TiltCard`s |
| `target="_blank"` Privacy link missing `rel` | `JobDetail.tsx` | `rel="noopener noreferrer"` |
| Careers had no error/retry UI — a failed jobs fetch looked like "no openings" | `Careers.tsx` | `loadError` state + retry button + mailto fallback; filter option lists deduped via `Set` seeds (no duplicate `<option>` values) |
| JobDetail load failure displayed the false message "Position No Longer Accepting Applications" | `JobDetail.tsx` | Dedicated network-error state with retry + careers fallback, distinct from 404/expired |
| `errorMsg` was set but never rendered | `JobDetail.tsx` | Rendered in the new error state |
| Route-change loader spinner used non-existent `border-brand-teal` (invisible spinner) | `App.tsx` | `border-brand-light` |
| Copy-to-clipboard `<div>`s weren't focusable/announced | `Contact.tsx` | Converted to `<button>`s with `aria-label`s and clipboard-promise handling (done in prior pass, verified) |
| Motion ignored `prefers-reduced-motion` globally | App-wide | `<MotionConfig reducedMotion="user">` in `App.tsx`; `TiltCard`/`Magnetic`/`WordReveal`/`FloatingOrb` additionally guard their JS/CSS-driven behaviors with `useReducedMotion` |

---

## 4. P1 — SEO (Fixed)

- **Keywords meta leaked across routes:** `SEO.tsx` only set `keywords` when a page provided one, so a keywords tag from a previous route persisted. Now removed when absent.
- **Schema script churn:** the JSON-LD effect depended on the `schema` object identity (a fresh literal every render). Now keyed on `JSON.stringify(schema)`.
- **Font double-load:** Google Fonts was fetched twice — `index.html` `<link rel=stylesheet>` **and** `@import url(...)` in `index.css`. The CSS import was removed (preconnect + link in HTML kept).
- **Industry 4.0 had zero internal links** — added related-service links (tech-ev, staffing, market-research, contact) to its CTA section.
- **Contact and Industry 4.0** gained page-specific `ogImage` + JSON-LD.
- **Sitemap** `lastmod` refreshed to 2026-10-27 across all URLs.

Remaining (known, not blocking): `/industry-4-0` and `/market-research` theme mappings intentionally stay on the `prime` palette; changing them is a brand decision, not a bug.

---

## 5. P1 — Performance / Architecture (Fixed)

- **Duplicate serverless job logic:** `api/jobs.ts`, `api/job-detail.ts`, `api/jobs/[slug].ts` contained ~360 lines duplicated from `server/google.ts` (without its 5-minute cache and HTML-entity sanitization). All three are now thin wrappers around `getActiveJobs`/`getActiveJobBySlug` and send `Cache-Control: public, s-maxage=60, stale-while-revalidate=240`.
- **`api/ping.ts`** gained security headers + `s-maxage=60`.
- **Vercel constraint respected:** shared code lives in `server/` because every `.ts` under `api/` is deployed as a function (helper-only files fail the build).
- **`willChange: 'transform'` permanently applied** to every `FloatingOrb` — removed (was forcing compositing layers on decorative blur orbs for the entire session lifetime).
- **Motion component hygiene:** `TiltCard` dropped its dead `key?: any` prop and now caches the `(pointer: coarse)` media-query lookup at module scope instead of calling `matchMedia` on every mousemove; `WordReveal` splits on `/\s+/` instead of single spaces.

---

## 6. Dead Code Removed

| Item | Evidence |
|---|---|
| `src/lib/lenis.ts` | Zero imports anywhere — deleted |
| `src/lib/themes.ts` slimmed to `export type ThemeId` | `THEMES`, `Theme`, `ThemeMode`, `THEME_MIGRATION`, `migrateThemeId`, `THEME_STORAGE_KEY`, `MODE_STORAGE_KEY`, `DEFAULT_THEME` had zero consumers |
| Dark-mode CSS (`[data-theme=…][data-mode="dark"]` ×5 + `[data-mode="dark"] .img-crisp`) | No code ever sets `data-mode` |
| `.img-crisp`, `.bg-dots-dark`, `.animate-float-slow`, `.btn-secondary`, `.btn-outline`, `.btn-sm`, `.btn-icon` | Zero markup usage (`btn`, `btn-primary`, `btn-ghost` retained — verified used) |
| Unused lucide imports (22 across 8 files) | Verified identifier-by-identifier; `type LucideIcon` in `VerticalSwitcher` retained (used as a type) |
| Dead `HeaderProps`/`BrochureModal`/`AnimatePresence` path in `Layout.tsx` | Removed in prior pass, verified |

**Dependencies removed** from `package.json` (all verified zero-import): `@google/genai`, `framer-motion` (code imports `motion/react`), `react-use-measure`, `lenis`, `googleapis`, `docx`, `autoprefixer`. **Added:** `busboy ^1.6.0` (was an undeclared transitive dependency that `api/apply.ts` imports directly).

---

## 7. Verification Performed

| Check | Result |
|---|---|
| `npm run lint` (`tsc --noEmit`) | Pass |
| `npm run build` | Pass — 1.84 s; CSS 97.11 kB (15.54 kB gzip), down from ~100 kB after dead-CSS removal |
| Dev server, all 12 routes | HTTP 200 |
| `GET /api/jobs` | 200 `{"success":true,"data":[]}` (no sheet env locally) |
| `GET /api/jobs/:slug` valid shape, unknown slug | 404 (correct) |
| `GET /api/jobs/BAD SLUG!` | 400 (slug regex works) |
| `POST /api/inquiry` honeypot | 200 fake-success (standard bot-quiet behavior; not persisted) |
| `POST /api/inquiry` valid payload | 200 (locally log-only; persists once Apps Script env is set) |
| `POST /api/inquiry` invalid email | 400 |
| `POST /api/apply` empty body | 400 |

**Not verified in this pass:** production Lighthouse/Core Web Vitals (the earlier lab measurements in `performance-audit.md` stand); real Google Apps Script append (requires the user to redeploy); Upstash rate-limit path (memory fallback used locally).

---

## 8. Recommended Next Steps (Not Done)

1. **Redeploy the Apps Script web app** and confirm the Inquiries tab receives a row.
2. Set `GOOGLE_APPS_SCRIPT_URL` + `GOOGLE_APPS_SCRIPT_SECRET` on Vercel; consider an alert (e.g., WhatsApp/webhook) on inquiry failures so lead loss is never silent again.
3. Add a honeypot/`inert` guard review when drawers gain focus-trap (currently dialog semantics without a full focus trap — Escape-to-close is present on the brochure modal only).
4. Consider route-level `og:image` dimensions (1200×630) baked into each page's chosen image.
5. The 429 kB vendor chunk (137 kB gzip) is dominated by `react-dom` + `motion` + `lucide-react`; further gains would need lucide per-icon import auditing or an icon shimming layer — low priority.
