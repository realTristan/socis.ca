import { sha256 } from "@/lib/crypto";

const SECRET = process.env.FORGOT_PASSWORD_SECRET;

export default async function generateResetCode(
  email: string,
  timeInMinutes: number,
) {
  return await sha256(`${SECRET}${email}${timeInMinutes}`);
}

// const timeInMinutes = Math.floor(Date.now() / 1000 / 60);
