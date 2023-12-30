import { Permission } from "@/lib/types";

export function PermissionToString(permission: Permission) {
  switch (permission) {
    case Permission.DEFAULT:
      return "DEFAULT";
    case Permission.ADMIN:
      return "ADMIN";
    case Permission.CREATE_EVENT:
      return "CREATE_EVENT";
    case Permission.DELETE_EVENT:
      return "DELETE_EVENT";
    case Permission.EDIT_EVENT:
      return "EDIT_EVENT";
  }
}
