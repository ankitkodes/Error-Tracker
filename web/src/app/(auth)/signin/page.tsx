"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock, Loader2, Bug } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      toast.error("Invalid email or password");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-12">
      <ToastContainer theme="dark" />

      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="p-2 rounded-lg bg-[#00ffb2]">
            <Bug className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold">BugTrace</span>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-sm text-[#d5d5d5]">
            Sign in to BugTrace to continue monitoring your applications
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#d5d5d5] mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="your.email@company.com"
                className="w-full h-11 rounded-lg bg-[#0a0a0a] border border-[#202026] pl-10 pr-4 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#d5d5d5]"
              >
                Password
              </label>
              {/* <Link
                href="/forgot-password"
                className="text-xs text-[#00ffb2] hover:text-[#66ffd1] transition"
              >
                Forgot password?
              </Link> */}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="w-full h-11 rounded-lg bg-[#0a0a0a] border border-[#202026] pl-10 pr-10 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full bg-[#00ffb2] hover:bg-[#66ffd1] text-black font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-[#d5d5d5]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#00ffb2] hover:text-[#66ffd1] font-semibold transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
