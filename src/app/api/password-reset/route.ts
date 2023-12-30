import { verifyPasswordResetToken } from "@/app/api/_lib/passwordReset";
import { Response } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, token, password } = await req.json();
  if (!token || !email || !password) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  const isValidToken = await verifyPasswordResetToken(email, token);
  if (!isValidToken) {
    return NextResponse.json(Response.InvalidToken, { status: 400 });
  }

  // TODO: Update password in database

  return NextResponse.json(Response.Success, { status: 200 });
}
