import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

const fixedRecipient = process.env.MAIL_TO || '';
const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || '';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const sanitize = (value) => (typeof value === 'string' ? value.trim() : '');

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    requireTLS: process.env.SMTP_SECURE !== 'true',
    auth: { user, pass },
    tls: {
      minVersion: 'TLSv1.2'
    }
  });
};

const smtpDebug = (error) => {
  const code = error?.code || 'UNKNOWN';
  const responseCode = error?.responseCode ? ` (${error.responseCode})` : '';
  return `${code}${responseCode}`;
};

const buildHtmlEmail = ({ source, name, city, email, message, createdAt }) => {
  const safe = {
    source: escapeHtml(source),
    name: escapeHtml(name),
    city: escapeHtml(city),
    email: escapeHtml(email),
    message: escapeHtml(message),
    createdAt: escapeHtml(createdAt)
  };

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="padding:24px 28px;background:#0f172a;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;">New Website Lead</p>
                <h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;">1st May Inquiry Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;">
                <h2 style="margin:0 0 14px;font-size:16px;color:#1e293b;">Lead Summary</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-weight:700;color:#334155;width:170px;">Source</td>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#0f172a;">${safe.source}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-weight:700;color:#334155;">Received At</td>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#0f172a;">${safe.createdAt}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-weight:700;color:#334155;">Name</td>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#0f172a;">${safe.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-weight:700;color:#334155;">City / Company</td>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#0f172a;">${safe.city}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-weight:700;color:#334155;">Email</td>
                    <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#0f172a;">${safe.email}</td>
                  </tr>
                </table>

                <h2 style="margin:24px 0 10px;font-size:16px;color:#1e293b;">Project Message</h2>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${safe.message}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">
                This email is generated from the 1st May website form backend.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const source = sanitize(req.body?.source) || 'Unknown Form';
  const name = sanitize(req.body?.name);
  const city = sanitize(req.body?.city);
  const email = sanitize(req.body?.email);
  const message = sanitize(req.body?.message);

  if (!name || !city || !email || !message) {
    return res.status(400).json({ ok: false, message: 'Please fill all required fields.' });
  }

  const transporter = createTransporter();
  if (!fixedRecipient) {
    return res.status(500).json({
      ok: false,
      message: 'MAIL_TO is not configured in backend environment.'
    });
  }

  if (!fromAddress) {
    return res.status(500).json({
      ok: false,
      message: 'SMTP_FROM (or SMTP_USER) is not configured in backend environment.'
    });
  }

  if (!transporter) {
    return res.status(500).json({
      ok: false,
      message: 'Email server is not configured. Add SMTP variables in .env.'
    });
  }

  const createdAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: fixedRecipient,
      replyTo: email,
      subject: `New ${source} Submission - ${name}`,
      text: [
        `Source: ${source}`,
        `Received At: ${createdAt}`,
        `Name: ${name}`,
        `City / Company: ${city}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
      ].join('\n'),
      html: buildHtmlEmail({ source, name, city, email, message, createdAt })
    });

    return res.json({ ok: true, message: 'Inquiry sent successfully.' });
  } catch (error) {
    console.error('Mail send error:', error);
    const isDev = process.env.NODE_ENV !== 'production';
    return res.status(500).json({
      ok: false,
      message: isDev
        ? `Failed to send email: ${smtpDebug(error)}`
        : 'Failed to send email. Please try again.'
    });
  }
});

app.listen(port, () => {
  console.log(`Mail API running on http://localhost:${port}`);
  const transporter = createTransporter();
  if (!transporter) {
    console.warn('SMTP transport is not configured. Check .env SMTP variables.');
    return;
  }
  transporter
    .verify()
    .then(() => {
      console.log('SMTP connection verified.');
    })
    .catch((error) => {
      console.error(`SMTP verification failed: ${smtpDebug(error)}`);
    });
});
