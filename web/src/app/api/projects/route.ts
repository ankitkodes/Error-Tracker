import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { ProjectSchema } from "@/modules/project/project.types";
import { AddProject, GetAllProject } from "@/modules/project/project.service";

// add project 
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Please login or Signup" });
    }

    const body = await req.json();
    const data = await ProjectSchema.parseAsync(body);

    await AddProject(Number(session.user.id), data);
    return NextResponse.json({
      message: "project added successfully",
    });

  } catch (error) {
    return NextResponse.json({ message: "Unable to add Project", error });
  }
}

// get all project 
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "please login or signup" });
    }

    const projectdetails = await GetAllProject(Number(session.user.id));

    return NextResponse.json({
      message: "Successfully Project fetched", projectdetails
    });
  } catch (error) {
    return NextResponse.json({ message: "Unable to fetch the Project", error });
  }
}
