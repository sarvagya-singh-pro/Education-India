import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";



export async function POST(req:NextRequest){
    try{
    const{collegeID,id,applicationId}=await req.json()
    console.log(collegeID)
    console.log("application ID",applicationId)
    const res=await prisma.enrollment.create({
        data:{
            userId:id,
            collegeId:collegeID
        }
    })
  
    await prisma.application.delete(
        {
            where:{
                id:applicationId
        }
    }
    )
    return NextResponse.json({"ok":200})
    }
    catch(e){
        console.log(e.message)
    }


}