import { hasPermissions } from "@/lib/permissions";
import { Permission } from "@/lib/types";
import { type User } from "next-auth";

export default function DeleteButton({
  user,
}: {
  user: User | null;
}): JSX.Element {
  if (!user) {
    return <></>;
  }

  const canDeleteEvents = hasPermissions(user, [Permission.DELETE_EVENT]);
  if (!canDeleteEvents) {
    return <></>;
  }

  return (
    <div className="absolute right-4 top-4">
      <button className="rounded-lg border border-emerald-500 px-10 py-3 font-thin text-white hover:bg-emerald-900/50">
        Delete
      </button>
    </div>
  );
}
