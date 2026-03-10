import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/db";


export async function GET(req:NextRequest){
    try {
        const session = await getServerSession(authOptions);
        const {searchParams} = new URL(req.url);
        const query = searchParams.get('q');
        if(!query){
            return;
        }

        // searching for query 
        const data= await prisma.error.findMany({
            where:{
             project:{
                userId:Number(session?.user.id)
             },
             message:{
                contains:query,
                mode:"insensitive"
             }
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
        })
        // console.log("the value of query:- ", error)
        return NextResponse.json({data});
    } catch (error) {
        console.log("unable to fetch the data , here is the error of searchlog :- ", error)
        return NextResponse.json({message:"unable to fetch the data", error});
    }
}