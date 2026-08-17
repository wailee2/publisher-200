import { NextRequest, NextResponse } from "next/server";

// Sends contact-form submissions by email via Resend (free tier: 3,000
// emails/month, no card required). No database write — this is a
// pass-through notifier, not a stored record. If you want submissions
// saved too, that's a one-field addition to the Sanity schema.
export async function POST(req: NextRequest) {
  const { name, email, reason, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error("RESEND_API_KEY or CONTACT_TO_EMAIL not set");
    return NextResponse.json(
      { error: "Contact form is not configured yet" },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Adire Press Website <onboarding@resend.dev>",
      to,
      reply_to: email,
      subject: `New enquiry: ${reason || "Website contact form"}`,
      text: `From: ${name} <${email}>\nReason: ${reason}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Email failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
