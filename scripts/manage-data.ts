import { google } from 'googleapis';
import { config } from '../server/config';

/**
 * Local CLI Script for Manual Candidate Data Management & Deletion
 * NO WEB ROUTE OR ADMIN ENDPOINT EXISTS FOR THIS OPERATION.
 *
 * Usage:
 *   npx tsx scripts/manage-data.ts list
 *   npx tsx scripts/manage-data.ts delete candidate@example.com
 */
async function main() {
  const action = process.argv[2];
  const targetEmail = process.argv[3]?.toLowerCase()?.trim();

  if (!action || !['list', 'delete'].includes(action)) {
    console.log(`
Pinnacle Consultant - Applicant Data Management CLI (No Web UI)
==============================================================
Commands:
  npx tsx scripts/manage-data.ts list
    List recent applications stored in Google Sheets

  npx tsx scripts/manage-data.ts delete <candidate_email>
    Delete candidate's record from Google Sheets and their resume file from Drive
`);
    process.exit(0);
  }

  if (!config.google.serviceAccountEmail || !config.google.sheetId) {
    console.error('Error: GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SHEET_ID must be set in .env');
    process.exit(1);
  }

  const auth = new google.auth.JWT({
    email: config.google.serviceAccountEmail,
    key: config.google.privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const drive = google.drive({ version: 'v3', auth });

  const tabName = config.google.applicationsTabName;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: config.google.sheetId,
    range: `${tabName}!A:M`,
  });

  const rows = res.data.values || [];
  if (rows.length <= 1) {
    console.log('Applications sheet is empty.');
    return;
  }

  if (action === 'list') {
    console.log(`\nFound ${rows.length - 1} application(s):`);
    console.table(
      rows.slice(1).map((r, i) => ({
        Index: i + 1,
        Timestamp: r[0],
        Role: r[1],
        Name: r[3],
        Email: r[4],
        Phone: r[5],
        Status: r[11],
      }))
    );
    return;
  }

  if (action === 'delete') {
    if (!targetEmail) {
      console.error('Please specify the candidate email to delete.');
      process.exit(1);
    }

    console.log(`Searching for records matching: ${targetEmail}...`);
    let deletedCount = 0;

    // Scan for matching rows
    for (let i = rows.length - 1; i >= 1; i--) {
      const row = rows[i];
      const emailInRow = String(row[4] || '').toLowerCase().trim();

      if (emailInRow === targetEmail) {
        const resumeLink = String(row[10] || '');
        const fileIdMatch = resumeLink.match(/\/d\/([a-zA-Z0-9_-]+)/);

        // Delete from Drive if file ID extracted
        if (fileIdMatch && fileIdMatch[1]) {
          const fileId = fileIdMatch[1];
          try {
            await drive.files.delete({ fileId, supportsAllDrives: true });
            console.log(`Deleted Drive resume file: ${fileId}`);
          } catch (driveErr: any) {
            console.warn(`Drive file deletion notice (${fileId}):`, driveErr?.message || driveErr);
          }
        }

        // Blank out or delete row
        await sheets.spreadsheets.values.clear({
          spreadsheetId: config.google.sheetId,
          range: `${tabName}!A${i + 1}:M${i + 1}`,
        });

        deletedCount++;
        console.log(`Cleared application row #${i + 1} for ${targetEmail}`);
      }
    }

    if (deletedCount === 0) {
      console.log(`No records found for email: ${targetEmail}`);
    } else {
      console.log(`\nSuccessfully removed ${deletedCount} record(s) for ${targetEmail}.`);
    }
  }
}

main().catch((err) => {
  console.error('CLI Execution error:', err);
  process.exit(1);
});
