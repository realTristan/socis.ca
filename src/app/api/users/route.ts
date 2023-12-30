import { Prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { genId, sha256 } from "@/lib/crypto";

/**
 * Get all of the users
 * @param req The request object
 * @returns The response object
 */
export async function GET() {
  return await Prisma.getUsers()
    .then((users) => {
      return NextResponse.json({ users, ...Response.Success }, { status: 200 });
    })
    .catch(() => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}

/**
 * Add an user to the users database
 * @param req The request object
 * @returns The response object
 */
export async function POST(req: NextRequest) {
  // Get the user's info from the request body
  const { name, email, image, password } = await req.json();
  if (!email) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // Generate a new user secret
  const bearerSecret = process.env.BEARER_SECRET;
  if (!bearerSecret) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  // Get the user's info
  const secret: string = await sha256(email + bearerSecret);
  let user = await Prisma.getUser(secret).catch(() => null);

  // If the user doesn't exist, create them
  if (!user) {
    const id: string = await genId();
    user = await Prisma.createUser(
      id,
      name,
      email,
      password,
      image,
      secret,
    ).catch(() => null);
  }

  // If the user couldn't be created, return an error
  if (!user) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  // Return the user's info
  return NextResponse.json(
    {
      user: {
        id: user.id,
        name,
        email,
        image,
        permissions: user.permissions,
      },
      ...Response.Success,
    },
    { status: 200 },
  );
}
