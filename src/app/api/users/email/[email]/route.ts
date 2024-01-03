import { type NextRequest, NextResponse } from "next/server";
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
  const user = await Prisma.getUserByEmail(decodedEmail).catch(() => null);

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
