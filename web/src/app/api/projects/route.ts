import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import generateApiKey from "generate-api-key";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Please login or Signup" });
    }
    const project = await req.json();
    const apikey = generateApiKey({ method: "base62", batch: 5 });
    const projectid = project.name.slice(0, 5) + "_" + crypto.randomUUID();
    const response = await prisma.project.create({
      data: {
        id: projectid,
        name: project.name,
        userId: Number(session?.user.id),
        environment: project.environment,
        language: project.language,
        team: project.team,
        apikey: apikey[0],
      },
    });

    return NextResponse.json({
      message: "project added successfully",
      response,
    });
  } catch (error) {
    console.log("POST /api/project error:- ", error);
    return NextResponse.json({ message: "Unable to add Project", error });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "please login or signup" });
    }
    const projectdetails = await prisma.project.findMany({
      where: {
        userId: Number(session?.user.id),
      },
    });
    return NextResponse.json({
      message: "Successfully Project fetched",
      projectdetails,
    });
  } catch (error) {
    return NextResponse.json({ message: "Unable to fetch the Project", error });
  }
}
