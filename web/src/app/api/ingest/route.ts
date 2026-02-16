import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { createHash } from "crypto";
import { parse } from "stacktrace-parser";

// store error
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = JSON.parse(body.error);
    const hashdata = JSON.stringify(data) + body.projectId;

    // extracting errorMessage
    const stackMessage = data["stack"].slice(0, data["stack"].indexOf("\n"));

    // error stacking
    const errorStack = parse(data["stack"]);

    // hashing error
    const issueHashId = createHash("md5").update(hashdata).digest("hex");

    // validation project details
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
        issuehashId: issueHashId,
        projectId: body.projectId,
      },
      update: {
        occurrence: { increment: 1 },
      },
      create: {
        errorType: errorStack[0].methodName,
        message: stackMessage,
        fileName: errorStack[0].file,
        lineNumber: Number(errorStack[0].lineNumber),
        error: body.error,
        projectId: body.projectId,
        issuehashId: issueHashId,
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


