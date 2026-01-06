import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("value of api key:- ", body.APIKEY);
    console.log("value of project id:- ", body.projectId);
    const data = JSON.parse(body.error);
    const stackmessage = data["stack"].slice(0, data["stack"].indexOf("("));
    console.log(" this is stack messages", stackmessage);

    const project = await prisma.project.findUnique({
      where: {
        id: body.projectId,
      },
    });
    console.log("response of finding project of specific id:- ", project);
    if (!project) {
      console.log("returned");
      return NextResponse.json({ message: "Invalid project ID" });
    }
    const response = await prisma.error.create({
      data: {
        message: stackmessage,
        error: body.error,
        projectId: body.projectId,
      },
    });

    return NextResponse.json({
      message: "Error stored successfully",
      response,
    });

    return NextResponse.json({ message: "error fetched successfully", body });
  } catch (error) {
    return NextResponse.json({
      message: "Some Invalid error has occured",
      error,
    });
  }
}
