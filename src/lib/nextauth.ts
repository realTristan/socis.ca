import NextAuth, { type User } from "next-auth";
import { base64encode, sha256 } from "./crypto";
import Credentials from "next-auth/providers/credentials";
import { generateUserSecret } from "./auth";
import { type NextRequest } from "next/server";

export const handler = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session }) {
      const user = session.user as User;
      if (!user) {
        return session;
      }

      const res = await import("@/app/api/users/email/[email]/route");
      const encodedEmail = base64encode(user.email);
      const response = await res.GET({
        url: `/api/users/${encodedEmail}`,
      } as NextRequest);

      if (!response.ok) {
        return session;
      }

      const json = await response.json();
      return {
        ...session,
        user: json.user,
      };
    },
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Get the user from the database using the /api/users/[email] route
        const res = await import("@/app/api/users/email/[email]/route");
        const encodedEmail = base64encode(credentials.email);
        const userSecret = await generateUserSecret(credentials.email);
        const response = await res.POST({
          url: `/api/users/${encodedEmail}`,
          json: async () => ({
            password: true,
          }),

          headers: {
            get: (name: string) => (name === "Authorization" ? userSecret : ""),
          },
        } as NextRequest);

        if (!response.ok) {
          return null;
        }

        const json = await response.json();
        const user = json.user;

        // Check the password
        const hashedProvidedPassword = await sha256(credentials.password);
        if (hashedProvidedPassword !== user.password) {
          return null;
        }

        // Return the user
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          secret: userSecret,
          permissions: user.permissions,
        } as User;
      },
    }),
  ],
});
