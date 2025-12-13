"use client";
import { CreateUser } from "@/app/actions/signup";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
const initialState = {
  message: "",
};
export default function Page() {
  const [state, formAction, pending] = useActionState(CreateUser, initialState);
  const router = useRouter();
  useEffect(() => {
    toast.error(state.message);
    if (state.success == true) {
      router.push("/signin");
    }
  }, [state, router]);
  return (
    <>
      <div className="bg-white text-black h-screen w-screen flex  items-center justify-center">
        <div className="border-2 rounded px-8 py-4 max-w-max">
          <div className="text-center">
            <p className="text-2xl font-semibold leading-none">
              Create your account
            </p>
            <p className="text-muted-foreground text-sm font-normal leading-normal py-1">
              Enter your email below to create your account
            </p>
          </div>

          <div>
            <form action={formAction}>
              <div className="py-1">
                <div className="font-medium mb-1">
                  <label htmlFor="fullname">Full Name</label>{" "}
                  <span className="text-red-600">*</span>
                </div>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  required
                  className="border-2 focus:outline-zinc-700 rounded-md px-2 py-1 w-full"
                />
              </div>
              <div className="py-1">
                <div className="font-medium mb-1">
                  <label htmlFor="email">Email</label>
                  <span className="text-red-600">*</span>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="border-2 focus:outline-zinc-700 rounded-md px-2 py-1 w-full"
                />
              </div>
              <div className="py-1">
                <div className="font-medium mb-1">
                  <label htmlFor="password">Password</label>
                  <span className="text-red-600">*</span>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="border-2 focus:outline-zinc-700 rounded-md px-2 py-1 w-full"
                />
              </div>
              <div className="py-1">
                <div className="font-medium mb-1">
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <span className="text-red-600">*</span>
                </div>
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  required
                  className="border-2 focus:outline-zinc-700 rounded-md px-2 py-1 w-full"
                />
              </div>
              <div className="py-1">
                <div className="font-medium mb-1">
                  <label htmlFor="organizationname">
                    Organization Name <span>(Optional)</span>
                  </label>
                </div>
                <input
                  type="text"
                  id="orgname"
                  name="orgname"
                  className="border-2 focus:outline-zinc-700 rounded-md px-2 py-1 w-full"
                />
              </div>
              <div className="py-1">
                <div className="font-medium mb-1">
                  <label htmlFor="role">Role</label>
                  <span className="text-red-600">*</span>
                </div>
                <select
                  id="role"
                  name="role"
                  required
                  className="border-2 focus:outline-zinc-700 rounded-md px-2 py-1 w-full"
                >
                  <option>Select your role</option>
                  <option value="Developer">Developer</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="mt-2">
                <button className="bg-black text-white w-full rounded-md py-2 my-2 cursor-pointer">
                  {pending ? "Creating Account..." : "Create Account"}
                </button>
              </div>
              <div className="flex">
                <p>Already have an account?</p>
                <Link href="/signin" className="underline cursor-pointer">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
