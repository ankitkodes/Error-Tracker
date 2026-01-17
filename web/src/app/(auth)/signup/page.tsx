"use client";
import { CreateUser } from "@/app/actions/signup";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Building,
  Loader2,
  Briefcase,
  Bug,
} from "lucide-react";

const initialState = {
  message: "",
};

export default function Page() {
  const [state, formAction, pending] = useActionState(CreateUser, initialState);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log("this is value fo state ", state);
  useEffect(() => {
    if (state.success) {
      toast.success("Account created successfully!");
      setTimeout(() => router.push("/signin"), 1500);
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-12 overflow-y-auto">
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
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-sm text-[#d5d5d5]">
            Start tracking errors and monitoring your applications
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-[#d5d5d5] mb-1.5"
            >
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                placeholder="John Doe"
                className="w-full h-11 rounded-lg bg-[#0a0a0a] border border-[#202026] pl-10 pr-4 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#d5d5d5] mb-1.5"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@company.com"
                className="w-full h-11 rounded-lg bg-[#0a0a0a] border border-[#202026] pl-10 pr-4 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#d5d5d5] mb-1.5"
              >
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="••••••"
                  className="w-full h-11 rounded-lg bg-[#0a0a0a] border border-[#202026] pl-10 pr-10 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium text-[#d5d5d5] mb-1.5"
              >
                Confirm <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmpassword"
                  name="confirmpassword"
                  required
                  placeholder="••••••"
                  className="w-full h-11 rounded-lg bg-[#0a0a0a] border border-[#202026] pl-10 pr-10 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div>
            <label
              htmlFor="orgname"
              className="block text-sm font-medium text-[#d5d5d5] mb-1.5"
            >
              Organization Name{" "}
              <span className="text-[#666] text-xs font-normal">
                (Optional)
              </span>
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
              <input
                type="text"
                id="orgname"
                name="orgname"
                placeholder="Acme Inc."
                className="w-full h-11 rounded-lg bg-[#0a0a0a] border border-[#202026] pl-10 pr-4 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[#d5d5d5] mb-1.5"
            >
              Role <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666] z-10 pointer-events-none" />
              <select
                id="role"
                name="role"
                required
                className="w-full h-11 rounded-lg bg-[#0a0a0a] border border-[#202026] pl-10 pr-10 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
              >
                <option value="" disabled className="bg-[#0a0a0a]">
                  Select your role
                </option>
                <option value="Developer" className="bg-[#0a0a0a]">
                  Developer
                </option>
                <option value="Team_Lead" className="bg-[#0a0a0a]">
                  Team Lead
                </option>
                <option value="Admin" className="bg-[#0a0a0a]">
                  Admin
                </option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#666]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="w-full h-11 rounded-full bg-[#00ffb2] hover:bg-[#66ffd1] text-black font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {pending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-[#d5d5d5]">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-[#00ffb2] hover:text-[#66ffd1] font-semibold transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
