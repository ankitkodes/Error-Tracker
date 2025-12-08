import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    email?: string;
  }

  interface Session {
    user: {
      _id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
