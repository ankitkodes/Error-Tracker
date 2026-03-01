import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// return project health
export async function GET({ params }: { params: { projectId: string } }) {
  try {
    const { projectId } = await params;
    console.log("this is projectId");
    const projecthealth = await prisma.projectHealth.findUnique({
      where: { projectId },
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
    return NextResponse.json({
      message: "unable to fetch project health",
      error,
    });
  }
}
