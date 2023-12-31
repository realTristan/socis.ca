import { Prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { Response } from "@/lib/responses";
import { genId } from "@/lib/crypto";
import { hasPermissions } from "@/lib/permissions";
import { Permission } from "@/types/types";

/**
 * Get all of the events
 * @param req The request object
 * @returns The response object
 */
export async function GET() {
  return await Prisma.getEvents()
    .then((events) => {
      return NextResponse.json(
        { events, ...Response.Success },
        { status: 200 },
      );
    })
    .catch(() => {
      return NextResponse.json(Response.InternalError, { status: 500 });
    });
}

/**
 * Add an event to the events database
 * @param req The request object
 * @returns The response object
 */
export async function POST(req: NextRequest) {
  // Get the event's info from the request body
  const { name, description, date, location, perks } = await req.json();
  if (!name || !description || !date || !location) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
  }

  // Generate a new event secret
  const bearerSecret = process.env.BEARER_SECRET;
  if (!bearerSecret) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  // Verify that the user has the correct permissions (auth header)
  const auth = req.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 401 });
  }

  const user = await Prisma.getUser(auth).catch(() => null);
  if (!user) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 401 });
  }

  if (!hasPermissions(user, [Permission.CREATE_EVENT])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 403 });
  }

  // Create the event
  const id: string = await genId();
  const event = await Prisma.createEvent({
    id,
    name,
    description,
    date,
    location,
    image: "/images/event-banner-tmp1.png",
    perks: perks || [],
    isBest: false,
  }).catch((err) => {
    console.log(err);
    return null;
  });

  // If the event couldn't be created, return an error
  if (!event) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  // Return the event's info
  return NextResponse.json(
    {
      event,
      ...Response.Success,
    },
    { status: 200 },
  );
}

/**
 * Update an event in the events database
 * @param req The request object
 * @returns The response object
 */
export async function PUT(req: NextRequest) {
  // Get the event id and data from the request body
  const { eventId, data } = await req.json();
  if (!eventId || !data) {
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

  if (!hasPermissions(user, [Permission.EDIT_EVENT])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  // Update the event
  const event = await Prisma.updateEvent(eventId, data).catch(() => null);

  // If the event couldn't be updated, return an error
  if (!event) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  // Return the event's info
  return NextResponse.json(
    {
      event,
      ...Response.Success,
    },
    { status: 200 },
  );
}

/**
 * Delete an event from the events database
 * @param req The request object
 * @returns The response object
 */
export async function DELETE(req: NextRequest) {
  // Get the event id from the request body
  const { eventId } = await req.json();
  if (!eventId) {
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

  if (!hasPermissions(user, [Permission.DELETE_EVENT])) {
    return NextResponse.json(Response.InvalidAuthorization, { status: 400 });
  }

  // Delete the event
  const event = await Prisma.deleteEvent(eventId).catch(() => null);

  // If the event couldn't be deleted, return an error
  if (!event) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  // Return the event's info
  return NextResponse.json(
    {
      event,
      ...Response.Success,
    },
    { status: 200 },
  );
}
