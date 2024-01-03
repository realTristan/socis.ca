import { Prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { genId, sha256 } from "@/lib/crypto";
import { hasPermissions } from "@/lib/permissions";
import { Permission } from "@/types/types";
import { verifyAuthorizationToken } from "@/lib/auth";

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
  const { name, email, image, password, token } = await req.json();
  if (!email || !token) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  const validToken = await verifyAuthorizationToken(20, token, email);
  if (!validToken) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  if (!email.endsWith("@uoguelph.ca")) {
    return NextResponse.json(Response.InvalidQuery, { status: 400 });
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
        name: user.name,
        email,
        image: user.image,
        permissions: user.permissions,
      },
      ...Response.Success,
    },
    { status: 200 },
  );
}

/**
 * Update an user in the users database
 * @param req The request object
 * @returns The response object
 */
export async function PUT(req: NextRequest) {
  // Get the user id and data from the request body
  const { userId, data } = await req.json();
  if (!userId || !data) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // Get the authorization from the headers
  const secret = req.headers.get("Authorization");
  if (!secret) {
    return NextResponse.json(Response.InvalidHeaders, { status: 400 });
  }

  // Verify that the user has the correct permissions
  const user = await Prisma.getUser(secret);
  if (!user) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  if (user.id !== userId && !hasPermissions(user, [Permission.ADMIN])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  // Verify the name is less than 50 characters
  if (data.name && (data.name.length > 50 || data.name.length < 1)) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  return await Prisma.updateUserById(userId, data)
    .then((user) => {
      return NextResponse.json({ user, ...Response.Success }, { status: 200 });
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}
