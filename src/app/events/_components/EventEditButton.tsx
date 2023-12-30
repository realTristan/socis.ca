import { hasPermissions } from "@/lib/permissions";
import { Event, Permission } from "@/lib/types";
import { type User } from "next-auth";
import Link from "next/link";

export default function EventEditButton({
  event,
  user,
}: {
  event: Event;
  user: User | null;
}): JSX.Element {
  if (!user) {
    return <></>;
  }

  const canEditEvents = hasPermissions(user, [Permission.EDIT_EVENT]);
  if (!canEditEvents) {
    return <></>;
  }

  return (
    <Link
      href={`/events/${event.id}/edit`}
      className="mt-4 flex h-12 flex-col items-center justify-center rounded-lg border border-emerald-500 px-4 text-center text-sm font-thin text-white hover:bg-emerald-900/50"
    >
      Edit
    </Link>
  );
}
