import Link from "next/link";
import { FieldDescription, Fieldtitle } from "./ui/Field";
import Input from "./ui/input";

export default function SigninForm() {
  return (
    <>
      <div className="border-2 rounded px-8 py-4">
        <div className="text-center">
          <Fieldtitle title="Welcome Back" />
          <FieldDescription description="Sign in to your BugTrace account" />
        </div>
        <div>
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
        </div>
        <button className="w-full rounded text-white bg-black py-2">
          Sign In
        </button>
        {/* <div>or continue with</div> */}

        <div className="flex">
          <FieldDescription description="Don't have an account?" />{" "}
          <Link href="/signup" className="underline cursor-pointer">
            Sign up
          </Link>{" "}
        </div>
      </div>
    </>
  );
}
