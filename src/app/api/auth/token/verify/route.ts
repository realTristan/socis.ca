import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { verifyAuthorizationToken } from "@/lib/auth";
import { Prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  // Get the email and token from the request body
  const { email, token } = await req.json();
  if (!email || !token) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // Check if the user already exists
  const user = await Prisma.getUserByEmail(email);
  if (user) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  const result = await verifyAuthorizationToken(10, token, email);
  return result
    ? NextResponse.json(Response.Success, { status: 200 })
    : NextResponse.json(Response.InvalidToken, { status: 400 });
}
