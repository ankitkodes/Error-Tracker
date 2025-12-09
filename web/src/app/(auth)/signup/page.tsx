"use client";
import { CreateUser } from "@/app/actions/signup";
import SignupForm from "@/components/Signup-Form";
import { useActionState } from "react";
const initialState = {
  message: "",
};
export default function Page() {
  const [state, formAction, pending] = useActionState(CreateUser, initialState);
  return (
    <>
      <div className="bg-white text-black h-screen w-screen flex  items-center justify-center">
        {/* <SignupForm /> */}

        <div>
          <form action={formAction}>
            <div>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                className="border-2"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="border-2"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="border-2"
              />
            </div>
            <div>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                required
                className="border-2"
              />
            </div>
            <div>
              <label htmlFor="organizationname">
                Organization Name <span>(Optional)</span>
              </label>
              <input
                type="text"
                id="orgname"
                name="orgname"
                required
                className="border-2"
              />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <select id="role" name="role" required className="border-2">
                <option>Select your role</option>
                <option value="Developer">Developer</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="text-red-500">{state.message}</div>

            <button className="cursor-pointer">Create account</button>
          </form>
        </div>
      </div>
    </>
  );
}
