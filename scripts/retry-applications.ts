import { drainRetryQueue } from '../server/queue';

/**
 * CLI runner / cron job for retrying failed applications
 * Usage:
 *   npx tsx scripts/retry-applications.ts
 */
async function main() {
  console.log('--- Draining Application Retry Queue ---');
  const result = await drainRetryQueue();
  console.log(`Processed: ${result.processed}`);
  console.log(`Succeeded: ${result.succeeded}`);
  console.log(`Failed / Re-queued: ${result.failed}`);
}

main().catch((err) => {
  console.error('Error running retry queue:', err);
  process.exit(1);
});
