import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { verifyPassword } from "./utils";
import { prisma } from "../prismaClient";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("No credentials provided");
          }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

          if (!user) {
            throw new Error("User not found");
          }

          const isValid = await verifyPassword(credentials.password, user.password);

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null;
        }
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