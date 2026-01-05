import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import generateApiKey from "generate-api-key";
import prisma from "@/lib/db";
import { authOptions } from "../auth/[...nextAuth]/options";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Please login or Signup" });
    }
    const project = await req.json();
    const apikey = generateApiKey({ method: "base62", batch: 5 });
    const response = await prisma.project.create({
      data: {
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
