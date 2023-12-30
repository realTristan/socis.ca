import { Permission } from "@/lib/types";
import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    image: string;
    secret: string | null;
    permissions: Permission[];
  }

  interface Session {
    user: User;
  }
}
