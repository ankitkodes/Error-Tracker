import { NextRequest, NextResponse } from "next/server";
import NextAuth, { AuthOptions } from "next-auth";
import { authOPtions } from "./options";

const handler = NextAuth(authOPtions);

export { handler as GET, handler as POST };
