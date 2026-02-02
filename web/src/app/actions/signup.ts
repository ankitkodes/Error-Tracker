"use server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

enum Role {
  Developer,
  Team_Lead,
  Admin,
}
export async function CreateUser(prevState: unknown, formData: FormData) {
  try {
    const name = formData.get("fullname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmpassword") as string;
    const organizationName = formData.get("orgname") as string;
    const role = formData.get("role") as keyof typeof Role;

    if (password !== confirmPassword) {
      return { message: "Confirm password is not matching to password" };
    }
    if (password.length < 8) {
      return { message: "password must be minimum 8 character" };
    }
    if (!name || !email || !password || !role) {
      return { message: "please fill all the required details" };
    }
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExist) {
      return { message: "user already Exist" };
    }
    const saltRound = 10;
    const hashpassword = bcrypt.hashSync(password, saltRound);
    const response = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashpassword,
        organizationName: organizationName,
        role: role,
      },
    });
    console.log(response);
    return { success: true };
  } catch (err) {
    console.log("this is the error occured", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { message: "some Invalid error has occured", error: errorMessage };
  }
}
