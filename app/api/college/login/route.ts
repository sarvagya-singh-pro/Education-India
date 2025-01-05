import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import jwt from "jsonwebtoken"
export async function POST(req:NextResponse){
    const {id,password}=await req.json()
    console.log(id)
    const user=await prisma.college.findUnique({
        where:{
            id:id
        }
    })
    if(user.password==password){
        const res= NextResponse.json({"success":'yay'})
        const token=jwt.sign({id:user?.id},process.env.NEXTAUTH_SECRET)
        res.cookies.set("collegeToken",token)
        return res

    }
    else{
        return NextResponse.json({"message":"password wrong lmao"})
    }
}