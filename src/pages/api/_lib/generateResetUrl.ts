import { base64encode } from "@/lib/crypto";

export default function generateResetUrl(email: string, resetCode: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const path = "/auth/reset-password";

  const data = {
    email,
    code: resetCode,
  };

  const json = JSON.stringify(data);
  const base64 = base64encode(json);

  return `${baseUrl}${path}/${base64}`;
}
