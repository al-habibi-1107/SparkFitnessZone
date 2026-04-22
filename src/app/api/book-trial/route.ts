import { NextRequest, NextResponse }  from "next/server";
import nodemailer                     from "nodemailer";
import { sendConfirmationEmail, sendErrorEmail } from "@/lib/email/confirmation";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TrialRequest {
  name:              string;
  email:             string;
  phone:             string;
  trainerPreference: string;
  goal:              string;
  submittedAt:       string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isFirebaseConfigured(): boolean {
  return !!(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64
  );
}

async function saveToFirebase(data: TrialRequest): Promise<void> {
  // Dynamic import so the module never fails on cold start when unconfigured
  const { getDb } = await import("@/lib/firebase/admin");
  const db        = getDb();
  await db.collection("trial_requests").add(data);
}

async function sendAlertEmail(data: TrialRequest): Promise<void> {
  const alertEmail = process.env.ALERT_EMAIL;
  const smtpUser   = process.env.SMTP_USER;
  const smtpPass   = process.env.SMTP_PASS;

  if (!alertEmail || !smtpUser || !smtpPass) return; // email not configured — skip silently

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? "smtp.gmail.com",
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth:   { user: smtpUser, pass: smtpPass },
  });

  const bccEmail = process.env.BCC_EMAIL;

  await transporter.sendMail({
    from:    `"Spark Fitness Zone" <${smtpUser}>`,
    to:      alertEmail,
    ...(bccEmail ? { bcc: bccEmail } : {}),
    subject: `New Free Trial Request — ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#111;color:#D8D0C4;padding:32px;border-top:3px solid #D62828">
        <h1 style="font-size:1.6rem;margin:0 0 4px 0;color:#fff">New Free Trial Request</h1>
        <p style="margin:0 0 24px 0;color:#888;font-size:0.85rem">${data.submittedAt}</p>

        <table style="width:100%;border-collapse:collapse">
          ${row("Name",       data.name)}
          ${row("Email",      `<a href="mailto:${data.email}" style="color:#D62828">${data.email}</a>`)}
          ${row("Phone",      `<a href="tel:${data.phone}" style="color:#D62828">${data.phone}</a>`)}
          ${row("Trainer",    data.trainerPreference || "No preference")}
          ${row("Goal",       data.goal               || "Not specified")}
        </table>

        <div style="margin-top:28px;padding:16px;background:#1a1a1a;border-left:3px solid #D62828">
          <p style="margin:0;font-size:0.8rem;color:#888">
            Follow up within 24 hours. Reply to this email to contact the lead directly.
          </p>
        </div>
      </div>
    `,
    replyTo: data.email,
  });
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;width:36%">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.9rem">${value}</td>
    </tr>
  `;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json() as Partial<TrialRequest>;

  const name  = (body.name  ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();

  if (!name)                                    return NextResponse.json({ error: "Name is required."            }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Valid email is required."    }, { status: 400 });
  if (phone.length < 10)                        return NextResponse.json({ error: "Valid phone number required." }, { status: 400 });

  const entry: TrialRequest = {
    name,
    email,
    phone,
    trainerPreference: (body.trainerPreference ?? "").trim(),
    goal:              (body.goal              ?? "").trim(),
    submittedAt:       new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  const results = await Promise.allSettled([
    isFirebaseConfigured() ? saveToFirebase(entry) : Promise.resolve(),
    sendAlertEmail(entry),
    sendConfirmationEmail({ to: entry.email, name: entry.name, type: "trial" }),
  ]);

  const labels = ["firebase", "alert-email", "confirmation-email"];
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`book-trial: step ${labels[i]} failed:`, r.reason);
      sendErrorEmail(`book-trial / ${labels[i]}`, r.reason).catch(() => {});
    }
  });

  return NextResponse.json({ ok: true });
}
