import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

interface signInProvider {
  email: string;
  password: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your email here",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Please enter your credentials");
        }
        const { email, password } = credentials as signInProvider;
        try {
          const user = await prisma.user.findFirst({
            where: {
              email,
            },
          });
          if (!user) {
            throw new Error("No user found with this email");
          }

          const passwordVerified = await bcrypt.compare(
            password,
            user.password
          );

          if (passwordVerified) {
            return { ...user, id: user.id.toString() } as User;
          } else {
            throw new Error("Invalid Password");
          }
        } catch (error: unknown) {
          console.error("Authorize error:", error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error(String(error));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
        token.email = user.email?.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
