import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const session = await getServerSession(authOptions);
        const analytics = await prisma.errorAnalytics.findMany({
            where:{
                userId:Number(session?.user.id)
            }
        });
        return NextResponse.json({message:"error analytics returned succesfully", analytics});
    } catch (error) {
        return NextResponse.json({message:"unable to return analytics", error});
    }
}