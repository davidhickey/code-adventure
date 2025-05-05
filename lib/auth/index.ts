import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace with your DB check (e.g., Prisma, Supabase, etc.)
        const user = { id: "1", name: "Jane", email: "jane@example.com" };

        if (
          credentials?.email === "jane@example.com" &&
          credentials?.password === "password123"
        ) {
          return user;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};