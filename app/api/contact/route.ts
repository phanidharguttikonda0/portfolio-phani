import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiter: max 5 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, company, bottleneck, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const recipient = 'guttikondaphanidharreddy@gmail.com';
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || 'Phanidhar Reddy <contact@phani.pro>';

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [recipient],
      replyTo: email,
      subject: `[${bottleneck || 'Technical Consultation'}] ${company ? `${company} - ` : ''}${name}`,
      text: `New consultation request from phani.pro:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nPrimary Bottleneck: ${bottleneck || 'N/A'}\n\nProject Scope & Message:\n${message}\n\nIP: ${ip}\nSent At: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b1110; color: #e1ece5; border-radius: 12px; border: 1px solid #22352b; overflow: hidden;">
          <div style="background: #111a16; padding: 24px; border-bottom: 1px solid #22352b;">
            <span style="font-family: monospace; font-size: 11px; color: #34d399; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">INBOUND CONSULTATION LEAD</span>
            <h2 style="margin: 8px 0 0 0; font-size: 20px; color: #ffffff; font-weight: 800;">${name}</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #8ca396;">${email} ${company ? `· ${company}` : ''}</p>
          </div>
          
          <div style="padding: 24px;">
            <div style="background: #070c0a; border: 1px solid #182720; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <div style="font-size: 11px; font-family: monospace; color: #718b7e; text-transform: uppercase; margin-bottom: 4px;">Selected Bottleneck / Service</div>
              <div style="font-size: 14px; font-weight: 700; color: #34d399;">${bottleneck || 'General Consultation'}</div>
            </div>

            <div style="margin-bottom: 20px;">
              <div style="font-size: 11px; font-family: monospace; color: #718b7e; text-transform: uppercase; margin-bottom: 6px;">Project Scope & Context</div>
              <div style="background: #111a16; border: 1px solid #22352b; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #d1dfd7; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="border-top: 1px solid #182720; padding-top: 16px; font-size: 12px; font-family: monospace; color: #455a50; display: flex; justify-content: space-between;">
              <span>Source: phani.pro</span>
              <span>Client IP: ${ip}</span>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Error]:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to dispatch email via Resend.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request sent successfully! You will receive a response within 24 hours.',
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal server error';
    console.error('[API Contact Error]:', err);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
