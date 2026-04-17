import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { createHash } from "crypto";
import { parse } from "stacktrace-parser";
import { Severity, Status } from "../../../../prisma/generated/prisma/enums";
import { getSortedErrorService } from "@/modules/errors/error.service";

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
    const errortype = errorStack[0].methodName.replace("trigger", "");

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
    // finding userId from ProjectId
    const response = await prisma.project.findUnique({
      where: {
        id: body.projectId,
      },
      select: {
        userId: true,
      },
    });

    if (!response) {
      return NextResponse.json({ message: "projectId is not correct" });
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
        errorType: errortype,
        message: stackMessage,
        fileName: errorStack[0].file,
        lineNumber: Number(errorStack[0].lineNumber),
        error: body.error,
        projectId: body.projectId,
        issuehashId: issueHashId,
      },
    });

    //  storing errortype and its occurence

    //  await prisma.errorType.upsert({
    //   where:{
    //     typename:errortype
    //   },
    //   update:{
    //     occurrence:{increment:1}
    //   },
    //   create:{
    //     typename:errortype,
    //     occurrence:1,
    //     userId:response.userId

    //   }
    // })
    //  

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



    // current time
    const dateLocal = new Date().toLocaleDateString();

    // storing error data everyday
    await prisma.errorAnalytics.upsert({
      where: { date: dateLocal },
      update: {
        error: { increment: 1 },
      },
      create: {
        date: dateLocal,
        error: 1,
        resolvederror: 0,
        userId: response.userId,
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

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "unable to find user" })
    }
    const { searchParams } = new URL(req.url);
    const severity = searchParams.get('severity') as Severity;
    const status = searchParams.get('status') as Status;
    const errortype = searchParams.get('errortype') as string;
    const Error = await getSortedErrorService(Number(session.user.id), severity, status, errortype)
    return NextResponse.json({ message: "fetched sorted data successfully", Error })
  } catch (error) {
    return NextResponse.json({ message: 'some invalid error has occured', error })
  }
}
