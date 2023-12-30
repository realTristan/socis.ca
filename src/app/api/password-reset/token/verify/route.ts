import { verifyPasswordResetToken } from "@/app/api/_lib/passwordReset";
import { type NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";

export async function POST(req: NextRequest) {
  const { email, token } = await req.json();
  if (!token || !email) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  const isValidToken = await verifyPasswordResetToken(email, token);
  return isValidToken
    ? NextResponse.json(Response.Success, { status: 200 })
    : NextResponse.json(Response.InvalidToken, { status: 400 });
}
