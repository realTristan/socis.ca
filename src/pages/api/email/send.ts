import { type NextApiRequest, type NextApiResponse } from "next";
import generateResetCode from "../_lib/generateResetCode";
import generateResetUrl from "../_lib/generateResetUrl";

const SMTP_BODY = (email: string, resetUrl: string) => {
  return {
    api_key: process.env.SMTP2GO_API_KEY,
    to: [`<${email}>`],
    sender: "socis@simpsonresearch.ca",
    subject: "SOCIS Password Reset",
    text_body: `Your password reset link is: ${resetUrl}\n\nThis link will expire in 10 minutes.`,
    html_body: `<p>Your password reset link is: <strong>${resetUrl}</strong></p><p>This link will expire in 10 minutes.</p>`,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate reset code
  const timeInMinutes = Math.floor(Date.now() / 1000 / 60);
  const resetCode = await generateResetCode(email, timeInMinutes);
  const resetUrl = await generateResetUrl(email, resetCode);

  // Send email
  const body = SMTP_BODY(email, resetUrl);
  const apiUrl = process.env.SMTP2GO_API_BASE_URL + "/email/send";

  if (!apiUrl) {
    return res.status(500).json({ message: "SMTP2GO API URL not set" });
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const smtp_response = await response.text();
    return res
      .status(500)
      .json({ message: "SMTP2GO API error", smtp_response });
  }

  return res.status(200).json({ message: "Email sent" });
}
