import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(["en", "pl"]).default("en"),
});

let resendClient: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) resendClient = new Resend(apiKey);
  return resendClient;
}

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact payload" }, { status: 400 });
  }

  const resend = getResend();
  const to = process.env.CONTACT_TO_EMAIL || process.env.RESEND_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Rose Medical <onboarding@resend.dev>";

  if (!resend || !to) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  const { name, email, company, message, locale } = parsed.data;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Rose Medical inquiry from ${name}`,
    text: [
      `Language: ${locale}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "-"}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
