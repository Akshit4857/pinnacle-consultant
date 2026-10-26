/**
 * Pinnacle Consultant - Applicant Data Management CLI
 *
 * Manages candidate records via the Apps Script web app.
 * No direct Google API credentials needed.
 *
 * Usage:
 *   npx tsx scripts/manage-data.ts list
 *   npx tsx scripts/manage-data.ts delete candidate@example.com
 */
import { config } from '../server/config';

const SCRIPT_URL = config.google.appsScriptUrl;

async function callAppsScript(payload: Record<string, unknown>): Promise<any> {
  if (!SCRIPT_URL) {
    console.error('Error: GOOGLE_APPS_SCRIPT_URL must be set in .env');
    process.exit(1);
  }

  const bodyPayload = {
    ...payload,
    ...(config.google.appsScriptSecret ? { secret: config.google.appsScriptSecret } : {}),
  };

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyPayload),
    redirect: 'follow',
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

async function main() {
  const action = process.argv[2];
  const targetEmail = process.argv[3]?.toLowerCase()?.trim();

  if (!action || !['list', 'delete'].includes(action)) {
    console.log(`
Pinnacle Consultant - Applicant Data Management CLI
====================================================
Commands:
  npx tsx scripts/manage-data.ts list
    List recent applications stored in Google Sheets

  npx tsx scripts/manage-data.ts delete <candidate_email>
    Delete candidate's record from Google Sheets and resume from Drive
`);
    process.exit(0);
  }

  if (action === 'list') {
    console.log('Fetching applications via Apps Script...\n');
    const result = await callAppsScript({ action: 'listApplications' });

    if (!result.success || !Array.isArray(result.data)) {
      console.error('Failed to fetch applications:', result.error || 'Unknown error');
      process.exit(1);
    }

    if (result.data.length === 0) {
      console.log('Applications sheet is empty.');
      return;
    }

    console.log(`Found ${result.data.length} application(s):\n`);
    console.table(
      result.data.map((r: any, i: number) => ({
        Index: i + 1,
        Timestamp: r.Timestamp,
        Role: r['Job Title'],
        Name: r.Name,
        Email: r.Email,
        Phone: r.Phone,
        Status: r.Status,
      }))
    );
  }

  if (action === 'delete') {
    if (!targetEmail) {
      console.error('Please specify the candidate email to delete.');
      process.exit(1);
    }

    console.log(`Deleting all records for: ${targetEmail} ...`);
    const result = await callAppsScript({ action: 'deleteApplication', email: targetEmail });

    if (!result.success) {
      console.error('Deletion failed:', result.error || 'Unknown error');
      process.exit(1);
    }

    console.log(result.message || `Records for ${targetEmail} removed.`);
  }
}

main().catch((err) => {
  console.error('CLI Execution error:', err);
  process.exit(1);
});
