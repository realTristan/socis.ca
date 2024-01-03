import { Prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";

/**
 * Add an user to the users database
 * @param req The request object
 * @returns The response object
 */
export async function POST(req: NextRequest) {
  // Get the user's info from the request body
  const { email, password } = await req.json();
  if (!password) {
    return NextResponse.json(
      {
        ...Response.InvalidBody,
        valid: false,
        user: null,
      },
      { status: 400 },
    );
  }

  // Get the user's info
  const user = await Prisma.getUserByEmail(email).catch(() => null);
  if (!user) {
    return NextResponse.json(
      { ...Response.InvalidQuery, valid: false, user: null },
      { status: 400 },
    );
  }

  // Return the user's info and whether or not the password is valid
  return NextResponse.json(
    {
      valid: password === user.password,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        secret: user.secret,
        permissions: user.permissions,
      },
      ...Response.Success,
    },
    { status: 200 },
  );
}
