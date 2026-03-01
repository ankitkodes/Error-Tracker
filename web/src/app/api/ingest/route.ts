import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { createHash } from "crypto";
import { parse } from "stacktrace-parser";

// store error
/**
 * @swagger
 * /api/ingest:
 *   post:
 *     summary: Ingest a new error report
 *     tags: [Errors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *               - error
 *             properties:
 *               projectId:
 *                 type: string
 *               error:
 *                 type: string
 *     responses:
 *       200:
 *         description: Error stored successfully
 *       400:
 *         description: Invalid input
 */
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

    // storing the error or updating the error occurences in error table
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

    // transaction for updating the totalerrors and uptimepercentage
    await prisma.$transaction(async (tsx) => {
      const health = await tsx.projectHealth.upsert({
        where: { projectId: body.projectId },
        update: {
          totalerrors: { increment: 1 },
        },
        create: {
          totalerrors: 1,
          resolvederror: 0,
          uptimepercentage: 100,
          projectId: body.projectId,
        },
      });
      const healthpercentage =
        (health.resolvederror / health.totalerrors) * 100;

      await tsx.projectHealth.update({
        where: { projectId: body.projectId },
        data: { uptimepercentage: healthpercentage },
      });
    });

    // finding userId from ProjectId
    const response = await prisma.project.findUnique({
      where: {
        id: body.projectId,
      },
      select: {
        userId: true,
      },
    });

    console.log("this is userid:- ", response);

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
    const allError = await prisma.error.findMany({
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
        occurrence: true,
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
      allError,
    });
  } catch (error) {
    return NextResponse.json({
      message: "some Invalid error has occured !",
      error,
    });
  }
}
