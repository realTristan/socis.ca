import { hasPermissions } from "@/lib/permissions";
import { Permission } from "@/types/types";
import { type User } from "next-auth";
import Link from "next/link";

export default function AdminConsoleList({
  user,
}: {
  user: User;
}): JSX.Element {
  const isAdmin = hasPermissions(user, [Permission.ADMIN]);

  if (!isAdmin) {
    return <></>;
  }

  return (
    <div className="mt-4 flex flex-col items-start justify-start gap-3">
      <h1 className="text-center text-3xl font-bold text-white">
        Admin Console
      </h1>
      <Link
        href="/auth/account/manage-users"
        className="rounded-lg border border-emerald-500 px-10 py-3 text-center font-light text-white hover:bg-emerald-900/50"
      >
        $ option.manage_users
      </Link>
    </div>
  );
}
