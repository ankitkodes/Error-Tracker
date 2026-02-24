import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// fetch specific error of the specific project
export async function GET(
  req: NextRequest,
  { params }: { params: { errorId: string } },
) {
  try {
    const { errorId } = await params;
    console.log("this is errorid values:- ", errorId);

    const error = await prisma.error.findUnique({
      where: {
        id: Number(errorId),
      },
    });

    // console.log("this is error details:- ", error);
    return NextResponse.json({ message: "error returned successfully", error });
  } catch (error) {
    return NextResponse.json({ message: "failed to fetch the errors", error });
  }
}

// update the status of error
export async function PUT(
  req: NextRequest,
  { params }: { params: { errorId: string } },
) {
  try {
    const statusupdate = await req.json();
    const { errorId } = await params;
    await prisma.error.update({
      where: {
        id: Number(errorId),
      },
      data: {
        status: statusupdate,
      },
    });
    return NextResponse.json({ message: "error status updated successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "unable to update the status of the error",
      error,
    });
  }
}

// delete the error
export async function DELETE(
  req: NextRequest,
  { params }: { params: { errorId: string } },
) {
  try {
    const { errorId } = await params;
    await prisma.error.delete({
      where: {
        id: Number(errorId),
      },
    });
    return NextResponse.json({ message: "error deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "unable to delete error", error });
  }
}
