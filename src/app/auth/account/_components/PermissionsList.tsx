import { Permission } from "@/lib/types";
import { User } from "next-auth";
import { PermissionToString } from "../_utils/permissions";

export default function PermissionsList({ user }: { user: User }): JSX.Element {
  function PermissionLabel({
    permission,
  }: {
    permission: Permission;
  }): JSX.Element {
    return (
      <div className="w-fit rounded-md border border-emerald-500 bg-emerald-950/50 px-2 py-1 text-xs font-thin text-white">
        {PermissionToString(permission)}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {user.permissions.map((permission) => (
        <PermissionLabel permission={permission} />
      ))}
    </div>
  );
}
