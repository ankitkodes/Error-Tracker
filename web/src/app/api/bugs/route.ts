import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { createHash } from "crypto";

// store error
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = JSON.parse(body.error);
    const stackmessage = data["stack"].slice(0, data["stack"].indexOf("\n"));
    const hashdata = JSON.stringify(data) + body.projectId;
    const issuehashId = createHash("md5").update(hashdata).digest("hex");

    try {
      const start = data["stack"].indexOf("(");
      const end = data["stack"].indexOf(")");
      let filename = " ";
      if (start != -1 && end != -1) {
        if (start < end) {
          filename = data["stack"].slice(start, end + 1);
        }
      }
      console.log("this is the value of filestace", filename);
    } catch (error) {
      console.log("error of file stace:- ", error);
    }

    const project = await prisma.project.findUnique({
      where: {
        id: body.projectId,
      },
    });

    if (!project) {
      return NextResponse.json({ message: "Invalid project ID" });
    }

    await prisma.error.upsert({
      where: {
        issuehashId: issuehashId,
        projectId: body.projectId,
      },
      update: {
        errorCount: { increment: 1 },
      },
      create: {
        message: stackmessage,
        error: body.error,
        projectId: body.projectId,
        issuehashId: issuehashId,
      },
    });
    return NextResponse.json({
      message: "Error stored successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Some Invalid error has occured",
      error,
    });
  }
}

// All Error of the user

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const bulkError = await prisma.error.findMany({
      where: {
        project: {
          userId: Number(session?.user.id),
        },
      },
      select: {
        id: true,
        message: true,
        severity: true,
        error: true,
        status: true,
        errorCount: true,
        createdAt: true,
        project: {
          select: {
            name: true,
            language: true,
            environment: true,
          },
        },
      },
    });
    return NextResponse.json({
      message: "All Error fetched successfully",
      bulkError,
    });
  } catch (error) {
    return NextResponse.json({
      message: "some Invalid error has occured !",
      error,
    });
  }
}
