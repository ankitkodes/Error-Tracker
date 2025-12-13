import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    email?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
