import { User } from "next-auth";
import { Permission } from "./types";

export function hasPermissions(user: User, permissions: Permission[]): boolean {
  return (
    permissions.every(
      (permission) => user?.permissions?.includes(permission),
    ) || user?.permissions?.includes(Permission.ADMIN)
  );
}
