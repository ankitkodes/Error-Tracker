import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getDailyErrorServices } from "@/modules/errors/error.service";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const todayError = await getDailyErrorServices(Number(session?.user.id));
        return NextResponse.json({ todayError })
    } catch (error) {
        return NextResponse.json({ message: "unable to fetch daily data", error });
    }
}