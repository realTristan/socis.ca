import { Permission } from "@/types/types";
import { type Session, type User } from "next-auth";
import { type ChangeEvent } from "react";
import PermissionCheckbox from "./PermissionCheckbox";

interface PermissionsListProps {
  session: Session;
  user: User;
  onChange: (e: ChangeEvent<HTMLInputElement>, permission: Permission) => void;
}
export default function PermissionsList(
  props: PermissionsListProps,
): JSX.Element {
  const { session, user, onChange } = props;

  return (
    <div className="flex flex-row items-center justify-center gap-7">
      <PermissionCheckbox
        disabled={user.id === session.user.id}
        onChange={(e) => onChange(e, Permission.ADMIN)}
        defaultSelected={user.permissions.includes(Permission.ADMIN)}
      >
        Admin
      </PermissionCheckbox>
      <PermissionCheckbox
        onChange={(e) => onChange(e, Permission.CREATE_EVENT)}
        defaultSelected={user.permissions.includes(Permission.CREATE_EVENT)}
      >
        Create Events
      </PermissionCheckbox>
      <PermissionCheckbox
        onChange={(e) => onChange(e, Permission.EDIT_EVENT)}
        defaultSelected={user.permissions.includes(Permission.EDIT_EVENT)}
      >
        Edit Events
      </PermissionCheckbox>
      <PermissionCheckbox
        onChange={(e) => onChange(e, Permission.DELETE_EVENT)}
        defaultSelected={user.permissions.includes(Permission.DELETE_EVENT)}
      >
        Delete Events
      </PermissionCheckbox>
    </div>
  );
}
