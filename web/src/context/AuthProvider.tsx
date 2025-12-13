"use client";
import { SessionProvider } from "next-auth/react";

export default function App({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
