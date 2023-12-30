import { base64encode, sha256 } from "./crypto";

export async function generateUserSecret(email: string) {
  const bearerSecret: string | undefined = process.env.BEARER_SECRET;

  if (!bearerSecret) {
    throw new Error("BEARER_SECRET is not defined");
  }

  return await sha256(email + bearerSecret);
}

export function getTimeForAuthorizationToken(offset: number) {
  // Return the time in minutes
  return Math.floor(Date.now() / 1000 / 60) - offset;
}

export async function generateAuthorizationToken(email: string, time: number) {
  return await sha256(email + process.env.ACCOUNTS_SECRET + time.toString());
}

export async function generateEmailAuthorizationUrl(email: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const route = `/auth/signup/verify/`;

  const time = getTimeForAuthorizationToken(0);
  const token = await generateAuthorizationToken(email, time);
  const data = JSON.stringify({
    email,
    token,
  });

  const b64Encoded = base64encode(data);
  return `${baseUrl}${route}${b64Encoded}`;
}

export async function verifyAuthorizationToken(
  time: number,
  token: string,
  email: string,
) {
  // Check if the provided token was create in the past 10 minutes
  for (let i = -1; i < time; i++) {
    const time = getTimeForAuthorizationToken(i);
    const generatedToken = await generateAuthorizationToken(email, time);

    if (generatedToken === token) {
      return true;
    }
  }
  return false;
}
