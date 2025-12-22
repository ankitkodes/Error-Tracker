import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    return NextResponse.json({ message: "project added successfully", body });
  } catch (error) {
    NextResponse.json({ message: "Invalid error has occured !", error });
  }
}
