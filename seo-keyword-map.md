# SEO & Keyword Map — Pinnacle Consultant

- **Date:** 2026-10-27
- **Scope:** On-page titles, meta descriptions, keywords, canonical URLs, structured data, and internal-link structure for all 12 routes. Keywords listed below are the ones **actually present in the code** (`<SEO>` props) — not aspirational targets.

---

## 1. Technical SEO Baseline (Verified in Source)

| Signal | State |
|---|---|
| `robots.txt` | Present (`public/robots.txt`) |
| `sitemap.xml` | Present, all 11 public URLs, `lastmod` refreshed to 2026-10-27 |
| Canonical link | Set per-route by `SEO.tsx`; static fallback in `index.html` |
| `<html lang>` | `en` |
| Meta description | Static in `index.html` + per-route override via `SEO.tsx` |
| Open Graph | `og:title/description/url/image` + `site_name` + image dimensions (1200×630) in `index.html`; per-route `og:title/description/url/image` via `SEO.tsx` |
| Twitter Cards | `summary_large_image` + title/description/image |
| LCP preload | `/images/hero_consulting_meeting.jpg` preloaded with `fetchpriority="high"` |
| JSON-LD (static) | `ConsultingService` org schema in `index.html` |
| JSON-LD (dynamic) | Per-route injection by `SEO.tsx`, now keyed on `JSON.stringify(schema)` (fixes re-injection churn) |
| Keywords meta | Per-route; **stale-keywords leak fixed this pass** (removed when a route omits keywords) |
| Hreflang | Not implemented (single-locale site — acceptable) |
| `noindex` | Not used anywhere (all routes indexable — intended) |

---

## 2. Keyword Map by Route

### `/` — Home (priority 1.0)
- **Title:** Pinnacle Consultant | Industrial Staffing & Clean Mobility Solutions
- **Primary keywords:** manpower staffing India, contract staffing EV sector, EV charging infrastructure consultants, Industry 4.0 consulting India, smart factory IoT, market research reports, Pinnacle Consultant Gurugram
- **Intent:** Brand + combined practice-area head terms
- **Internal links out:** All four practice pages, impact, about, careers, contact

### `/staffing` — Manpower Staffing (0.9)
- **Title:** Specialized Technical Staffing & Workforce Solutions | Pinnacle Consultant
- **Primary keywords:** contract staffing India, EV technician hiring, IT staffing Gurugram, technical workforce solutions, labor compliance outsourcing, high-volume recruitment
- **Schema:** Staffing-specific JSON-LD
- **Intent:** Commercial — "hire contract staff"

### `/tech-ev` — EV Infrastructure & AMC (0.9)
- **Title:** EV Charging Infrastructure EPC & AMC Services | Pinnacle Consultant
- **Primary keywords:** EV charging EPC India, charger maintenance AMC, DISCOM load sanction EV, EV charging station installation, CPO network operations, EV charging hub Gurugram
- **Schema:** Service JSON-LD
- **Intent:** Commercial — "EV charging rollout partner"

### `/industry-4-0` — Industry 4.0 (0.8)
- **Title:** Industry 4.0 Automation & Smart Factory Integration | Pinnacle Consultant
- **Primary keywords:** Industry 4.0 consulting India, smart factory IoT, PLC SCADA automation, predictive maintenance manufacturing, factory automation Gurugram
- **Schema:** Service JSON-LD · **ogImage:** industry_robotics_hero.jpg
- **Internal links:** Added this pass (tech-ev, staffing, market-research, contact) — page previously had zero internal links.

### `/market-research` — Market Research (0.8)
- **Title:** Industrial Market Research & EV Feasibility Studies | Pinnacle Consultant
- **Primary keywords:** EV feasibility study India, industrial market research, charging station traffic audit, clean mobility market intelligence, B2B fleet electrification analysis
- **Schema:** Service JSON-LD

### `/impact` — Case Studies (0.8)
- **Title:** Client Impact & Case Studies | Pinnacle Consultant
- **Primary keywords:** Pinnacle Consultant case studies, EV rollout success stories, enterprise staffing case study, charger maintenance track record
- **Note:** No JSON-LD; client names (Hero MotoCorp, Ather, Magenta) carried in copy — do **not** add unsupported schema claims.

### `/about` — Leadership (0.8)
- **Title:** About Us & Leadership Team | Pinnacle Consultant
- **Primary keywords:** Pinnacle Consultant founders, Shikha Gupta workforce strategist, Ashu Gupta EV infrastructure, Pinnacle leadership team Gurugram
- **Schema:** About/Person JSON-LD

### `/careers` — Openings (0.8)
- **Title:** Careers & Current Openings | Pinnacle Consultant
- **Primary keywords:** careers Pinnacle Consultant, EV engineering jobs, technical staffing jobs Gurugram, high-voltage technician jobs
- **Schema:** ItemList of JobPosting (dynamic from `/api/jobs`)

### `/careers/:slug` — Job Detail
- **Title:** `{job.title} | Careers at Pinnacle Consultant` (dynamic)
- **Description:** First 130 chars of the job description (dynamic)
- **Schema:** full `JobPosting` (title, datePosted, validThrough, employmentType, hiringOrganization, jobLocation, TELECOMMUTE flag for remote)

### `/contact` — Contact (0.7)
- **Title:** Contact Us | Pinnacle Consultant Gurugram
- **Primary keywords:** contact Pinnacle Consultant, Gurugram consulting office, EV charging consultants contact, technical staffing inquiry, Pinnacle phone number
- **Schema + ogImage:** Added this pass (ContactPage JSON-LD; about_hero_meeting.jpg)

### `/faq` — FAQ (0.8)
- **Title:** Frequently Asked Questions (FAQ) | Pinnacle Consultant
- **Primary keywords:** Pinnacle Consultant FAQ, staffing turnaround time, EV charging installation timeline, contract labor compliance FAQ, EV AMC SLA
- **Schema:** FAQPage JSON-LD

### `/privacy` — Privacy (0.3)
- **Title:** Privacy Policy & Applicant Data Protection | Pinnacle Consultant
- **Note:** No keywords prop — by design; the new SEO cleanup now removes the previous route's keywords tag on visit.

---

## 3. Keyword Overlap Notes (Actionable)

1. **"Industry 4.0 consulting India" + "smart factory IoT"** appear on both `/` and `/industry-4-0` — intentional (home targets the cluster head; the service page targets it fully). Keep home's mention to one occurrence.
2. **"Pinnacle Consultant Gurugram"** appears on home, staffing, tech-ev, industry-4-0, market-research, about, contact — brand+geo modifier, acceptable at this site size.
3. **Missing head terms** (no page owns them today): "EV charging contractor India", "AMC for EV chargers" (partially covered by tech-ev), "contract staffing company Gurgaon" (spelling variant — consider adding "Gurgaon" once in body copy on `/staffing` since users still search it).
4. **Job pages** generate unlimited thin URLs if old slugs stay resolvable — currently 404/inactive handling is correct (expired jobs show "no longer accepting applications"), and `validThrough` is exposed in JobPosting schema.

---

## 4. What Changed This Pass (SEO)

- Keywords-meta cross-route leak fixed (`SEO.tsx` removes stale tag).
- JSON-LD effect keyed by content, not object identity.
- Google Fonts double-fetch eliminated (one HTML `<link>` remains; CSS `@import` removed).
- Contact + Industry 4.0: page-specific ogImage and JSON-LD added.
- Industry 4.0: first internal links added.
- Sitemap `lastmod` → 2026-10-27.
- Careers: failed job fetch no longer masquerades as an empty (but indexable) listings page without explanation — error state is explicit.

## 5. Recommendations (Not Implemented)

1. Add `og:image:width/height` per dynamic page image (static ones already carry dimensions).
2. Consider adding `BroadcastChannel`-free canonical self-check in `sitemap` generation script (currently hand-maintained XML).
3. Add one body-copy mention of the "Gurgaon" spelling variant on `/staffing` and `/contact`.
4. `JobDetail` could emit `totalCompbase`/`baseSalary` in JobPosting when the sheet provides `salaryRange` — currently omitted (unknown currency structure); add only once the sheet format is confirmed.
