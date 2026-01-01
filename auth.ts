import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in the database
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        // Check if user exists and password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // Return null if user not found or password doesn't match
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, trigger }: any) {
      // Set the user id and role from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = token.name;
      } else {
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to token
      if (user) {
        token.role = user.role;

        if (user.name === "NO_NAME") {
          token.name = user.email?.split("@")[0] || "User";

          // Update name in database
          try {
            await prisma.user.update({
              where: { id: user.id },
              data: { name: token.name },
            });
          } catch (error) {
            console.error("Failed to update user name:", error);
          }
        }
      }

      // Handle session updates from client
      if (trigger === "update" && session) {
        token.name = session.user?.name;
        token.role = session.user?.role;
      }

      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);