import nodemailer from "nodemailer";

// ── Error alert ───────────────────────────────────────────────────────────────

export async function sendErrorEmail(context: string, err: unknown): Promise<void> {
  const helpEmail = process.env.HELP_EMAIL;
  const smtpUser  = process.env.SMTP_USER;
  const smtpPass  = process.env.SMTP_PASS;
  if (!helpEmail || !smtpUser || !smtpPass) return;

  const message = err instanceof Error ? `${err.message}\n\n${err.stack ?? ""}` : String(err);
  const ts      = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? "smtp.gmail.com",
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth:   { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from:    `"Spark Fitness Zone [Error]" <${smtpUser}>`,
    to:      helpEmail,
    subject: `ERROR — ${context}`,
    html: `
      <div style="font-family:monospace;max-width:600px;margin:0 auto;background:#0d0d0d;color:#e0e0e0;padding:28px;border-top:3px solid #D62828;">
        <h2 style="margin:0 0 6px 0;color:#D62828;font-size:1rem;text-transform:uppercase;letter-spacing:0.1em;">Server Error</h2>
        <p style="margin:0 0 20px 0;color:#666;font-size:0.8rem;">${ts}</p>
        <p style="margin:0 0 8px 0;color:#888;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;">Context</p>
        <p style="margin:0 0 20px 0;padding:10px 14px;background:#1a1a1a;border-left:3px solid #D62828;color:#fff;font-size:0.9rem;">${context}</p>
        <p style="margin:0 0 8px 0;color:#888;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;">Error</p>
        <pre style="margin:0;padding:14px;background:#1a1a1a;color:#e0e0e0;font-size:0.8rem;white-space:pre-wrap;word-break:break-all;">${message}</pre>
      </div>
    `,
  });
}

// ── Shared transporter factory ────────────────────────────────────────────────

export function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? "smtp.gmail.com",
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });
}

// ── Shared confirmation email ─────────────────────────────────────────────────

interface ConfirmationOptions {
  to:      string;
  name:    string;
  type:    "trial" | "membership";
  planLabel?: string;
}

export async function sendConfirmationEmail({ to, name, type, planLabel }: ConfirmationOptions): Promise<void> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) return;

  const firstName   = name.split(" ")[0];
  const isTrial     = type === "trial";
  const subjectLine = isTrial
    ? `You're booked in, ${firstName} — Spark Fitness Zone`
    : `Welcome to Spark Fitness Zone, ${firstName}`;
  const headline    = isTrial ? "Your Trial is Confirmed." : "Membership Confirmed.";
  const subheadline = isTrial
    ? "We've received your request and our team will reach out within 24 hours to confirm your slot."
    : `You're now part of the Spark family${planLabel ? ` — ${planLabel}` : ""}. We'll be in touch shortly with next steps.`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subjectLine}</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#080808;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- Top accent bar -->
          <tr>
            <td style="background:#D62828;height:4px;border-radius:2px 2px 0 0;"></td>
          </tr>

          <!-- Card body -->
          <tr>
            <td style="background:#111111;padding:40px 40px 32px 40px;border-radius:0 0 4px 4px;">

              <!-- Logo / brand name -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td>
                    <span style="font-size:1.05rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#D62828;">SPARK</span>
                    <span style="font-size:1.05rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#ffffff;"> FITNESS ZONE</span>
                  </td>
                  <td align="right">
                    <span style="font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:#555;padding:4px 10px;border:1px solid #222;border-radius:2px;">${isTrial ? "FREE TRIAL" : "MEMBER"}</span>
                  </td>
                </tr>
              </table>

              <!-- Headline -->
              <h1 style="margin:0 0 10px 0;font-size:2rem;font-weight:800;letter-spacing:-0.01em;color:#ffffff;line-height:1.15;">${headline}</h1>
              <p style="margin:0 0 28px 0;font-size:0.95rem;color:#aaaaaa;line-height:1.7;">${subheadline}</p>

              <!-- Divider -->
              <div style="height:1px;background:#1e1e1e;margin-bottom:28px;"></div>

              <!-- Visit Details -->
              <p style="margin:0 0 12px 0;font-size:0.65rem;letter-spacing:0.14em;text-transform:uppercase;color:#555;">Your Visit Details</p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1e1e1e;vertical-align:top;width:28px;">
                    <span style="font-size:1rem;">📍</span>
                  </td>
                  <td style="padding:12px 0 12px 10px;border-bottom:1px solid #1e1e1e;">
                    <p style="margin:0 0 2px 0;font-size:0.8rem;color:#888;">Address</p>
                    <p style="margin:0;font-size:0.9rem;color:#e0e0e0;line-height:1.5;">2nd &amp; 3rd Floor, IOCL Petrol Pump<br>Shalimar Plaza, Chepapul, Mango<br>Jamshedpur — 832110</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1e1e1e;vertical-align:top;">
                    <span style="font-size:1rem;">⏰</span>
                  </td>
                  <td style="padding:12px 0 12px 10px;border-bottom:1px solid #1e1e1e;">
                    <p style="margin:0 0 2px 0;font-size:0.8rem;color:#888;">Hours</p>
                    <p style="margin:0;font-size:0.9rem;color:#e0e0e0;">5:00 AM – 11:00 PM, Every Day</p>
                  </td>
                </tr>
              </table>

              <!-- What to bring -->
              <p style="margin:0 0 12px 0;font-size:0.65rem;letter-spacing:0.14em;text-transform:uppercase;color:#555;">What to Bring</p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                ${bringRow("🏋️", "A Pair of Training Shoes", "Proper footwear makes a real difference.")}
                ${bringRow("💧", "Water Bottle",             "Stay hydrated — we push hard here.")}
                ${bringRow("🤍", "Hand Towel",               "Keep it clean, keep it sharp.")}
              </table>

              <!-- Quote -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#0e0e0e;border-left:3px solid #D62828;padding:18px 20px;border-radius:0 2px 2px 0;">
                    <p style="margin:0 0 6px 0;font-size:1.05rem;font-style:italic;color:#c8c8c8;line-height:1.6;">"The only bad workout is the one that didn't happen."</p>
                    <p style="margin:0;font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:#555;">— Spark Fitness Zone</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 16px 0;font-size:0.9rem;color:#aaa;text-align:center;">We are looking forward to seeing you push your limits.</p>
                    <a href="https://maps.app.goo.gl/sparkfitness" style="display:inline-block;background:#D62828;color:#ffffff;text-decoration:none;font-size:0.8rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:14px 32px;border-radius:2px;">Get Directions</a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:#1e1e1e;margin-bottom:24px;"></div>

              <!-- Footer -->
              <p style="margin:0;font-size:0.75rem;color:#444;text-align:center;line-height:1.8;">
                Spark Fitness Zone &nbsp;·&nbsp; Jamshedpur, Jharkhand<br>
                Questions? Just reply to this email.
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  const transporter = createTransporter();
  await transporter.sendMail({
    from:    `"Spark Fitness Zone" <${smtpUser}>`,
    to,
    subject: subjectLine,
    html,
  });
}

// ── Helper ────────────────────────────────────────────────────────────────────

function bringRow(icon: string, item: string, note: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;vertical-align:top;width:28px;">
        <span style="font-size:1.1rem;">${icon}</span>
      </td>
      <td style="padding:10px 0 10px 10px;border-bottom:1px solid #1a1a1a;">
        <p style="margin:0 0 2px 0;font-size:0.88rem;font-weight:600;color:#e0e0e0;">${item}</p>
        <p style="margin:0;font-size:0.78rem;color:#666;">${note}</p>
      </td>
    </tr>
  `;
}
