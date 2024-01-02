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
      const bearer_secret = process.env.BEARER_SECRET;
      if (!bearer_secret) {
        throw new Error("BEARER_SECRET is not defined");
      }

      const res = await import("@/app/api/users/email/[email]/route");
      const encodedEmail = base64encode(session.user.email);
      const userSecret = await generateUserSecret(session.user.email);
      const response = await res.GET({
        url: `/api/users/email/${encodedEmail}`,
      } as NextRequest);

      if (!response.ok) {
        return session;
      }

      const json = await response.json();
      return {
        ...session,
        user: {
          ...json.user,
          secret: userSecret,
        },
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

        // Verify the users credentials
        const hashedPassword = await sha256(credentials.password);
        const res = await import("@/app/api/users/validate-credentials/route");
        const response = await res.POST({
          url: "/api/users/validate-credentials",
          json: async () => ({
            email: credentials.email,
            password: hashedPassword,
          }),
        } as NextRequest);

        if (!response.ok) {
          return null;
        }

        // Verify that the password is valid
        const json = await response.json();
        if (!json.valid) {
          return null;
        }

        return json.user as User;
      },
    }),
  ],
});
