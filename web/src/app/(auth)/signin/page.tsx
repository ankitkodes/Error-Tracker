"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignIn() {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/";
    }
  }

  return (
    <>
      <div className="bg-white text-black h-screen w-screen flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            className="border p-2 rounded text-black"
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            className="border p-2 rounded text-black"
            type="password"
            placeholder="Enter your password here"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 text-white p-2 rounded px-4 hover:bg-blue-600"
          onClick={handleSignIn}
        >
          Login
        </button>
      </div>
    </>
  );
}
