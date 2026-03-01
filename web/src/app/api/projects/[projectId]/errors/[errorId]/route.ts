import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// fetch specific error of the specific project
export async function GET(
  req: NextRequest,
  { params }: { params: { errorId: string } },
) {
  try {
    const { errorId } = await params;

    const error = await prisma.error.findUnique({
      where: {
        id: Number(errorId),
      },
    });

    // console.log("this is error details:- ", error);
    return NextResponse.json({ message: "error returned successfully", error });
  } catch (error) {
    return NextResponse.json({ message: "failed to fetch the errors", error });
  }
}

// update the status of error
export async function PUT(
  req: NextRequest,
  { params }: { params: { errorId: string; projectId: string } },
) {
  try {
    const statusupdate = await req.json();
    const { errorId } = await params;
    const { projectId } = await params;

    // transaction for updating error status and updating the project health
    await prisma.$transaction(async (tsx) => {
      await tsx.error.update({
        where: { id: Number(errorId) },
        data: {
          status: statusupdate.status,
        },
      });
      const project_health = await tsx.projectHealth.update({
        where: { projectId },
        data: {
          resolvederror: { increment: 1 },
        },
      });

      const healthpercentage =
        (project_health.resolvederror / project_health.totalerrors) * 100;

      await tsx.projectHealth.update({
        where: { projectId },
        data: {
          uptimepercentage: healthpercentage,
          status: ProjectStatus(healthpercentage),
        },
      });
    });

    return NextResponse.json({ message: "error status updated successfully" });
  } catch (error) {
    console.log("this is error from updating status of erro:- ", error);
    return NextResponse.json({
      message: "unable to update the status of the error",
      error,
    });
  }
}

// delete the error
export async function DELETE(
  req: NextRequest,
  { params }: { params: { errorId: string } },
) {
  try {
    const { errorId } = await params;
    await prisma.error.delete({
      where: {
        id: Number(errorId),
      },
    });
    return NextResponse.json({ message: "error deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "unable to delete error", error });
  }
}

// helper function to find the project status
export function ProjectStatus(uptimepercentage: number) {
  if (uptimepercentage >= 80) {
    return "Healthy";
  } else if (50 <= uptimepercentage && uptimepercentage < 80) {
    return "Warning";
  } else {
    return "Critical";
  }
}
