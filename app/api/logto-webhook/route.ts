import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { createDb } from "@/db";
import { users } from "@/db/schema"
import { Resend } from 'resend';
import EmailTemplate from '@/components/email/EmailTemplate';
import CryptoJS from 'crypto-js';

// Set the runtime to edge for faster execution
export const runtime = 'edge'

// Constants and configurations
const FACEBOOK_GRAPH_API_URL = 'https://graph.facebook.com/v20.0';

// Utility function to verify webhook signature
function verifySignature(signingKey: string, rawBody: string, expectedSignature: string): boolean {
  const calculatedSignature = CryptoJS.HmacSHA256(rawBody, signingKey).toString(CryptoJS.enc.Hex);
  return calculatedSignature === expectedSignature;
}

// Utility function to hash data for Facebook Conversions API
function hashData(data: string): string {
  return CryptoJS.SHA256(data).toString();
}

// Function to send events to Facebook Conversions API
async function sendEventToFacebook(eventName: string, userData: any, customData: any, eventId: string) {
  const { env } = getRequestContext();
  const FACEBOOK_PIXEL_ID = env.FACEBOOK_PIXEL_ID;
  const FACEBOOK_ACCESS_TOKEN = env.FACEBOOK_ACCESS_TOKEN;

  console.log(`FACEBOOK_PIXEL_ID: ${FACEBOOK_PIXEL_ID?.substring(0, 4)}...`);
  console.log(`FACEBOOK_ACCESS_TOKEN: ${FACEBOOK_ACCESS_TOKEN?.substring(0, 4)}...`);

  const timestamp = Math.floor(Date.now() / 1000);

  const eventData = {
    data: [{
      event_name: eventName,
      event_time: timestamp,
      event_id: eventId,
      action_source: 'website',
      user_data: userData,
      custom_data: customData,
      event_source_url: 'https://yourdomain.com',
    }],
   //test_event_code: 'TEST18366', // Test event code
  };

  console.log('Data being sent to Facebook:', JSON.stringify(eventData, null, 2));

  try {
    const response = await fetch(`${FACEBOOK_GRAPH_API_URL}/${FACEBOOK_PIXEL_ID}/events?access_token=${FACEBOOK_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Server event sent to Facebook:', data);
    return data;
  } catch (error) {
    console.error('Error sending server event to Facebook:', error);
    throw error;
  }

}

// Main webhook handler for POST requests
export async function POST(request: NextRequest) {
  const { env } = getRequestContext();
  const DB = env.DB;
  const drizzleDB = createDb(DB);
  const SIGNING_KEY = env.LOGTO_SIGNING_KEY;
  const RESEND_API_KEY = env.RESEND_API_KEY; 

  console.log(`SIGNING_KEY: ${SIGNING_KEY?.substring(0, 4)}...`);
  console.log(`RESEND_API_KEY: ${RESEND_API_KEY?.substring(0, 4)}...`);

  const resend = new Resend(RESEND_API_KEY);

  const rawBody = await request.text();
  console.log('Received webhook payload:', rawBody);

  // Verify webhook signature
  const signature = request.headers.get('x-signature');
  if (signature && !verifySignature(SIGNING_KEY, rawBody, signature)) {
    return new Response('Invalid signature', { status: 401 });
  }

  // Parse and validate payload
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (error) {
    return new Response('Invalid JSON payload', { status: 400 });
  }

  if (payload.event !== 'User.Created') {
    return new Response('Unsupported event type', { status: 400 });
  }

  if (!payload.data || !payload.data.id) {
    return new Response('Missing required user ID in payload', { status: 400 });
  }

  const userId = payload.data.id;
  const userEmail = payload.data.primaryEmail;

  // Insert user data into database
  await drizzleDB.insert(users).values({
    id: userId,
    email: userEmail,
  });

  // Send welcome email
  try {
    const { data, error } = await resend.emails.send({
      from: 'Shadcnkit <notify@ShadcnKit.com>',
      to: [userEmail],
      subject: 'Welcome to Shadcnkit Demo!',
      react: EmailTemplate({ email: userEmail }),
    });

    if (error) {
      console.error('Error sending email:', error);
    }
  } catch (emailError) {
    console.error('Failed to send welcome email:', emailError);
  }

  // Send event to Facebook Conversions API
  try {
    const [firstName, ...lastNameParts] = (payload.data.name || '').split(' ');
    const lastName = lastNameParts.join(' ');

    const userData: Record<string, any> = {
      em: [hashData(userEmail)],
      fn: firstName ? [hashData(firstName)] : undefined,
      ln: lastName ? [hashData(lastName)] : undefined,
      external_id: [hashData(userId)],
      client_ip_address: payload.ip,
      client_user_agent: payload.userAgent,
      fbc: payload.fbc, // Click ID, if available
      fbp: payload.fbp, // Browser ID, if available
    };

    const customData: Record<string, any> = {
      registration_source: 'website',
      user_type: 'new',
    };

    // Handle different authentication providers
    if (payload.data.identities.facebook) {
      userData.fb_login_id = payload.data.identities.facebook.userId;
      customData.registration_source = 'facebook';
    } else if (payload.data.identities.google) {
      customData.google_user_id = payload.data.identities.google.userId;
      customData.registration_source = 'google';
    }

    await sendEventToFacebook('CompleteRegistration', userData, customData, userId);
  } catch (facebookError) {
    console.error('Failed to send event to Facebook:', facebookError);
  }

  // Return success response
  return new Response(JSON.stringify({ 
    success: true, 
    userId,
    message: 'User created successfully, welcome email sent, and event sent to Facebook',
    eventDetails: payload
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Handler for GET requests
export async function GET() {
  return new Response('Protected Webhook', { status: 200 });
}