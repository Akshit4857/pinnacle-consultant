import {
  validateUploadedFile,
  sanitizeForGoogleSheets,
  sanitizeRichText,
  checkDuplicateApplication,
  recordApplicationKey,
  checkRateLimit,
} from '../server/security';
import { getActiveJobBySlug } from '../server/google';

/**
 * Security & Reliability Verification Test Suite
 */
async function runSecurityTests() {
  console.log('====================================================');
  console.log('  PINNACLE CONSULTANT: CAREERS PIPELINE SECURITY TESTS  ');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string, failureDetails?: string) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}: ${failureDetails || 'Assertion failed'}`);
    }
  }

  // TEST 1: Fake file type rejection (malicious binary disguised as .pdf)
  console.log('--- File Upload Security ---');
  const fakePdfBuffer = Buffer.from('MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00This is a fake PE executable');
  const fakePdfResult = validateUploadedFile(fakePdfBuffer, 'trojan.pdf', 'application/pdf');
  assert(
    !fakePdfResult.valid && fakePdfResult.error?.includes('header does not match'),
    'Reject fake executable disguised with .pdf extension',
    fakePdfResult.error
  );

  // Valid PDF magic bytes check
  const validPdfBuffer = Buffer.from('%PDF-1.4\n%âãÏÓ\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF');
  const validPdfResult = validateUploadedFile(validPdfBuffer, 'resume.pdf', 'application/pdf');
  assert(
    validPdfResult.valid && !!validPdfResult.sanitizedName?.startsWith('resume-'),
    'Accept authentic PDF with verified magic bytes and randomized UUID filename'
  );

  // TEST 2: Oversized file rejection (> 5 MB)
  const oversizedBuffer = Buffer.alloc(5.5 * 1024 * 1024, 0x25); // 5.5 MB
  const oversizedResult = validateUploadedFile(oversizedBuffer, 'huge_resume.pdf', 'application/pdf');
  assert(
    !oversizedResult.valid && oversizedResult.error?.includes('5 MB'),
    'Reject file exceeding 5 MB stream size limit',
    oversizedResult.error
  );

  // TEST 3: Formula Injection Neutralization
  console.log('\n--- Spreadsheet Injection Defense ---');
  const formulaPayload1 = '=CMD("calc.exe")';
  const formulaPayload2 = '+SUM(1,2)';
  const formulaPayload3 = '-2+3';
  const formulaPayload4 = '@SUM(A1:A10)';
  const normalText = 'Senior EV Engineer';

  assert(
    sanitizeForGoogleSheets(formulaPayload1) === "'=CMD(\"calc.exe\")",
    'Neutralize = formula injection by prefixing single quote'
  );
  assert(
    sanitizeForGoogleSheets(formulaPayload2) === "'+SUM(1,2)",
    'Neutralize + formula injection'
  );
  assert(
    sanitizeForGoogleSheets(formulaPayload3) === "'-2+3",
    'Neutralize - formula injection'
  );
  assert(
    sanitizeForGoogleSheets(formulaPayload4) === "'@SUM(A1:A10)",
    'Neutralize @ formula injection'
  );
  assert(
    sanitizeForGoogleSheets(normalText) === 'Senior EV Engineer',
    'Leave safe text untouched without unnecessary prefix'
  );

  // TEST 4: XSS Payload Neutralization in Google Sheets Cells
  console.log('\n--- XSS Sanitization in Rich Text ---');
  const maliciousXss = '<script>alert("XSS")</script><img src=x onerror=alert(1)><b>Great Opportunity</b>';
  const sanitizedXss = sanitizeRichText(maliciousXss);
  assert(
    !sanitizedXss.includes('<script>') && !sanitizedXss.includes('onerror') && sanitizedXss.includes('<b>Great Opportunity</b>'),
    'Neutralize script tags and onerror vectors while preserving safe markup',
    `Result: ${sanitizedXss}`
  );

  // TEST 5: Duplicate Application Blocking
  console.log('\n--- Duplicate Application & Rate Limiting ---');
  const testJobSlug = 'ev-infrastructure-maintenance-lead';
  const testEmail = `candidate-${Date.now()}@testdomain.com`;

  const dupCheck1 = await checkDuplicateApplication(testJobSlug, testEmail);
  assert(!dupCheck1.isDuplicate, 'First submission is not treated as duplicate');

  await recordApplicationKey(testJobSlug, testEmail);
  const dupCheck2 = await checkDuplicateApplication(testJobSlug, testEmail);
  assert(dupCheck2.isDuplicate, 'Subsequent submission with same email and job is blocked as duplicate');

  // TEST 6: IP Rate Limiter
  const testIp = `198.51.100.${Math.floor(Math.random() * 200) + 1}`;
  let allowedCount = 0;
  for (let i = 0; i < 7; i++) {
    const res = await checkRateLimit(testIp);
    if (res.allowed) allowedCount++;
  }
  assert(allowedCount <= 5, 'Rate limiter restricts submissions to 5 per hour per IP');

  // TEST 7: Inactive / Non-existent Job Rejection
  console.log('\n--- Job Lifecycle Validation ---');
  const invalidJob = await getActiveJobBySlug('non-existent-or-expired-job-12345');
  assert(invalidJob === null, 'Non-existent or inactive job returns null to prevent orphaned applications');

  const activeJob = await getActiveJobBySlug('ev-infrastructure-maintenance-lead');
  assert(activeJob !== null && activeJob.status === 'Active', 'Active job correctly retrieved and verified');

  console.log('\n====================================================');
  console.log(`  SECURITY TEST SUMMARY: ${passed}/${total} TESTS PASSED  `);
  console.log('====================================================\n');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runSecurityTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
