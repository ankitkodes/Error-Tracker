import Input from "@/components/ui/input";
import Link from "next/link";
import { FieldDescription, Fieldtitle } from "./ui/Field";

export default function SignupForm() {
  return (
    <>
      <div className="border-2 rounded px-8 py-4 max-w-max">
        <div className="text-center">
          <Fieldtitle title="Create your account" />
          <FieldDescription description="Enter your email below to create your account" />
        </div>
        <form action={} className="py-6">
          <Input
            label="Full Name"
            id="name"
            type="text"
            className="w-full"
            placeholder="Alok mishra"
            required={true}
          />
          <Input
            label="Email"
            id="name"
            type="email"
            className="w-full"
            placeholder="example@gmail.com"
          />
          <Input
            label="password"
            id="name"
            type="password"
            className="w-full"
          />
          <Input
            label="Confirm password"
            id="name"
            type="password"
            className="w-full"
          />
          <FieldDescription description="Must be atleast 8 characters long" />
          <div className="mt-2">
            <button className="bg-black text-white w-full rounded-md py-2 my-2 cursor-pointer">
              Create Account
            </button>
          </div>

          <div className="flex">
            <FieldDescription description="Already have an account?" />
            <Link href="/signin" className="underline cursor-pointer">
              Sign in
            </Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
