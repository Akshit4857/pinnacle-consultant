import { config } from './config';
import { maskEmail, maskPhone } from './security';

export interface WhatsAppNotificationPayload {
  jobTitle: string;
  name: string;
  phone: string;
  email: string;
  experience: string;
  resumeLink: string;
  applicationsSheetUrl?: string;
}

/**
 * Clean and truncate string parameters to avoid breaking external limits
 */
function sanitizeParam(str: string, maxLength = 100): string {
  if (!str) return 'N/A';
  const clean = str.replace(/[\r\n\t]+/g, ' ').trim();
  if (clean.length > maxLength) {
    return clean.slice(0, maxLength - 3) + '...';
  }
  return clean;
}

/**
 * Dispatch notification to the site owner via:
 * 1. callmebot: 100% Free, instant WhatsApp alert, zero template approval, 30-sec setup
 * 2. ultramsg: Instant WhatsApp gateway via QR code
 * 3. webhook: Discord, Slack, Telegram, Zapier, Make, n8n
 * 4. meta: Official Meta WhatsApp Cloud API
 * 5. twilio: Twilio WhatsApp
 */
export async function sendWhatsAppNotification(
  payload: WhatsAppNotificationPayload
): Promise<boolean> {
  const provider = config.whatsapp.provider;
  const ownerNumber = config.whatsapp.ownerPhoneNumber;

  const sheetUrl = payload.applicationsSheetUrl || config.applicationsSheetUrl || 'Google Drive / Applications Sheet';

  try {
    if (provider === 'callmebot') {
      return await sendViaCallMeBot(payload, ownerNumber, sheetUrl);
    } else if (provider === 'ultramsg') {
      return await sendViaUltraMsg(payload, ownerNumber, sheetUrl);
    } else if (provider === 'webhook') {
      return await sendViaWebhook(payload, sheetUrl);
    } else if (provider === 'meta') {
      return await sendViaMetaCloud(payload, ownerNumber, sheetUrl);
    } else if (provider === 'twilio') {
      return await sendViaTwilio(payload, ownerNumber, sheetUrl);
    } else {
      console.warn(`[WhatsApp] Unknown provider: ${provider}`);
      return false;
    }
  } catch (err: any) {
    // Non-blocking side-effect: never crash or fail candidate request
    console.error(
      `[WhatsApp] Dispatch error for candidate ${maskEmail(payload.email)}:`,
      err?.message || err
    );
    return false;
  }
}

/**
 * CallMeBot WhatsApp Provider (Free, zero template approval, instant setup)
 * API: https://api.callmebot.com/whatsapp.php?phone=[phone]&text=[text]&apikey=[apikey]
 */
async function sendViaCallMeBot(
  payload: WhatsAppNotificationPayload,
  recipientNumber: string,
  sheetUrl: string
): Promise<boolean> {
  const apiKey = config.whatsapp.callmebotApiKey;
  if (!apiKey || !recipientNumber) {
    console.info('[WhatsApp CallMeBot] CALLMEBOT_API_KEY or OWNER_WHATSAPP_NUMBER not set.');
    return false;
  }

  const phone = recipientNumber.replace(/[^0-9]/g, '');
  const message =
    `*New Job Application*\n\n` +
    `*Role:* ${sanitizeParam(payload.jobTitle)}\n` +
    `*Name:* ${sanitizeParam(payload.name)}\n` +
    `*Phone:* ${sanitizeParam(payload.phone)}\n` +
    `*Email:* ${sanitizeParam(payload.email)}\n` +
    `*Experience:* ${sanitizeParam(payload.experience)}\n` +
    `*Resume:* ${payload.resumeLink}\n` +
    `*Sheet:* ${sheetUrl}`;

  const url = `https://api.callmebot.com/whatsapp.php?phone=+${phone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;

  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    console.error('[CallMeBot] Failed to send WhatsApp message:', res.status);
    return false;
  }

  return true;
}

/**
 * UltraMsg Provider (Scan QR code to connect WhatsApp number)
 * API: https://api.ultramsg.com/[instance_id]/messages/chat
 */
async function sendViaUltraMsg(
  payload: WhatsAppNotificationPayload,
  recipientNumber: string,
  sheetUrl: string
): Promise<boolean> {
  const { ultramsgInstanceId, ultramsgToken } = config.whatsapp;
  if (!ultramsgInstanceId || !ultramsgToken || !recipientNumber) {
    console.info('[WhatsApp UltraMsg] Credentials not set. Skipped.');
    return false;
  }

  const phone = recipientNumber.replace(/[^0-9]/g, '');
  const message =
    `*New Job Application*\n\n` +
    `*Role:* ${sanitizeParam(payload.jobTitle)}\n` +
    `*Name:* ${sanitizeParam(payload.name)}\n` +
    `*Phone:* ${sanitizeParam(payload.phone)}\n` +
    `*Email:* ${sanitizeParam(payload.email)}\n` +
    `*Experience:* ${sanitizeParam(payload.experience)}\n` +
    `*Resume:* ${payload.resumeLink}\n` +
    `*Sheet:* ${sheetUrl}`;

  const url = `https://api.ultramsg.com/${ultramsgInstanceId}/messages/chat`;
  const params = new URLSearchParams();
  params.append('token', ultramsgToken);
  params.append('to', `+${phone}`);
  params.append('body', message);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  return res.ok;
}

/**
 * Generic Webhook Provider (Works with Slack, Discord, Telegram, Zapier, Make)
 */
async function sendViaWebhook(
  payload: WhatsAppNotificationPayload,
  sheetUrl: string
): Promise<boolean> {
  const webhookUrl = config.whatsapp.webhookUrl;
  if (!webhookUrl) {
    console.info('[Notification Webhook] NOTIFICATION_WEBHOOK_URL not set.');
    return false;
  }

  const content =
    `**New Job Application Received**\n` +
    `• **Role:** ${sanitizeParam(payload.jobTitle)}\n` +
    `• **Name:** ${sanitizeParam(payload.name)}\n` +
    `• **Phone:** ${sanitizeParam(payload.phone)}\n` +
    `• **Email:** ${sanitizeParam(payload.email)}\n` +
    `• **Experience:** ${sanitizeParam(payload.experience)}\n` +
    `• **Resume:** ${payload.resumeLink}\n` +
    `• **Sheet:** ${sheetUrl}`;

  // Supports Discord/Slack standard payload format
  const body = {
    content,
    text: content,
    data: {
      ...payload,
      sheetUrl,
    },
  };

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return res.ok;
}

/**
 * Meta WhatsApp Cloud API Provider
 */
async function sendViaMetaCloud(
  payload: WhatsAppNotificationPayload,
  recipientNumber: string,
  sheetUrl: string
): Promise<boolean> {
  const { accessToken, phoneNumberId, templateName } = config.whatsapp;

  if (!accessToken || !phoneNumberId || !recipientNumber) {
    console.info('[WhatsApp] Meta Cloud credentials not set. Simulated notification.');
    console.info(`[WhatsApp Notification -> ${maskPhone(recipientNumber)}] New Application for ${payload.jobTitle} from ${payload.name}`);
    return true;
  }

  const to = recipientNumber.replace(/[^0-9]/g, '');
  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: {
      name: templateName,
      language: { code: 'en_US' },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: sanitizeParam(payload.jobTitle, 60) },
            { type: 'text', text: sanitizeParam(payload.name, 50) },
            { type: 'text', text: sanitizeParam(payload.phone, 25) },
            { type: 'text', text: sanitizeParam(payload.email, 60) },
            { type: 'text', text: sanitizeParam(payload.experience, 30) },
            { type: 'text', text: payload.resumeLink || 'View in Sheet' },
            { type: 'text', text: sheetUrl },
          ],
        },
      ],
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.ok;
}

/**
 * Twilio WhatsApp API Provider
 */
async function sendViaTwilio(
  payload: WhatsAppNotificationPayload,
  recipientNumber: string,
  sheetUrl: string
): Promise<boolean> {
  const { twilioAccountSid, twilioAuthToken, twilioFromNumber } = config.whatsapp;

  if (!twilioAccountSid || !twilioAuthToken || !recipientNumber) {
    console.info('[WhatsApp Twilio] Credentials not set. Skipped.');
    return false;
  }

  const messageText =
    `*New Job Application*\n` +
    `*Role:* ${sanitizeParam(payload.jobTitle)}\n` +
    `*Name:* ${sanitizeParam(payload.name)}\n` +
    `*Phone:* ${sanitizeParam(payload.phone)}\n` +
    `*Email:* ${sanitizeParam(payload.email)}\n` +
    `*Experience:* ${sanitizeParam(payload.experience)}\n` +
    `*Resume:* ${payload.resumeLink}\n` +
    `*Sheet:* ${sheetUrl}`;

  const fromNumber = twilioFromNumber.startsWith('whatsapp:')
    ? twilioFromNumber
    : `whatsapp:${twilioFromNumber}`;
  const toNumber = recipientNumber.startsWith('whatsapp:')
    ? recipientNumber
    : `whatsapp:${recipientNumber}`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;

  const params = new URLSearchParams();
  params.append('From', fromNumber);
  params.append('To', toNumber);
  params.append('Body', messageText);

  const authHeader = 'Basic ' + Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  return response.ok;
}
