import { hasPermissions } from "@/lib/permissions";
import { Permission } from "@/lib/types";
import { User } from "next-auth";
import Link from "next/link";

export default function AdminOptionsList({
  user,
}: {
  user: User;
}): JSX.Element {
  const isAdmin = hasPermissions(user, [Permission.ADMIN]);

  if (!isAdmin) {
    return <></>;
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      <Link
        href="/auth/account/manage-users"
        className="rounded-lg border border-emerald-500 px-10 py-3 text-center font-light text-white hover:bg-emerald-900/50"
      >
        $ option.manage_users
      </Link>
    </div>
  );
}
