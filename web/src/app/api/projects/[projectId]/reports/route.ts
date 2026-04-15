import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// return project health
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const { projectId } = await params;

    const projecthealth = await prisma.projectHealth.findUnique({
      where: {
        projectId: projectId
      },
      select: {
        totalerrors: true,
        resolvederror: true,
        status: true,
        uptimepercentage: true,
      },
    });
    return NextResponse.json({
      message: "fetched project health successfully",
      projecthealth,
    });
  } catch (error) {
    console.log("project health report:- ", error)
    return NextResponse.json({
      message: "unable to fetch project health",
      error,
    });
  }
}
