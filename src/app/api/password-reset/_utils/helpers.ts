import { base64encode, sha256 } from "@/lib/crypto";

const SECRET = process.env.ACCOUNTS_SECRET;

export async function generatePasswordResetToken(
  email: string,
  timeInMinutes: number,
) {
  return await sha256(`${SECRET}${email}${timeInMinutes}`);
}

export function generatePasswordResetUrl(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const path = "/auth/reset-password";

  const data = {
    email,
    token,
  };

  const json = JSON.stringify(data);
  const encodedJson = base64encode(json);

  return `${baseUrl}${path}/${encodedJson}`;
}

export async function verifyPasswordResetToken(
  email: string,
  token: string,
): Promise<boolean> {
  for (let i = -1; i < 10; i++) {
    const timeInMinutes = Math.floor(Date.now() / 1000 / 60) - i;
    const _token = await generatePasswordResetToken(email, timeInMinutes);

    if (_token === token) {
      return true;
    }
  }

  return false;
}
