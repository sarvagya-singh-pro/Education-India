import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
export async function POST(req:NextRequest){
    try{
    const{collegeID,id}=await req.json()
    console.log(collegeID)
    const res=await prisma.enrollment.create({
        data:{
            userId:id,
            collegeId:collegeID
        }
    })
    return NextResponse.json({"ok":200})
    }
    catch(e){
        console.log(e.message)
    }


}