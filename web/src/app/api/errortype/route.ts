import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/db";

export async function GET(){
    try {
        const session = await getServerSession(authOptions);
        const errortype = await prisma.errorType.findMany({
            where:{
                userId:Number(session?.user.id)
            }
        })
        return NextResponse.json({message:"errortype fetched successfully", errortype})
    } catch (error) {
        return NextResponse.json({message:"unable to send error data", error})
    }
}

export async function DELETE(req:NextRequest){
    try {
        const errortypeid = await req.json();
        await prisma.errorType.delete({
            where:{
                id:errortypeid
            }
        })
        return NextResponse.json({message:"errortype deleted successfully"})
    } catch (error) {
        return NextResponse.json({message:"unable to delete errortype",error})
    }
}