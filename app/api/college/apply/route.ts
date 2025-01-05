import { NextApiRequest } from "next";
import prisma from "../../../../prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextApiRequest){
 const {id,collegeName,examScore,examType,additionalDetails}=(await req.json())
 console.log(id.id,collegeName,examScore,examType,additionalDetails)
 try{
 const user =await prisma.user.findUnique({
    where:{
        id:id.id
    }
 })
 const college=await prisma.college.findUnique({
    where:{
        name:collegeName
    }
 })
 console.log(college?.id)
 const aplication =await prisma.application.create({
    data:{
        userId:user?.id,
        collegeId:college?.id,
        Aditional:additionalDetails,
        examScore:parseInt(examScore),
        examType:examType

        
    }
 })
 console.log(aplication)
 return NextResponse.json({"success":200})
}
 catch(e){
    console.log(e.message)
    return NextResponse.json({"interal Error":500})
 }
}