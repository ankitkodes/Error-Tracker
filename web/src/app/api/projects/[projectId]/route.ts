import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/db";

// get the specific project
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const { projectId } = await params;
    const id = projectId;
    const user = getServerSession(authOptions);
    if (!user) {
      return NextResponse.json({ message: "please login or signup" });
    }
    const project = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "fetched data successfully",
      project,
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid Error has occured!", error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const projectId = params.projectId;
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return NextResponse.json({ message: "project deleted successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "unable to delete the project",
      error,
    });
  }
}
