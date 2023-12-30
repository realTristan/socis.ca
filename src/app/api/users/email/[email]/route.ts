import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { Prisma } from "@/lib/prisma";
import { base64decode } from "@/lib/crypto";

/**
 * Get an user from the users database by their email
 * @param req The request object
 * @returns The response object
 */
export async function GET(req: NextRequest) {
  // Get the email from the request query
  const email = req.url.split("/").pop();
  if (!email) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  // Get the user's info
  const decodedEmail = base64decode(email);
  const user = await Prisma.getUserByEmail(decodedEmail);

  // If the user doesn't exist, return an error
  if (!user) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  return NextResponse.json(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        permissions: user.permissions,
      },
      ...Response.Success,
    },
    { status: 200 },
  );
}

/**
 * Get an user from the users database by their email + extra params (such as password)
 * @param req The request object
 * @returns The response object
 */
export async function POST(req: NextRequest) {
  // Get the email from the request query
  const email = req.url.split("/").pop();
  if (!email) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  // Get the user's info
  const decodedEmail = base64decode(email);
  const user = await Prisma.getUserByEmail(decodedEmail);

  // If the user doesn't exist, return an error
  if (!user) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
  }

  // Get the authorization header and verify that it matches the user's secret
  const auth = req.headers.get("Authorization");
  if (!auth || auth !== user.secret) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 401 });
  }

  return NextResponse.json(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        permissions: user.permissions,
        password: user.password,
      },
      ...Response.Success,
    },
    { status: 200 },
  );
}
