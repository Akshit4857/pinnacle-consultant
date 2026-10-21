# Pinnacle Consultant - Careers & Job Application Pipeline

This project contains the complete Pinnacle Consultant web application and the serverless-ready **Careers Portal + Google Sheets CMS + Private Drive Vault + WhatsApp Alerts Pipeline**.

---

## Architecture Overview

```
Candidate Browser
   │
   ├──> GET  /careers         (Public listings, ISR/5-min cache, Google Sheets "Jobs" tab)
   ├──> GET  /careers/:slug   (Full specification, JSON-LD JobPosting schema, live application form)
   └──> POST /api/apply       (Multi-step secure candidate application submission)
          │
          ├── [1] Anti-Spam: Honeypot + Min Time Check (2.5s) + Turnstile Verification
          ├── [2] Security: Zod validation + Rate Limiting (5/hr/IP) + Duplicate check (30-day key)
          ├── [3] File Guard: PDF/DOC/DOCX check + Magic Bytes verification + 5MB Stream limit
          ├── [4] Resume Storage: Uploads to PRIVATE Google Drive folder (UUID renamed)
          ├── [5] Primary CMS Record: Appends RAW row to Google Sheet "Applications" tab
          │     └── (Failover: Enqueues to Upstash Redis retry queue if Sheets API is busy)
          └── [6] Notification: Non-blocking WhatsApp alert dispatched to Owner
```

---

## Google Sheets CMS Setup

### 1. Create Google Service Account
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project (or select an existing one) and enable the **Google Sheets API** and **Google Drive API**.
3. Under **IAM & Admin > Service Accounts**, click **Create Service Account**:
   - Name: `pinnacle-careers-sa`
   - Role: Not required on the GCP project level (permissions are granted directly on the Sheet and Drive folder).
4. Click on the created service account, go to the **Keys** tab, click **Add Key > Create new key > JSON**.
5. Save the downloaded JSON file. You will need:
   - `client_email` -> Set as `GOOGLE_SERVICE_ACCOUNT_EMAIL` in `.env`
   - `private_key` -> Set as `GOOGLE_PRIVATE_KEY` in `.env` (newlines can be represented as `\n`).

### 2. Configure Google Spreadsheet & Permissions
Create a new Google Sheet named **Pinnacle Careers & Applications**:
1. Rename the first tab to **`Jobs`**.
2. Create a second tab named **`Applications`**.
3. Share the Google Sheet:
   - Click **Share** in the top right.
   - Enter your service account email (`pinnacle-careers-sa@...iam.gserviceaccount.com`).
   - For **Jobs** tab: Read-only access is used by the server (`spreadsheets.readonly`).
   - For **Applications** tab: Set permission to **Editor** so the server can append candidate rows.
4. Copy the Sheet ID from your browser address bar:
   `https://docs.google.com/spreadsheets/d/<GOOGLE_SHEET_ID>/edit`

---

## Sample "Jobs" Sheet Template

Add the following columns to Row 1 of your **`Jobs`** tab:

| Column Header | Type | Description |
|---|---|---|
| `Slug` | Text (`^[a-z0-9-]+$`) | Unique URL identifier (e.g. `ev-infrastructure-maintenance-lead`) |
| `Title` | Text | Position title (e.g. `EV Infrastructure Maintenance Lead`) |
| `Department` | Text | `EV Solutions`, `Manpower Staffing`, `Industrial Automation Solutions`, `Market Research` |
| `Location` | Text | e.g. `Gurugram / Delhi NCR` |
| `JobType` | Text | `Full-time`, `Part-time`, `Internship`, `Contract` |
| `WorkMode` | Text | `On-site`, `Remote`, `Hybrid` |
| `Experience` | Text | e.g. `3 - 6 Years` |
| `SalaryRange` | Text (Optional) | e.g. `₹8,00,000 - ₹12,00,000 / annum` |
| `Openings` | Number | e.g. `2` |
| `Description` | Text | Full role summary and purpose |
| `Responsibilities`| Multi-line / Bullet list | Key duties (separated by newlines or bullets) |
| `Requirements` | Multi-line / Bullet list | Candidate qualifications and background |
| `Skills` | Comma-separated | e.g. `EVSE, OCPP Protocols, DC Fast Charging, Electrical Safety` |
| `Benefits` | Multi-line / Bullet list | Healthcare, incentives, flexibility |
| `PostedDate` | Date (`YYYY-MM-DD`) | Date posted (e.g. `2026-10-18`) |
| `LastDateToApply`| Date (`YYYY-MM-DD`) (Optional) | Expiry cutoff (rows past this date are hidden) |
| `Status` | Text | `Active` or `Inactive` |

### Two Example Rows for Google Sheets:

#### Example Row 1:
- **Slug**: `ev-infrastructure-maintenance-lead`
- **Title**: `EV Infrastructure Maintenance Lead`
- **Department**: `EV Solutions`
- **Location**: `Gurugram / Delhi NCR`
- **JobType**: `Full-time`
- **WorkMode**: `On-site`
- **Experience**: `3 - 6 Years`
- **SalaryRange**: `₹8,00,000 - ₹12,00,000 / annum`
- **Openings**: `2`
- **Description**: `We are seeking an experienced EV Charging Infrastructure Specialist to lead field diagnostic, preventive AMC maintenance, and uptime monitoring for commercial fleet charging hubs across North India.`
- **Responsibilities**: `Manage on-site preventive maintenance and power audits for DC fast chargers.\nOversee roving field technician deployments and SLA adherence across transit corridors.\nInterface with OEM partners and utility grid engineers for load balancing.\nMaintain statutory compliance and safety documentation.`
- **Requirements**: `B.Tech / Diploma in Electrical or Electronics Engineering.\n3+ years experience in EVSE charging stations, power electronics, or substation maintenance.\nDeep understanding of CCS2, GB/T, and OCPP 1.6/2.0 protocols.\nDemonstrated ability to manage field engineering squads.`
- **Skills**: `EVSE, OCPP Protocols, DC Fast Charging, Electrical Safety, Preventive Maintenance`
- **Benefits**: `Competitive compensation with performance bonuses\nComprehensive family medical insurance\nField travel allowances and mobile provisioning\nDirect interaction with EV sector founders`
- **PostedDate**: `2026-10-18`
- **LastDateToApply**: `2026-12-31`
- **Status**: `Active`

#### Example Row 2:
- **Slug**: `senior-talent-acquisition-partner-corporate`
- **Title**: `Senior Talent Acquisition Partner - Corporate Staffing`
- **Department**: `Manpower Staffing`
- **Location**: `Gurugram (Hybrid)`
- **JobType**: `Full-time`
- **WorkMode**: `Hybrid`
- **Experience**: `4 - 7 Years`
- **SalaryRange**: `₹7,50,000 - ₹11,00,000 / annum`
- **Openings**: `3`
- **Description**: `Lead lateral and executive recruitment mandates across automotive, EV engineering, and factory automation sectors for Pinnacle's enterprise clientele.`
- **Responsibilities**: `Own end-to-end recruitment mandates from client intake through candidate onboarding.\nDrive active talent pipelining across Tier-1 automotive and clean-tech manufacturing.\nConduct structured preliminary interviews and compensation benchmarking.\nMeet client SLAs with 48-72h candidate profile turnaround.`
- **Requirements**: `Bachelor’s or Master’s in Human Resources or Business Administration.\n4+ years in lateral corporate hiring or contingency search with an agency.\nTrack record of placing plant operations and engineering profiles.\nStrong client stakeholder management.`
- **Skills**: `Corporate Staffing, Executive Search, Talent Pipelining, Salary Benchmarking`
- **Benefits**: `Industry-leading incentive structure on mandate closures\nHybrid work flexibility (3 days office, 2 days remote)\nFast-track career progression to Practice Lead\nHealth insurance and wellness subsidies`
- **PostedDate**: `2026-10-15`
- **LastDateToApply**: `2026-12-31`
- **Status**: `Active`

---

## Private Google Drive Resume Vault Setup

### Why Service Accounts Fail on Personal Drive & The Proven Solutions
On standard personal Google accounts (`@gmail.com`), Google assigns **0 bytes of Drive storage** to service accounts. Attempting to upload files directly using a service account into a personal folder returns:
`"The user's Drive storage quota has been exceeded"`.

We support two approaches that eliminate this issue:

#### Approach A (Recommended for Personal @gmail.com accounts): OAuth 2.0 with Refresh Token
1. In the Google Cloud Console, navigate to **APIs & Services > Credentials**.
2. Click **Create Credentials > OAuth client ID** (Application type: *Web application* or *Desktop app*).
3. Authorize the `https://www.googleapis.com/auth/drive.file` scope.
4. Generate a Refresh Token using Google OAuth Playground or a simple one-time script.
5. In your `.env`:
   ```bash
   GOOGLE_DRIVE_AUTH_TYPE="oauth"
   GOOGLE_CLIENT_ID="your_oauth_client_id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your_oauth_client_secret"
   GOOGLE_REFRESH_TOKEN="your_oauth_refresh_token"
   ```
   *Benefit*: Files are uploaded directly on behalf of your Google Account, utilizing your personal Drive storage quota while remaining 100% private.

#### Approach B (For Google Workspace Domains): Shared Drive
1. If you use Google Workspace, create a **Shared Drive** (e.g. `Pinnacle Candidate Vault`).
2. Add your Service Account email as a **Content Manager**.
3. Create a folder inside it and set `GOOGLE_DRIVE_FOLDER_ID`.
4. In `.env`:
   ```bash
   GOOGLE_DRIVE_AUTH_TYPE="service_account"
   ```
   The pipeline automatically passes `supportsAllDrives: true` so the service account uses the shared domain pool.

---

## WhatsApp Cloud API (Meta) Setup

1. Go to the [Meta for Developers Portal](https://developers.facebook.com/) and register your app.
2. Under **WhatsApp > API Setup**:
   - Note your **Phone number ID** -> `WHATSAPP_PHONE_NUMBER_ID`
   - Generate your **System User Access Token** (Permanent) -> `WHATSAPP_ACCESS_TOKEN`
3. Under **Message Templates**, create a template named `new_job_application` (Language: English US, Category: Utility):
   ```
   New Job Application
   Role: {{1}}
   Name: {{2}}
   Phone: {{3}}
   Email: {{4}}
   Experience: {{5}}
   Resume: {{6}}
   Sheet: {{7}}
   ```
4. Set `OWNER_WHATSAPP_NUMBER="917000081129"` (your WhatsApp number with country code).
5. *Twilio Alternative*: Set `WHATSAPP_PROVIDER="twilio"` and populate the Twilio credentials in `.env`.

---

## Cloudflare Turnstile Setup

1. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Turnstile Sites > Add Site**.
2. Domain: `pinnacleconsultant.co.in` (and `localhost` for testing).
3. Mode: *Managed*.
4. Copy the **Site Key** to `VITE_TURNSTILE_SITE_KEY` and **Secret Key** to `TURNSTILE_SECRET_KEY`.

---

## Upstash Redis Setup (Serverless Rate Limiting & Queue)

1. Create a free Redis database at [Upstash](https://upstash.com/).
2. Copy the REST credentials into `.env`:
   ```bash
   UPSTASH_REDIS_REST_URL="https://your-db.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token"
   ```
3. If not configured, the pipeline automatically falls back gracefully to in-memory rate limiting and local queue storage.

---

## Useful CLI Commands

```bash
# Run automated security & validation test suite (14 checks)
npm run test:security

# List candidate applications in Google Sheet (No web UI)
npm run manage:data list

# Delete candidate application and resume from Drive (GDPR compliance)
npm run manage:data delete candidate@example.com

# Drain retry queue (retry any failed sheet appends)
npm run retry:queue

# Start production server
npm run build && npm start
```
