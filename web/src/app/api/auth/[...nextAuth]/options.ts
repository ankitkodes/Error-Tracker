// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// interface signInProvider {
//   email: string;
//   password: string;
// }
// export const authOPtions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Enter Your email here",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials): Promise<any> {
//         if (!credentials) {
//           throw new Error("Please Enter Your credentails");
//         }
//         const { email, password } = credentials as signInProvider;
//         try {
//           const user = await prisma.admin.findFirst({
//             where: {
//               email,
//             },
//           });
//           if (!user) {
//             throw new Error("No user found with this email");
//           }

//           const passwordVerified = await bcrypt.compare(
//             password,
//             user.password
//           );
//           if (passwordVerified) {
//             return user;
//           } else {
//             throw new Error("Invalid Password");
//           }
//         } catch (error: unknown) {
//           if (error instanceof Error) {
//             throw new Error(error.message);
//           }
//           throw new Error(String(error));
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user._id?.toString();
//         token.email = user.email?.toString();
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user._id = token._id as string;
//         session.user.email = token.email as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/signin",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const prisma = new PrismaClient();
