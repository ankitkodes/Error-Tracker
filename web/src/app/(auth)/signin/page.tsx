"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <>
      <div className="bg-white text-black h-screen w-screen flex  items-center justify-center">
        <div className="border-2 rounded px-8 py-4 max-w-max">
          <div className="text-center">
            <p className="text-2xl font-semibold leading-none">
              Sign in to BugTrace
            </p>
            <p className="text-muted-foreground text-sm font-normal leading-normal py-1">
              Monitor and fix production errors in real time.
            </p>
          </div>
          <div className="py-1">
            <div className="font-medium mb-1">
              <label>Email</label>
              <span className="text-red-600">*</span>
            </div>
            <input
              className="border-2 focus:outline-zinc-700 rounded-md px-2 py-1 w-full"
              required
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-1">
            <div className="font-medium mb-1">
              <label>Password</label>
              <span className="text-red-600">*</span>
            </div>
            <input
              className="border p-2 rounded text-blackborder-2 focus:outline-zinc-700 rounded-md px-2 py-1 w-full"
              type="password"
              placeholder="Enter your password here"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-2">
            {" "}
            <button
              className="bg-black text-white w-full rounded-md py-2 my-2 cursor-pointer"
              onClick={handleSignIn}
            >
              Login
            </button>
          </div>
          <div className="flex">
            <p>New here create an account</p>
            <Link href="/signup" className="underline cursor-pointer">
              SignUp
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
