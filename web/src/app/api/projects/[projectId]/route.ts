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
