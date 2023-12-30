import { type NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { generateEmailAuthorizationUrl } from "@/lib/auth";

async function generateEmailRequestBody(email: string) {
  const api_key = process.env.SMTP_PROVIDER_API_KEY;
  const url = await generateEmailAuthorizationUrl(email);

  return {
    api_key,
    to: [`<${email}>`],
    sender: "socis@simpsonresearch.ca",
    subject: "SOCIS Account Creation",
    text_body: `Your account creation link is: ${url}\n\nThis link will expire in 10 minutes.`,
    html_body: `<p>Your account creation link is: <a href="${url}">${url}</a></p><p>This link will expire in 10 minutes.</p>`,
  };
}

export async function POST(req: NextRequest) {
  // Get the user's info from the request body
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // Send an email to the user
  const baseUrl = process.env.SMTP_PROVIDER_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  // Generate the body and send the http request
  const body = await generateEmailRequestBody(email);
  const response = await fetch(`${baseUrl}/email/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  // Check if the request was successful
  if (!response.ok) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  return NextResponse.json(Response.Success, { status: 200 });
}
