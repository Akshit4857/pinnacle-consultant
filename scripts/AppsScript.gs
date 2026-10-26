/**
 * Pinnacle Consultant - Google Apps Script Backend
 *
 * HOW TO DEPLOY (5 minutes):
 * 1. Open your Google Sheet > Extensions > Apps Script
 * 2. Delete all existing code and paste this entire file
 * 3. Update SHEET_ID and DRIVE_FOLDER_ID below
 * 4. Click Deploy > New deployment > Web App
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and paste it in your .env as GOOGLE_APPS_SCRIPT_URL
 *
 * No service account, no JSON keys, no OAuth playground needed.
 */

// ─── CONFIGURATION — update these two values ─────────────────────────────────

/** Google Sheet ID - if left blank or default, it will automatically use the active spreadsheet */
var SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

/** Google Drive folder ID from the URL: /drive/folders/<ID> */
var DRIVE_FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE';

/**
 * OPTIONAL BUT RECOMMENDED SECURITY TOKEN
 * Set a random secret string here and match it in .env as GOOGLE_APPS_SCRIPT_SECRET="your_secret"
 * When set, nobody on the internet can read or delete applications even if they know the script URL!
 */
var API_SECRET = 'YOUR_OPTIONAL_SECRET_KEY';

var JOBS_TAB = 'Jobs';
var APPLICATIONS_TAB = 'Applications';

/** Helper to get Spreadsheet instance */
function getSpreadsheet() {
  if (SHEET_ID && SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID_HERE' && SHEET_ID.trim().length > 10) {
    return SpreadsheetApp.openById(SHEET_ID.trim());
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * 1-CLICK SETUP FUNCTION
 * Run this function once from the Apps Script menu to create both tabs with sample data!
 */
function setupSheet() {
  var ss = getSpreadsheet();

  // 1. Create / reset Jobs Tab
  var jobsSheet = ss.getSheetByName(JOBS_TAB) || ss.insertSheet(JOBS_TAB);
  if (jobsSheet.getLastRow() === 0) {
    var jobHeaders = [
      'Title', 'Department', 'Location', 'JobType', 'WorkMode',
      'Experience', 'SalaryRange', 'Openings', 'LastDateToApply', 'Description', 'Responsibilities',
      'Requirements', 'Skills', 'Benefits', 'Status'
    ];
    jobsSheet.appendRow(jobHeaders);
    jobsSheet.getRange(1, 1, 1, jobHeaders.length)
      .setFontWeight('bold')
      .setBackground('#1e293b')
      .setFontColor('#ffffff');
    jobsSheet.setFrozenRows(1);
  }

  // 2. Create Applications Tab
  var appSheet = ss.getSheetByName(APPLICATIONS_TAB) || ss.insertSheet(APPLICATIONS_TAB);
  if (appSheet.getLastRow() === 0) {
    var appHeaders = [
      'Timestamp', 'Job Title', 'Job Slug', 'Name', 'Email',
      'Phone', 'City', 'Experience', 'LinkedIn/Portfolio',
      'Message', 'Resume Link', 'Status', 'WhatsAppNotified'
    ];
    appSheet.appendRow(appHeaders);
    appSheet.getRange(1, 1, 1, appHeaders.length)
      .setFontWeight('bold')
      .setBackground('#047857')
      .setFontColor('#ffffff');
    appSheet.setFrozenRows(1);
  }

  return { success: true, message: 'Setup completed successfully! Jobs and Applications tabs are ready.' };
}

// ─────────────────────────────────────────────────────────────────────────────

/** Entry point — routes by the "action" field in the POST body */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;

    // Public action: reading active job catalog (jobs are public on the website)
    if (action === 'getJobs') return respond(getJobs());

    // ── SECURITY AUTHENTICATION ───────────────────────────────────────────────
    // Protect sensitive operations (reading applicants, deleting, resetting)
    if (API_SECRET && API_SECRET !== 'YOUR_OPTIONAL_SECRET_KEY') {
      if (!body.secret || body.secret !== API_SECRET) {
        return respond({ success: false, error: 'Unauthorized: Access denied. Invalid API secret.' });
      }
    }

    if (action === 'appendApplication')  return respond(appendApplication(body.data));
    if (action === 'uploadResume')       return respond(uploadResume(body));
    if (action === 'listApplications')   return respond(listApplications());
    if (action === 'deleteApplication')  return respond(deleteApplication(body.email));
    if (action === 'setupSheet')         return respond(setupSheet());

    return respond({ success: false, error: 'Unknown action: ' + action });
  } catch (err) {
    return respond({ success: false, error: String(err) });
  }
}

/** Health-check — open the Web App URL in a browser to confirm it is live */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', app: 'Pinnacle Consultant AppsScript' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── HANDLERS ────────────────────────────────────────────────────────────────

/** Read all rows from the Jobs tab */
function getJobs() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(JOBS_TAB);
  if (!sheet) {
    // If Jobs sheet doesn't exist yet, auto-initialize it
    setupSheet();
    sheet = ss.getSheetByName(JOBS_TAB);
  }
  if (!sheet) return { success: false, error: 'Jobs tab not found' };

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return { success: true, data: [] };

  var headers = data[0].map(function(h) { return String(h).trim(); });
  var rows = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j] !== undefined ? String(row[j]) : '';
    }
    rows.push(obj);
  }

  return { success: true, data: rows };
}

/** Append a candidate application row to the Applications tab */
function appendApplication(data) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(APPLICATIONS_TAB);
  if (!sheet) { sheet = ss.insertSheet(APPLICATIONS_TAB); }

  var HEADERS = [
    'Timestamp', 'Job Title', 'Job Slug', 'Name', 'Email',
    'Phone', 'City', 'Experience', 'LinkedIn/Portfolio',
    'Message', 'Resume Link', 'Status', 'WhatsAppNotified'
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#047857').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  var row = HEADERS.map(function(h) { return data[h] || ''; });
  sheet.appendRow(row);
  return { success: true };
}

/** Upload a base64-encoded resume to the private Drive folder */
function uploadResume(body) {
  var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  var decoded = Utilities.base64Decode(body.base64Content);
  var blob = Utilities.newBlob(decoded, body.mimeType, body.filename);
  var file = folder.createFile(blob);
  file.setDescription('Candidate: ' + body.candidateName + ' | Role: ' + body.jobSlug + ' | Uploaded: ' + new Date().toISOString());
  return {
    success: true,
    fileId: file.getId(),
    webViewLink: 'https://drive.google.com/file/d/' + file.getId() + '/view'
  };
}

/** Return all rows from the Applications tab (used by manage-data.ts CLI) */
function listApplications() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(APPLICATIONS_TAB);
  if (!sheet) return { success: true, data: [] };

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { success: true, data: [] };

  var headers = data[0].map(function(h) { return String(h).trim(); });
  var rows = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j] !== undefined ? String(row[j]) : '';
    }
    // Skip fully-blank rows (cleared by a previous delete)
    if (obj['Email']) rows.push(obj);
  }

  return { success: true, data: rows };
}

/** Clear all rows for the given email + delete the resume file from Drive */
function deleteApplication(email) {
  if (!email) return { success: false, error: 'Email is required' };

  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(APPLICATIONS_TAB);
  if (!sheet) return { success: false, error: 'Applications tab not found' };

  var data = sheet.getDataRange().getValues();
  var EMAIL_COL = 4; // column E (0-indexed)
  var RESUME_COL = 10; // column K
  var deleted = 0;

  // Scan from bottom to avoid index shifting when clearing rows
  for (var i = data.length - 1; i >= 1; i--) {
    var rowEmail = String(data[i][EMAIL_COL] || '').toLowerCase().trim();
    if (rowEmail !== email.toLowerCase().trim()) continue;

    // Delete the resume file from Drive if we can extract the file ID
    var resumeLink = String(data[i][RESUME_COL] || '');
    var match = resumeLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      try {
        DriveApp.getFileById(match[1]).setTrashed(true);
      } catch (driveErr) {
        Logger.log('Drive deletion warning for row ' + (i + 1) + ': ' + driveErr);
      }
    }

    // Clear the sheet row
    sheet.getRange(i + 1, 1, 1, data[i].length).clearContent();
    deleted++;
  }

  return {
    success: true,
    message: deleted > 0
      ? 'Removed ' + deleted + ' record(s) for ' + email
      : 'No records found for ' + email
  };
}

// ─── HELPER ──────────────────────────────────────────────────────────────────

function respond(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
