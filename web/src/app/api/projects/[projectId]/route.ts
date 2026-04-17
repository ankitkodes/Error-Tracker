import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { DeleteProject, GetProjectDetail, UpdateProject } from "@/modules/project/project.service";
import { ProjectSchema } from "@/modules/project/project.types";

// get the specific project
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const { projectId } = await params;
    const id = projectId;
    const user = await getServerSession(authOptions);
    if (!user) {
      return NextResponse.json({ message: "please login or signup" }, { status: 401 });
    }
    const project = await GetProjectDetail(id)

    return NextResponse.json({
      message: "fetched data successfully",
      project,
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid Error has occured!" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const { projectId } = await params;
    await DeleteProject(projectId);
    return NextResponse.json({ message: "project deleted successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "unable to delete the project",
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const { projectId } = await params;
    const body = await req.json();
    const project_details = await ProjectSchema.parseAsync(body);
    await UpdateProject(projectId, project_details);
    return NextResponse.json({ message: "project_details updated successfully" })
  } catch (error) {
    return NextResponse.json({ message: "unable to update project details" }, { status: 500 })
  }
}
