import { verifyPasswordResetToken } from "@/app/api/password-reset/_utils/helpers";
import { generateUserSecret } from "@/lib/auth";
import { Prisma } from "@/lib/prisma";
import { Response } from "@/lib/responses";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, token, password } = await req.json();
  if (!token || !email || !password) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  const isValidToken = await verifyPasswordResetToken(email, token);
  if (!isValidToken) {
    return NextResponse.json(Response.InvalidToken, { status: 400 });
  }

  const userSecret = await generateUserSecret(email);
  await Prisma.updateUserPassword(userSecret, password).catch(() => {
    return NextResponse.json(Response.InternalError, { status: 500 });
  });

  return NextResponse.json(Response.Success, { status: 200 });
}
