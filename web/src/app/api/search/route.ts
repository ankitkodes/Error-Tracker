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
        const data = await prisma.error.findMany({
            where:{
             project:{
                userId:Number(session?.user.id)
             },
             message:{
                contains:query,
                mode:"insensitive"
             }
            }
        })
        console.log("the value of query:- ", data)
        return NextResponse.json({message:"successfully fetched the query data", data});
    } catch (error) {
        console.log("unable to fetch the data , here is the error of searchlog :- ", error)
        return NextResponse.json({message:"unable to fetch the data", error});
    }
}