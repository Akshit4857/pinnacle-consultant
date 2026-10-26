import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // Google — Apps Script Web App URL and optional secret
  // Deploy scripts/AppsScript.gs as a Web App and paste the URL here.
  google: {
    appsScriptUrl: process.env.GOOGLE_APPS_SCRIPT_URL || '',
    appsScriptSecret: process.env.GOOGLE_APPS_SCRIPT_SECRET || '',
  },

  // WhatsApp & Alert Notification
  whatsapp: {
    provider: (process.env.WHATSAPP_PROVIDER || 'callmebot') as 'meta' | 'twilio' | 'callmebot' | 'ultramsg' | 'webhook',
    ownerPhoneNumber: process.env.OWNER_WHATSAPP_NUMBER || '',
    // CallMeBot (free, zero template approval, 30-second setup)
    callmebotApiKey: process.env.CALLMEBOT_API_KEY || '',
    // Meta WhatsApp Cloud API
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    templateName: process.env.WHATSAPP_TEMPLATE_NAME || 'new_job_application',
    // UltraMsg
    ultramsgInstanceId: process.env.ULTRAMSG_INSTANCE_ID || '',
    ultramsgToken: process.env.ULTRAMSG_TOKEN || '',
    // Generic Webhook (Telegram, Slack, Discord, Zapier)
    webhookUrl: process.env.NOTIFICATION_WEBHOOK_URL || '',
    // Twilio
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    twilioFromNumber: process.env.TWILIO_WHATSAPP_NUMBER || '',
  },

  // Anti-Spam / Cloudflare Turnstile
  turnstile: {
    secretKey: process.env.TURNSTILE_SECRET_KEY || '',
  },

  // Upstash Redis (optional — falls back to in-memory if not set)
  upstash: {
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
  },

  // Application rules & limits
  limits: {
    maxResumeSizeBytes: 5 * 1024 * 1024, // 5 MB
    rateLimitPerHour: Number(process.env.RATE_LIMIT_PER_HOUR || 5),
    minSubmitTimeSeconds: 2.5,
    jobsCacheTtlSeconds: 5 * 60, // 5 minutes
  },

  // Link included in WhatsApp notification messages
  applicationsSheetUrl: process.env.APPLICATIONS_SHEET_URL || '',
};

export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!config.google.appsScriptUrl) {
    missing.push('GOOGLE_APPS_SCRIPT_URL');
  }

  if (config.isProduction && missing.length > 0) {
    console.warn(`[Config] Production warning: missing credentials [${missing.join(', ')}]`);
  }

  return { valid: missing.length === 0, missing };
}
