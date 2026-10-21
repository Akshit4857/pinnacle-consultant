import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // Google Sheets & Drive
  google: {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    privateKey: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    sheetId: process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SPREADSHEET_ID || '',
    jobsTabName: process.env.GOOGLE_JOBS_TAB_NAME || 'Jobs',
    applicationsTabName: process.env.GOOGLE_APPLICATIONS_TAB_NAME || 'Applications',
    driveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID || '',
    driveAuthType: (process.env.GOOGLE_DRIVE_AUTH_TYPE || 'oauth') as 'oauth' | 'service_account',
    // OAuth credentials for personal Google Drive quota
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN || '',
  },

  // WhatsApp & Alert Notification
  whatsapp: {
    provider: (process.env.WHATSAPP_PROVIDER || 'meta') as 'meta' | 'twilio' | 'callmebot' | 'ultramsg' | 'webhook',
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    templateName: process.env.WHATSAPP_TEMPLATE_NAME || 'new_job_application',
    ownerPhoneNumber: process.env.OWNER_WHATSAPP_NUMBER || '',
    // CallMeBot (Free, zero template approval, 30s setup)
    callmebotApiKey: process.env.CALLMEBOT_API_KEY || '',
    // UltraMsg (QR scan WhatsApp Gateway)
    ultramsgInstanceId: process.env.ULTRAMSG_INSTANCE_ID || '',
    ultramsgToken: process.env.ULTRAMSG_TOKEN || '',
    // Generic Webhook (Telegram, Slack, Discord, Zapier, Make)
    webhookUrl: process.env.NOTIFICATION_WEBHOOK_URL || '',
    // Twilio fallback credentials
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    twilioFromNumber: process.env.TWILIO_WHATSAPP_NUMBER || '',
  },

  // Anti-Spam / Turnstile
  turnstile: {
    secretKey: process.env.TURNSTILE_SECRET_KEY || '',
  },

  // Upstash Redis (Serverless rate limiting & retry queue)
  upstash: {
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
  },

  // Application Rules & Limits
  limits: {
    maxResumeSizeBytes: 5 * 1024 * 1024, // 5 MB
    rateLimitPerHour: Number(process.env.RATE_LIMIT_PER_HOUR || 5),
    minSubmitTimeSeconds: 2.5, // form submit faster than 2.5s is treated as bot
    jobsCacheTtlSeconds: 5 * 60, // 5 minutes
  },

  // Application Sheet Link for WhatsApp message reference
  applicationsSheetUrl: process.env.APPLICATIONS_SHEET_URL || '',
};

/**
 * Validate required environment variables.
 * In production, missing core credentials throws a clean error without exposing secrets.
 */
export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!config.google.sheetId) {
    missing.push('GOOGLE_SHEET_ID');
  }

  if (!config.google.serviceAccountEmail && !config.google.refreshToken) {
    missing.push('GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_REFRESH_TOKEN');
  }

  if (config.isProduction && missing.length > 0) {
    console.warn(`[Config] Production warning: missing credentials [${missing.join(', ')}]`);
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}
