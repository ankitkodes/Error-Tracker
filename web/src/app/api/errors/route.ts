import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/db";

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

// update the status of Error 
export async function PUT(req:NextRequest){
     try {
        
        
     } catch (error) {
        NextResponse.json({message:"some Invalid Error has occured !", error})
     }

}