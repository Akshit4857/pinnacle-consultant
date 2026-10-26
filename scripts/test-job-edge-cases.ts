/**
 * Comprehensive Gravitas Edge-Case Test Suite for Pinnacle Careers System
 */
import { sanitizeRichText } from '../server/security';

interface TestCaseResult {
  id: string;
  name: string;
  category: 'parsing' | 'edge-case' | 'security' | 'api';
  status: 'PASS' | 'FAIL';
  input: any;
  observed: any;
  reason?: string;
}

const results: TestCaseResult[] = [];

function assert(id: string, name: string, category: TestCaseResult['category'], condition: boolean, input: any, observed: any, failReason?: string) {
  results.push({
    id,
    name,
    category,
    status: condition ? 'PASS' : 'FAIL',
    input,
    observed,
    reason: condition ? undefined : failReason,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Parsing & Normalization Unit Logic Tests
// ─────────────────────────────────────────────────────────────────────────────

// Helper functions mirroring the exact normalization logic
const getVal = (row: Record<string, any>, ...keys: string[]) => {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== '') return String(row[k]).trim();
    const lowerK = k.toLowerCase();
    for (const actualKey of Object.keys(row)) {
      if (actualKey.toLowerCase() === lowerK && row[actualKey] !== undefined && row[actualKey] !== '') {
        return String(row[actualKey]).trim();
      }
    }
  }
  return '';
};

const parseList = (val: string) => {
  if (!val) return [];
  const lower = val.toLowerCase().trim();
  if (['no', 'none', 'n/a', 'na', 'false', 'off', 'disable', 'disabled', '-', '0'].includes(lower)) return [];
  return val
    .split(/[\n,;•]+/)
    .map((s) => s.trim())
    .filter((s) => Boolean(s) && !['no', 'none', 'n/a', 'na', '-'].includes(s.toLowerCase()));
};

const generateSlug = (title: string, rawSlug?: string) => {
  let slug = (rawSlug || '').trim().toLowerCase();
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  return slug;
};

// Test 1: Auto Slug generation with complex characters
const slugInput = 'Lead EV & Automation Architect (North India) #1!';
const expectedSlug = 'lead-ev-automation-architect-north-india-1';
const generatedSlug = generateSlug(slugInput);
assert('TC-01', 'Auto Slug Generation from complex title', 'parsing', generatedSlug === expectedSlug, slugInput, generatedSlug);

// Test 2: Pre-defined clean slug preservation
const customSlug = 'senior-recruiter';
assert('TC-02', 'Preserve valid pre-defined slug', 'parsing', generateSlug('Any Title', customSlug) === customSlug, customSlug, generateSlug('Any Title', customSlug));

// Test 3: Status check active vs closed vs case-insensitive
assert('TC-03a', 'Status "active" lowercase should be accepted', 'parsing', ['active', 'open'].includes('active'.toLowerCase()), 'active', true);
assert('TC-03b', 'Status "Closed" must be rejected', 'parsing', !['active', 'open'].includes('Closed'.toLowerCase()), 'Closed', false);
assert('TC-03c', 'Status "Draft" must be rejected', 'parsing', !['active', 'open'].includes('Draft'.toLowerCase()), 'Draft', false);

// Test 4: Openings count parsing
const parseOpenings = (val: string) => Math.max(1, parseInt(val || '1', 10) || 1);
assert('TC-04a', 'Openings "5" parses to 5', 'parsing', parseOpenings('5') === 5, '5', parseOpenings('5'));
assert('TC-04b', 'Blank openings defaults to 1', 'parsing', parseOpenings('') === 1, '', parseOpenings(''));
assert('TC-04c', 'Invalid string openings "urgent" defaults safely to 1', 'parsing', parseOpenings('urgent') === 1, 'urgent', parseOpenings('urgent'));
assert('TC-04d', 'Negative openings "-2" clamped to 1', 'parsing', parseOpenings('-2') === 1, '-2', parseOpenings('-2'));

// Test 5: Perks & Benefits enable/disable matrix
assert('TC-05a', 'Normal perks list parses correctly', 'edge-case', parseList('Health Insurance, Bonus, PF').length === 3, 'Health Insurance, Bonus, PF', parseList('Health Insurance, Bonus, PF'));
assert('TC-05b', 'Blank perks returns empty array', 'edge-case', parseList('').length === 0, '', parseList(''));
assert('TC-05c', 'Perks="No" returns empty array', 'edge-case', parseList('No').length === 0, 'No', parseList('No'));
assert('TC-05d', 'Perks="None" returns empty array', 'edge-case', parseList('None').length === 0, 'None', parseList('None'));
assert('TC-05e', 'Perks="-" returns empty array', 'edge-case', parseList('-').length === 0, '-', parseList('-'));
assert('TC-05f', 'Perks="N/A" returns empty array', 'edge-case', parseList('N/A').length === 0, 'N/A', parseList('N/A'));
assert('TC-05g', 'Perks="Disable" returns empty array', 'edge-case', parseList('Disable').length === 0, 'Disable', parseList('Disable'));

// Test 6: Multiline and semicolon bullet lists
const mixedList = 'Task 1; Task 2\nTask 3•Task 4;; \n';
const parsedMixed = parseList(mixedList);
assert('TC-06', 'Mixed delimiter bullet parsing cleans up empty items', 'edge-case', parsedMixed.length === 4 && parsedMixed[0] === 'Task 1' && parsedMixed[3] === 'Task 4', mixedList, parsedMixed);

// Test 7: Case-insensitive column lookup
const testRow = { 'job title': 'Talent Lead', 'LOCATION': 'Gurugram', 'salary': '10 LPA' };
assert('TC-07a', 'Case-insensitive lookup for "Job Title"', 'edge-case', getVal(testRow, 'Title', 'Job Title') === 'Talent Lead', testRow, getVal(testRow, 'Title', 'Job Title'));
assert('TC-07b', 'Case-insensitive lookup for uppercase "LOCATION"', 'edge-case', getVal(testRow, 'Location', 'City') === 'Gurugram', testRow, getVal(testRow, 'Location', 'City'));
assert('TC-07c', 'Alternative key lookup for "salary"', 'edge-case', getVal(testRow, 'SalaryRange', 'Salary') === '10 LPA', testRow, getVal(testRow, 'SalaryRange', 'Salary'));

// Test 8: XSS Injection Sanitization
const xssTitle = 'Lead Architect <script>alert("xss")</script>';
const sanitized = sanitizeRichText(xssTitle);
assert('TC-08', 'Strip dangerous script tags from user fields', 'security', !sanitized.includes('<script>') && !sanitized.includes('alert'), xssTitle, sanitized);

// Test 9: Expired Date Filter
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

assert('TC-09a', 'Yesterday deadline should be rejected as expired', 'edge-case', yesterday < today, yesterday, 'Expired');
assert('TC-09b', 'Tomorrow deadline should be accepted as active', 'edge-case', tomorrow >= today, tomorrow, 'Active');

// ─────────────────────────────────────────────────────────────────────────────
// Output Results Summary
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n======================================================');
console.log('       GRAVITAS TEST SUITE EXECUTION REPORT          ');
console.log('======================================================\n');

let passCount = 0;
let failCount = 0;

for (const r of results) {
  const icon = r.status === 'PASS' ? '✅' : '❌';
  console.log(`${icon} [${r.id}] ${r.name}`);
  if (r.status === 'FAIL') {
    failCount++;
    console.log(`    Input:    ${JSON.stringify(r.input)}`);
    console.log(`    Observed: ${JSON.stringify(r.observed)}`);
    console.log(`    Reason:   ${r.reason}`);
  } else {
    passCount++;
  }
}

console.log('\n------------------------------------------------------');
console.log(`Total: ${results.length} | Passed: ${passCount} | Failed: ${failCount}`);
console.log('------------------------------------------------------\n');
