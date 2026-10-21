import { StoredApplication } from './types';
import { config } from './config';
import { Redis } from '@upstash/redis';
import { appendApplicationRow } from './google';
import fs from 'fs';
import path from 'path';

let redisClient: Redis | null = null;
if (config.upstash.url && config.upstash.token) {
  try {
    redisClient = new Redis({
      url: config.upstash.url,
      token: config.upstash.token,
    });
  } catch {
    // fallback
  }
}

const FALLBACK_QUEUE_FILE = path.resolve(process.cwd(), '.failed-applications-queue.json');

/**
 * Push failed application to Upstash retry queue or local backup
 */
export async function enqueueFailedApplication(app: StoredApplication): Promise<void> {
  const queueKey = 'queue:failed_applications';
  const payloadStr = JSON.stringify(app);

  if (redisClient) {
    try {
      await redisClient.lpush(queueKey, payloadStr);
      console.info(`[RetryQueue] Enqueued application for ${app.jobSlug} in Upstash Redis.`);
      return;
    } catch (err) {
      console.error('[RetryQueue] Upstash lpush failed, falling back to local file', err);
    }
  }

  // File fallback
  try {
    let list: StoredApplication[] = [];
    if (fs.existsSync(FALLBACK_QUEUE_FILE)) {
      list = JSON.parse(fs.readFileSync(FALLBACK_QUEUE_FILE, 'utf8'));
    }
    list.push(app);
    fs.writeFileSync(FALLBACK_QUEUE_FILE, JSON.stringify(list, null, 2), 'utf8');
    console.info(`[RetryQueue] Enqueued application in fallback file: ${FALLBACK_QUEUE_FILE}`);
  } catch (err) {
    console.error('[RetryQueue] Fallback queue save error:', err);
  }
}

/**
 * Drain and retry all failed applications
 */
export async function drainRetryQueue(): Promise<{ processed: number; succeeded: number; failed: number }> {
  let processed = 0;
  let succeeded = 0;
  let failed = 0;

  // 1. Drain Upstash Redis
  if (redisClient) {
    const queueKey = 'queue:failed_applications';
    try {
      let item = await redisClient.rpop(queueKey);
      while (item) {
        processed++;
        const app: StoredApplication = typeof item === 'string' ? JSON.parse(item) : (item as StoredApplication);
        const res = await appendApplicationRow(app);
        if (res.success) {
          succeeded++;
          console.info(`[RetryQueue] Successfully processed retry for ${app.email}`);
        } else {
          failed++;
          await redisClient.lpush(queueKey, JSON.stringify(app));
          break; // Stop on persistent sheet error to prevent infinite loop
        }
        item = await redisClient.rpop(queueKey);
      }
    } catch (err) {
      console.error('[RetryQueue] Error draining Upstash queue', err);
    }
  }

  // 2. Drain file queue
  if (fs.existsSync(FALLBACK_QUEUE_FILE)) {
    try {
      const list: StoredApplication[] = JSON.parse(fs.readFileSync(FALLBACK_QUEUE_FILE, 'utf8'));
      const remaining: StoredApplication[] = [];
      for (const app of list) {
        processed++;
        const res = await appendApplicationRow(app);
        if (res.success) {
          succeeded++;
        } else {
          failed++;
          remaining.push(app);
        }
      }
      if (remaining.length > 0) {
        fs.writeFileSync(FALLBACK_QUEUE_FILE, JSON.stringify(remaining, null, 2), 'utf8');
      } else {
        fs.unlinkSync(FALLBACK_QUEUE_FILE);
      }
    } catch (err) {
      console.error('[RetryQueue] Error processing fallback queue file', err);
    }
  }

  return { processed, succeeded, failed };
}
