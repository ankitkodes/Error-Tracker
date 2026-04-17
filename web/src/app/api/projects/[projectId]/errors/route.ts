import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ProjectError } from "@/modules/errors/error.service";

// error of specific project
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> },
) {
  try {
    const { projectId } = await context.params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "please login and signup" });
    }
    const errors = await ProjectError(projectId);
    return NextResponse.json({
      message: "successfully fetched all the error",
      errors,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "unable to fetch error" });
  }
}
