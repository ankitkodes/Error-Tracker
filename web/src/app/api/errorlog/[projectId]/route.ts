import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "please login and signup" });
    }

    console.log("the value of projectId of specific project", projectId);
    console.log("type of projectid", typeof projectId);
    const errorlog = await prisma.error.findMany({
      where: {
        projectId: projectId,
      },
    });
    return NextResponse.json({
      message: "successfully fetched all the error",
      errorlog,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "unable to fetch error" });
  }
}
