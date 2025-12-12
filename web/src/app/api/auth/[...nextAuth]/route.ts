import { NextRequest, NextResponse } from "next/server";
import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
//
