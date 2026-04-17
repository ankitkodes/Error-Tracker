
import { ProjectReport } from "@/modules/report/report.service";
import { NextRequest, NextResponse } from "next/server";

// return project health
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const { projectId } = await params;

    const projecthealth = await ProjectReport(projectId);
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
