import { Response } from "@/lib/responses";
import {
  generatePasswordResetToken,
  generatePasswordResetUrl,
} from "../../_lib/passwordReset";
import { type NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.SMTP_PROVIDER_API_KEY;
const API_URL = process.env.SMTP_PROVIDER_BASE_URL + "/email/send";

function generateEmailRequestBody(email: string, resetUrl: string) {
  return {
    api_key: API_KEY,
    to: [`<${email}>`],
    sender: "socis@simpsonresearch.ca",
    subject: "SOCIS Password Reset",
    text_body: `Your password reset link is: ${resetUrl}\n\nThis link will expire in 10 minutes.`,
    html_body: `<p>Your password reset link is: <strong>${resetUrl}</strong></p><p>This link will expire in 10 minutes.</p>`,
  };
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // Generate reset token
  const timeInMinutes = Math.floor(Date.now() / 1000 / 60);
  const resetToken = await generatePasswordResetToken(email, timeInMinutes);
  const resetUrl = generatePasswordResetUrl(email, resetToken);

  // Send email
  const body = generateEmailRequestBody(email, resetUrl);
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  return NextResponse.json(Response.Success, { status: 200 });
}
