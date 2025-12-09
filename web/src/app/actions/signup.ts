"use server";
import bcrypt from "bcrypt";
import prisma from "../../lib/db";

enum Role {
  Developer = "Developer",
  Team_Lead = "Team_Lead",
  Admin = "Admin",
}
export async function CreateUser(prevState: any, formData: FormData) {
  try {
    const name = formData.get("fullname") as string;
    const useremail = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmpassword") as string;
    const organame = formData.get("orgname") as string;
    const roleValue = formData.get("role") as keyof typeof Role;

    if (password !== confirmPassword) {
      return { message: "Confirm password is not matching to password" };
    }
    if (password.length < 8) {
      return { message: "password must be minimum 8 character" };
    }
    if (!name || !useremail || !password || !roleValue) {
      return { message: "please fill all the required details" };
    }
    const saltRound = 10;
    const hashpassword = bcrypt.hashSync(password, saltRound);
    const response = await prisma.user.create({
      data: {
        name: name,
        email: useremail,
        password: hashpassword,
        organizationName: organame,
        role: roleValue,
      },
    });
    console.log(response);
    return { message: "User Signup successfully" };
  } catch (error) {
    console.log("this is the error occured", error);
    return { message: "some Invalid error has occured", error };
  }
}
